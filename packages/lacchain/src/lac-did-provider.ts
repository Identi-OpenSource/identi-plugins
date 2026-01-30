import { IAgentContext, IIdentifier, IKey, IService, IKeyManager, DIDDocument } from '@veramo/core-types'
import { KmsEthereumSigner } from './kms-eth-signer.js'
import Debug from 'debug'
import { LacchainProvider } from '@lacchain/gas-model-provider'
import { TransactionRequest } from 'ethers'
import { AbstractIdentifierProvider } from '@veramo/did-manager'
import { toEthereumAddress } from './did/utils.js'
import LacDID from './did/did.js'

const debug = Debug('veramo:did-provider-lac')

export type IRequiredContext = IAgentContext<IKeyManager>

export const DEFAULT_GAS_LIMIT = 1000000

export interface TransactionOptions extends TransactionRequest {
  ttl?: number
  encoding?: string
  metaIdentifierKeyId?: string
  signOnly?: boolean
  ikeya: string
}

/**
 * Possible options for network configuration for `did:lac`
 *
 * @beta
 */
export interface LacNetworkConfiguration {
  /**
   * The name of the network, for example 'mainnet', 'openprotest'
   * If this is present, then DIDs anchored on this network will have a human-readable prefix, like
   * `did:lac:openprotest:0x...`.
   */
  name: string

  /**
   * A JSON RPC URL for the LACChain network that is being used.
   * Either a `provider` or a `rpcUrl` must be specified. `provider` takes precedence when both are used.
   */
  rpcUrl: string

  /**
   * The EIP1056 registry address for the LACChain network being configured.
   *
   * Please See the
   * {@link https://github.com/uport-project/ethr-did-registry#contract-deployments | official deployments} for a table
   * of known deployments.
   */
  registry: string

  /**
   * The node address for the LACChain network.
   */
  nodeAddress: string

  /**
   * The expiration time.
   */
  expirationTime: number
}

export class LacDIDProvider extends AbstractIdentifierProvider {
  private defaultKms: string
  private networks: LacNetworkConfiguration[]

  constructor(options: { defaultKms: string; networks?: LacNetworkConfiguration[] }) {
    super()
    this.networks = options.networks || []
    this.defaultKms = options.defaultKms
  }

  async createIdentifier(
    { kms, options }: { kms?: string; alias?: string; options?: any },
    context: IAgentContext<IKeyManager>,
  ): Promise<Omit<IIdentifier, 'provider'>> {
    const key = await context.agent.keyManagerCreate({ kms: kms || this.defaultKms, type: 'Secp256k1' })
    const address = toEthereumAddress(key.publicKeyHex)

    let networkSpecifier
    if (options?.network) {
      if (typeof options.network === 'number') {
        networkSpecifier = BigInt(options?.network)
      } else {
        networkSpecifier = options?.network
      }
    } else if (options?.providerName?.match(/^did:lac:.+$/)) {
      networkSpecifier = options?.providerName?.substring(8)
    } else {
      networkSpecifier = undefined
    }
    const network = this.getNetworkFor(networkSpecifier)
    if (!network) {
      throw new Error(
        `invalid_setup: Cannot create did:lac. There is no known configuration for network=${networkSpecifier}'`,
      )
    }
    if (typeof networkSpecifier === 'bigint' || typeof networkSpecifier === 'number') {
      networkSpecifier =
        network.name && network.name.length > 0 ? network.name : BigInt(options?.network || 1).toString(16)
    }

    const networkString = networkSpecifier && networkSpecifier !== 'mainnet' ? `${networkSpecifier}:` : ''
    const identifier: Omit<IIdentifier, 'provider'> = {
      did: 'did:lac:' + networkString + address,
      controllerKeyId: key.kid,
      keys: [key],
      services: [],
    }
    debug('Created', identifier.did)

    const lacDid = await this.getLacDID(identifier as IIdentifier, context)

    const ttl = options?.ttl || 86400
    await lacDid.setAttribute(`auth/${address}/esecp256k1vk/blockchain`, address, ttl, {
      gasLimit: DEFAULT_GAS_LIMIT,
    })

    return identifier
  }

  updateIdentifier?(
    args: { did: string; document: Partial<DIDDocument>; options?: { [x: string]: any } },
    context: IAgentContext<IKeyManager>,
  ): Promise<IIdentifier> {
    throw new Error('Method not implemented.')
  }

