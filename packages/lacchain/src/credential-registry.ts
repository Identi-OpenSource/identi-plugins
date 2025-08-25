import { IAgentPlugin, IIdentifier } from '@veramo/core-types'
import {
  ILacchainCredential,
  ILacchainRegisterCredentialArgs,
  ILacchainDeployArgs,
  ILacchainGrantRoleArgs,
  ILacchainRevokeRoleArgs,
  ILacchainCheckRoleArgs,
  ILacchainVerifyCredentialArgs,
  IRequiredContext,
  ILacchainVerifyCredentialResponse,
} from './types/ILacchainCredential.js'
import { ILacchainDeployResponse } from './types/ILacchainCredential.js'
import { AbstractPrivateKeyStore } from '@veramo/key-manager'
import { LacchainProvider, LacchainSigner } from '@lacchain/gas-model-provider'

import { schema } from './plugin.schema.js'
import CredentialRegistryService, { RoleType } from './service/credential-registry.js'
import { extractIssuer, MANDATORY_CREDENTIAL_CONTEXT, processEntryToArray } from '@veramo/utils'

/**
 * {@inheritDoc IMyAgentPlugin}
 *
 * @beta
 */
export class LacchainCredentialPlugin implements IAgentPlugin {
  /** Plugin methods */
  readonly methods: ILacchainCredential
  private credentialRegistryService: CredentialRegistryService = new CredentialRegistryService()

  readonly schema = schema.ILacchainCredential

  private keyStore: AbstractPrivateKeyStore
  private nodeAddress: string
  private rpcUrl: string
  private expiration: number

  constructor(options: {
    keyStore: AbstractPrivateKeyStore
    nodeAddress: string
    rpcUrl: string
    expiration: number
  }) {
    this.keyStore = options.keyStore
    this.nodeAddress = options.nodeAddress
    this.rpcUrl = options.rpcUrl
    this.expiration = options.expiration

    this.methods = {
      lacchainCredentialDeploy: this.deploy.bind(this),
      lacchainCredentialGrantRole: this.grantRole.bind(this),
      lacchainCredentialRevokeRole: this.revokeRole.bind(this),
      lacchainCredentialCheckRole: this.checkRole.bind(this),
      lacchainCredentialRegisterCredential: this.registerCredential.bind(this),
      lacchainCredentialRevokeCredential: this.revokeCredential.bind(this),
      lacchainCredentialVerifyCredential: this.verifyCredential.bind(this),
    }
  }

  private getSigner(privateKey: string) {
    const provider = new LacchainProvider(this.rpcUrl)
    const signer = new LacchainSigner(privateKey, provider, this.nodeAddress, this.expiration)
    return signer
  }

  /** {@inheritdoc ILacchainCredential.lacchainCredentialDeploy} */
  private async deploy(args: ILacchainDeployArgs): Promise<ILacchainDeployResponse> {
    const kidKey = await this.keyStore.getKey({ alias: args.kid })
    const signer = this.getSigner(kidKey.privateKeyHex)

    const credentialRegistry = await this.credentialRegistryService.deployCredentialRegistry(signer)
    const claimsVerifier = await this.credentialRegistryService.deployClaimsVerifier(
      credentialRegistry?.address ?? '',
      signer,
    )

    return {
      credentialRegistryAddress: credentialRegistry.address,
      claimsVerifierAddress: claimsVerifier.address,
    }
  }

  /** {@inheritdoc ILacchainCredential.lacchainCredentialGrantRole} */
  private async grantRole(args: ILacchainGrantRoleArgs, context: IRequiredContext): Promise<boolean> {
    const kidKey = await this.keyStore.getKey({ alias: args.kid })
    const signer = this.getSigner(kidKey.privateKeyHex)

    if (![RoleType.ISSUER, RoleType.SIGNER].includes(args.role)) {
      throw new Error(`Unsupported role: ${args.role}`)
    }

    if (!args.address && !args.did) {
      throw new Error('invalid_argument: address or did must be provided')
    }

    if (args.address && args.did) {
      throw new Error('invalid_argument: address and did cannot be provided at the same time')
    }

    let address: string
    if (args.address) {
      address = args.address
    } else {
      address = await this.getAddress(args.did, context)
    }
    await this.credentialRegistryService.grantRole(args.claimsVerifierAddress, address, args.role, signer)

    return true
  }

  /** {@inheritdoc ILacchainCredential.lacchainCredentialRevokeRole} */
  private async revokeRole(args: ILacchainRevokeRoleArgs, context: IRequiredContext): Promise<boolean> {
    const kidKey = await this.keyStore.getKey({ alias: args.kid })
    const signer = this.getSigner(kidKey.privateKeyHex)

    if (!args.address && !args.did) {
      throw new Error('invalid_argument: address or did must be provided')
    }

    if (args.address && args.did) {
      throw new Error('invalid_argument: address and did cannot be provided at the same time')
    }

    let address: string
    if (args.address) {
      address = args.address
    } else {
      address = await this.getAddress(args.did, context)
    }

    await this.credentialRegistryService.revokeRole(args.claimsVerifierAddress, address, args.role, signer)

    return true
  }

