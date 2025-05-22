import { IAgentContext, IIdentifier, IKey, IService, IKeyManager } from '@veramo/core-types'
import { EthrDIDProvider } from '@veramo/did-provider-ethr'
import { IIdentiKeyManager } from '@identi-digital/key-manager'
import { EthrDID } from 'ethr-did'
import Debug from 'debug'
import { LacchainProvider } from '@lacchain/gas-model-provider'
import {
  AbstractSigner,
  computeAddress,
  getAddress,
  Provider,
  Signer,
  Transaction,
  TransactionRequest,
  TypedDataDomain,
  TypedDataField,
} from 'ethers'

const debug = Debug('veramo:did-provider-ethr-lac')

export type IRequiredContext = IAgentContext<IKeyManager | IIdentiKeyManager>

/**
 * For most operations at most 60-70k gas is needed, larger amount for safety
 */
export const DEFAULT_GAS_LIMIT = 100000

export interface TransactionOptions extends TransactionRequest {
  ttl?: number
  encoding?: string
  metaIdentifierKeyId?: string
  signOnly?: boolean
}

/**
 * Possible options for network configuration for `did:ethr`
 *
 * @beta
 */
export interface EthrLacNetworkConfiguration {
  /**
   * The name of the network, for example 'mainnet', 'sepolia', 'polygon'.
   * If this is present, then DIDs anchored on this network will have a human-readable prefix, like
   * `did:ethr:sepolia:0x...`. See the
   * {@link https://github.com/uport-project/ethr-did-registry#contract-deployments | official deployments} for a table
   * of reusable names.
   * If this parameter is not present, `chainId` MUST be specified.
   */
  name: string

  /**
   * A JSON RPC URL for the ethereum network that is being used.
   * Either a `provider` or a `rpcUrl` must be specified. `provider` takes precedence when both are used.
   */
  rpcUrl: string

  /**
   * The EIP1056 registry address for the ethereum network being configured.
   *
   * Please See the
   * {@link https://github.com/uport-project/ethr-did-registry#contract-deployments | official deployments} for a table
   * of known deployments.
   */
  registry: string

  /**
   *
   */
  nodeAddress: string

  expiration?: number
}

class KmsLacEthereumSigner extends AbstractSigner {
  private context: IRequiredContext
  private controllerKey: IKey
  private nodeAddress: string
  readonly provider: Provider | null

  constructor(controllerKey: IKey, context: IRequiredContext, provider: Provider, nodeAddress: string) {
    super(provider)
    this.controllerKey = controllerKey
    this.context = context
    this.provider = provider || null
    this.nodeAddress = nodeAddress
  }

  async getAddress(): Promise<string> {
    if (this.controllerKey.meta?.account) {
      return this.controllerKey.meta?.account
    }
    return computeAddress('0x' + this.controllerKey.publicKeyHex)
  }

  async signTransaction(tx: Transaction): Promise<string> {
    if (tx.from != null) {
      const thisAddress = await this.getAddress()
      if (getAddress(tx.from) !== thisAddress) {
        throw new Error(`transaction from address mismatch ${tx.from} != ${thisAddress}`)
      }
    }
    const signature = await this.context.agent.keyManagerLacSign({
      keyRef: this.controllerKey.kid,
      algorithm: 'eth_signTransaction',
      data: tx.unsignedSerialized,
      provider: this.provider as LacchainProvider,
      nodeAddress: this.nodeAddress,
      expirationTime: 1936394529,
      encoding: 'base16',
    })

    return signature
  }

  async signMessage(message: string | Uint8Array): Promise<string> {
    throw new Error('Method not implemented.')
  }

  async signTypedData(
    domain: TypedDataDomain,
    types: Record<string, Array<TypedDataField>>,
    value: Record<string, any>,
  ): Promise<string> {
    throw new Error('Method not implemented.')
  }

  connect(provider: Provider | null) {
    if (!provider) {
      throw new Error('provider must not be null')
    }
    return new KmsLacEthereumSigner(
      this.controllerKey,
      this.context,
      provider,
      this.nodeAddress,
    ) as unknown as Signer
  }
}