  deleteIdentifier(args: IIdentifier, context: IAgentContext<IKeyManager>): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  removeKey(
    args: { identifier: IIdentifier; kid: string; options?: any },
    context: IAgentContext<IKeyManager>,
  ): Promise<any> {
    throw new Error('Method not implemented.')
  }

  removeService(
    args: {
      identifier: IIdentifier
      id: string
      options?: any
    },
    context: IAgentContext<IKeyManager>,
  ): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async addKey(
    { identifier, key, options }: { identifier: IIdentifier; key: IKey; options?: TransactionOptions },
    context: IRequiredContext,
  ): Promise<any> {
    const lacDid = await this.getLacDID(identifier, context)

    const networkStringMatcher = /^did:lac(:.+)?:(0x[0-9a-fA-F]{40}|0x[0-9a-fA-F]{66}).*$/
    const matches = identifier.did.match(networkStringMatcher)
    const address = matches?.[2]
    const encoding = key.type === 'Secp256k1' ? 'blockchain' : 'hex'
    const algorithm = key.type === 'Secp256k1' ? 'esecp256k1vk' : 'x25519ka'
    const type = key.type === 'Secp256k1' ? 'auth' : 'keya'
    const attrName = `${type}/${address}/${algorithm}/${encoding}`
    const attrValue = '0x' + key.publicKeyHex
    const ttl = options?.ttl || 86400
    const gasLimit = options?.gasLimit || DEFAULT_GAS_LIMIT

    debug('ethrDid.setAttribute %o', { attrName, attrValue, ttl, gasLimit })
    const txHash = await lacDid.setAttribute(attrName, attrValue, ttl, {
      ...options,
      gasLimit,
    })
    debug(`ethrDid.addKey tx = ${txHash}`)
    return txHash
  }

  async addService(
    {
      identifier,
      service,
      options,
    }: { identifier: IIdentifier; service: IService; options?: TransactionOptions },
    context: IAgentContext<IKeyManager>,
  ): Promise<any> {
    const lacDid = await this.getLacDID(identifier, context)
    const attrName = `svc/${options?.ikeya}/${service.type}/hex`
    const attrValue =
      typeof service.serviceEndpoint === 'string'
        ? service.serviceEndpoint
        : JSON.stringify(service.serviceEndpoint)
    const ttl = options?.ttl || 86400
    const gasLimit = options?.gasLimit || DEFAULT_GAS_LIMIT

    debug('lacDid.setAttribute: ', { attrName, attrValue, ttl, gasLimit })

    const txHash = await lacDid.setAttribute(attrName, attrValue, ttl, {
      ...options,
      gasLimit,
    })
    debug(`lacDid.addService tx = ${txHash}`)

    return txHash
  }

  private async getLacDID(identifier: IIdentifier, context: IRequiredContext): Promise<LacDID> {
    if (identifier.controllerKeyId == null) {
      throw new Error('invalid_argument: identifier does not list a `controllerKeyId`')
    }

    const controllerKey = await context.agent.keyManagerGet({ kid: identifier.controllerKeyId })
    if (typeof controllerKey === 'undefined') {
      throw new Error('invalid_argument: identifier.controllerKeyId is not managed by this agent')
    }

    const networkStringMatcher = /^did:lac(:.+)?:(0x[0-9a-fA-F]{40}|0x[0-9a-fA-F]{66}).*$/
    const matches = identifier.did.match(networkStringMatcher)
    let network = this.getNetworkFor(matches?.[1]?.substring(1))
    if (!matches || !network) {
      throw new Error('Invalid identifier')
    }

    const provider = new LacchainProvider(network.rpcUrl)

    return new LacDID({
      identifier: identifier.did,
      provider: provider,
      chainNameOrId: network.name,
      rpcUrl: network.rpcUrl,
      registry: network.registry,
      txSigner: new KmsEthereumSigner(
        controllerKey,
        context,
        provider,
        network.nodeAddress,
        network.expirationTime,
      ),
    })
  }

  private getNetworkFor(
    networkSpecifier: string | number | bigint | undefined,
  ): LacNetworkConfiguration | undefined {
    let networkNameOrId: string | number | bigint = networkSpecifier || 'mainnet'
    let network = this.networks.find((n) => {
      if (n.name === networkNameOrId) return n
    })
    if (!network && !networkSpecifier && this.networks.length === 1) {
      network = this.networks[0]
    }
    return network
  }
}