  /** {@inheritdoc ILacchainCredential.lacchainCredentialCheckRole} */
  private async checkRole(args: ILacchainCheckRoleArgs, context: IRequiredContext): Promise<boolean> {
    const kidKey = await this.keyStore.getKey({ alias: args.kid })

    if (![RoleType.ISSUER, RoleType.SIGNER].includes(args.role)) {
      throw new Error(`Unsupported role: ${args.role}`)
    }

    if (!args.address && !args.did) {
      throw new Error('invalid_argument: address or did must be provided')
    }

    if (args.address && args.did) {
      throw new Error('invalid_argument: address and did cannot be provided at the same time')
    }

    let address: string
    if (args.address) {
      address = args.address
    } else {
      address = await this.getAddress(args.did, context)
    }

    const result = await this.credentialRegistryService.hasRole(
      args.claimsVerifierAddress,
      address,
      args.role,
      this.getSigner(kidKey.privateKeyHex),
    )
    return result
  }

  /** {@inheritdoc ILacchainCredential.lacchainCredentialRegisterCredential} */
  private async registerCredential(
    args: ILacchainRegisterCredentialArgs,
    context: IRequiredContext,
  ): Promise<any> {
    let { credential, proofFormat, keyRef, removeOriginalFields, save, now, ...otherOptions } = args
    const credentialContext = processEntryToArray(credential['@context'], MANDATORY_CREDENTIAL_CONTEXT)
    const credentialType = processEntryToArray(credential.type, 'VerifiableCredential')

    // only add issuanceDate for JWT
    now = typeof now === 'number' ? new Date(now * 1000) : now
    if (!Object.getOwnPropertyNames(credential).includes('issuanceDate')) {
      credential.issuanceDate = (now instanceof Date ? now : new Date()).toISOString()
    }

    credential = {
      ...credential,
      '@context': credentialContext,
      type: credentialType,
    }

    const issuer = extractIssuer(credential, { removeParameters: true })
    if (!issuer || typeof issuer === 'undefined') {
      throw new Error('invalid_argument: credential.issuer must not be empty')
    }

    let identifier: IIdentifier
    try {
      identifier = await context.agent.didManagerGet({ did: issuer })
    } catch (e) {
      throw new Error(`invalid_argument: credential.issuer must be a DID managed by this agent. ${e}`)
    }

    const key = identifier.keys.find(
      (k) => k.type === 'Secp256k1' || k.type === 'Ed25519' || k.type === 'Secp256r1',
    )
    if (!key) {
      throw new Error('invalid_argument: credential.issuer does not have a valid key')
    }

    const kidKey = await this.keyStore.getKey({ alias: key.kid })
    const signer = this.getSigner(kidKey.privateKeyHex)
    const subjectAddress = await this.getAddress(credential.credentialSubject.id, context)
    const vc: any = await this.credentialRegistryService.registerCredential(
      args.claimsVerifierAddress,
      credential,
      subjectAddress,
      signer,
    )

    if (args.save) {
      await context.agent.dataStoreSaveVerifiableCredential({ verifiableCredential: vc })
    }

    return vc
  }

  /** {@inheritdoc ILacchainCredential.lacchainCredentialRevokeCredential} */
  private async revokeCredential(
    args: ILacchainRegisterCredentialArgs,
    context: IRequiredContext,
  ): Promise<any> {
    let { credential, proofFormat, keyRef, removeOriginalFields, save, now, ...otherOptions } = args

    let identifier: IIdentifier
    try {
      identifier = await context.agent.didManagerGet({ did: args.credential.issuer.id })
    } catch (e) {
      throw new Error(`invalid_argument: credential.issuer must be a DID managed by this agent. ${e}`)
    }

    const key = identifier.keys.find(
      (k) => k.type === 'Secp256k1' || k.type === 'Ed25519' || k.type === 'Secp256r1',
    )
    if (!key) {
      throw new Error('invalid_argument: credential.issuer does not have a valid key')
    }

    const kidKey = await this.keyStore.getKey({ alias: key.kid })
    const signer = this.getSigner(kidKey.privateKeyHex)

    const subjectAddress = await this.getAddress(args.credential?.credentialSubject?.id, context)

    const result = await this.credentialRegistryService.revokeCredential(
      args.claimsVerifierAddress,
      args.credential,
      subjectAddress,
      signer,
    )

    return result
  }

  /** {@inheritdoc ILacchainCredential.lacchainCredentialVerifyCredential} */
  private async verifyCredential(
    args: ILacchainVerifyCredentialArgs,
    context: IRequiredContext,
  ): Promise<ILacchainVerifyCredentialResponse> {
    const issuerAddress = await this.getAddress(args.credential?.issuer?.id, context)
    const subjectAddress = await this.getAddress(args.credential?.credentialSubject?.id, context)

    const result = await this.credentialRegistryService.verifyCredential(
      args.claimsVerifierAddress,
      args.credential,
      issuerAddress,
      subjectAddress,
      new LacchainProvider(this.rpcUrl),
    )

    return result
  }

  private async getAddress(did: string | undefined, context: IRequiredContext): Promise<string> {
    if (!did) {
      throw new Error('invalid_argument: did not found')
    }

    const identifier = await context.agent.resolveDid({ didUrl: did })
    if (!identifier) {
      throw new Error('invalid_argument: did not found')
    }

    const address = identifier.didDocument?.verificationMethod
      ?.find((k: any) => k.blockchainAccountId !== undefined)
      ?.blockchainAccountId?.split(':')[2]

    if (!address) {
      throw new Error(
        'invalid_argument: credential.credentialSubject.id does not have a valid blockchainAccountId',
      )
    }

    return address
  }
}