export class EthrDIDLacProvider extends EthrDIDProvider {
  private auxNetworks: EthrLacNetworkConfiguration[]

  constructor(options: { defaultKms: string; networks?: EthrLacNetworkConfiguration[] }) {
    super({
      defaultKms: options.defaultKms,
      networks: options.networks,
    })
    this.auxNetworks = options.networks || []
  }

  async addKey(
    { identifier, key, options }: { identifier: IIdentifier; key: IKey; options?: TransactionOptions },
    context: IRequiredContext,
  ): Promise<any> {
    const usg = key.type === 'X25519' ? 'enc' : 'veriKey'
    const encoding = key.type === 'X25519' ? 'base58' : options?.encoding || 'hex'
    const attrName = `did/pub/${key.type}/${usg}/${encoding}`
    const attrValue = '0x' + key.publicKeyHex
    const ttl = options?.ttl || 86400
    const gasLimit = options?.gasLimit || DEFAULT_GAS_LIMIT

    const ethrDid = await this.getEthrDID(identifier, context)

    debug('ethrDid.setAttribute %o', { attrName, attrValue, ttl, gasLimit })
    const txHash = await ethrDid.setAttribute(attrName, attrValue, ttl, undefined, {
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
    const ethrDid = await this.getEthrDID(identifier, context)

    const attrName = 'did/svc/' + service.type
    const attrValue =
      typeof service.serviceEndpoint === 'string'
        ? service.serviceEndpoint
        : JSON.stringify(service.serviceEndpoint)
    const ttl = options?.ttl || 86400
    const gasLimit = options?.gasLimit || DEFAULT_GAS_LIMIT

    debug('ethrDid.setAttribute: ', { attrName, attrValue, ttl, gasLimit })

    const txHash = await ethrDid.setAttribute(attrName, attrValue, ttl, undefined, {
      ...options,
      gasLimit,
    })
    debug(`ethrDid.addService tx = ${txHash}`)

    return txHash
  }

  private async getEthrDID(identifier: IIdentifier, context: IRequiredContext): Promise<EthrDID> {
    if (identifier.controllerKeyId == null) {
      throw new Error('invalid_argument: identifier does not list a `controllerKeyId`')
    }

    const controllerKey = await context.agent.keyManagerGet({ kid: identifier.controllerKeyId })
    if (typeof controllerKey === 'undefined') {
      throw new Error('invalid_argument: identifier.controllerKeyId is not managed by this agent')
    }

    // find network
    const networkStringMatcher = /^did:ethr(:.+)?:(0x[0-9a-fA-F]{40}|0x[0-9a-fA-F]{66}).*$/
    const matches = identifier.did.match(networkStringMatcher)
    let network = this.getNetwork(matches?.[1]?.substring(1))
    if (!matches || !network) {
      throw new Error('Invalid identifier')
    }

    const provider = new LacchainProvider(network.rpcUrl)

    return new EthrDID({
      identifier: identifier.did,
      provider: provider,
      chainNameOrId: network.name,
      rpcUrl: network.rpcUrl,
      registry: network.registry,
      txSigner: new KmsLacEthereumSigner(controllerKey, context, provider, network.nodeAddress),
    })
  }

  private getNetwork(
    networkSpecifier: string | number | bigint | undefined,
  ): EthrLacNetworkConfiguration | undefined {
    let networkNameOrId: string | number | bigint = networkSpecifier || 'mainnet'
    let network = this.auxNetworks.find((n) => {
      if (n.name === networkNameOrId) return n
    })
    if (!network && !networkSpecifier && this.auxNetworks.length === 1) {
      network = this.auxNetworks[0]
    }
    return network
  }

  matchPrefix(prefix: string): boolean {
    const matches = prefix.match(/^did:ethr(:.+)?$/)
    let network = this.getNetwork(matches?.[1]?.substring(1))
    if (!matches || !network) {
      return false
    }
    return true
  }
}
