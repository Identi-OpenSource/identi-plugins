import {
  IPluginMethodMap,
  ICreateVerifiableCredentialArgs,
  IAgentContext,
  IResolver,
  IDIDManager,
  IDataStore,
  IKeyManager,
  CredentialPayload,
} from '@veramo/core-types'
import { RoleType } from '../service/credential-registry.js'

/**
 * Represents the requirements that this plugin has.
 * The agent that is using this plugin is expected to provide these methods.
 *
 * This interface can be used for static type checks, to make sure your application is properly initialized.
 *
 * @beta
 */
export type IRequiredContext = IAgentContext<
  IResolver &
    Pick<IDIDManager, 'didManagerGet' | 'didManagerFind'> &
    Pick<IDataStore, 'dataStoreSaveVerifiablePresentation' | 'dataStoreSaveVerifiableCredential'> &
    Pick<IKeyManager, 'keyManagerGet' | 'keyManagerSign'>
>

/**
 * Arguments for deploying a contract
 * @beta
 */
export interface ILacchainDeployArgs {
  kid: string
}

/**
 * Arguments for deploying a contract
 * @beta
 */
export interface ILacchainDeployResponse {
  credentialRegistryAddress: string
  claimsVerifierAddress: string
}

/**
 * Arguments for granting a role
 * @beta
 */
export interface ILacchainGrantRoleArgs {
  kid: string
  claimsVerifierAddress: string
  role: RoleType
  address?: string
  did?: string
}

/**
 * Arguments for revoking a role
 * @beta
 */
export interface ILacchainRevokeRoleArgs {
  kid: string
  address?: string
  did?: string
  claimsVerifierAddress: string
  role: RoleType
}

/**
 * Arguments for checking a role
 * @beta
 */
export interface ILacchainCheckRoleArgs {
  kid: string
  claimsVerifierAddress: string
  role: RoleType
  address?: string
  did?: string
}

/**
 * Arguments for registering a credential
 * @beta
 */
export interface ILacchainRegisterCredentialArgs
  extends Omit<ICreateVerifiableCredentialArgs, 'proofFormat'> {
  claimsVerifierAddress: string
}

/**
 * Arguments for verifying a credential
 * @beta
 */
export interface ILacchainVerifyCredentialArgs {
  claimsVerifierAddress: string
  credential: Omit<CredentialPayload, 'proof' | 'issuer'> & {
    issuer: {
      id: string
    }
    proof: [
      {
        id: string
        type: string
        verificationMethod: string
        domain: string
        proofValue: string
      },
    ]
  }
}

/**
 * Arguments for verifying a credential
 * @beta
 */
export interface ILacchainVerifyCredentialResponse {
  credentialExists: boolean
  isNotRevoked: boolean
  issuerSignatureValid: boolean
  additionalSigners: boolean
  isNotExpired: boolean
}

/**
 * Arguments for registering a credential
 * @beta
 */
export interface ILacchainRevokeCredentialArgs extends Omit<ICreateVerifiableCredentialArgs, 'proofFormat'> {
  kid: string
  claimsVerifierAddress: string
}

/**
 * LacchainCredential plugin interface
 *
 * @beta
 */
export interface ILacchainCredential extends IPluginMethodMap {
  /**
   * Deploy smart contract
   * @param args - an {@link ILacchainDeployArgs} object
   * @returns - Promise with deployment result
   * @beta
   */
  lacchainCredentialDeploy(args: ILacchainDeployArgs): Promise<ILacchainDeployResponse>

  /**
   * Grant role to an address
   * @param args - an {@link ILacchainGrantRoleArgs} object
   * @returns - Promise with transaction result
   * @beta
   */
  lacchainCredentialGrantRole(args: ILacchainGrantRoleArgs, context: IRequiredContext): Promise<boolean>

  /**
   * Revoke role from an address
   * @param args - an {@link ILacchainRevokeRoleArgs} object
   * @returns - Promise with transaction result
   * @beta
   */
  lacchainCredentialRevokeRole(args: ILacchainRevokeRoleArgs, context: IRequiredContext): Promise<boolean>

  /**
   * Check if an address has a specific role
   * @param args - an {@link ILacchainCheckRoleArgs} object
   * @returns - Promise with role status
   * @beta
   */
  lacchainCredentialCheckRole(args: ILacchainCheckRoleArgs, context: IRequiredContext): Promise<boolean>

  /**
   * Register a credential
   * @param args - an {@link ILacchainRegisterCredentialArgs} object
   * @returns - Promise with registration result
   * @beta
   */
  lacchainCredentialRegisterCredential(
    args: ILacchainRegisterCredentialArgs,
    context: IRequiredContext,
  ): Promise<string>

  /**
   * Revoke a credential
   * @param args - an {@link ILacchainRevokeCredentialArgs} object
   * @returns - Promise with revoke result
   * @beta
   */
  lacchainCredentialRevokeCredential(
    args: ILacchainRevokeCredentialArgs,
    context: IRequiredContext,
  ): Promise<string>

  /**
   * Verify a credential
   * @param args - an {@link ILacchainVerifyCredentialArgs} object
   * @returns - Promise with verification result
   * @beta
   */
  lacchainCredentialVerifyCredential(
    args: ILacchainVerifyCredentialArgs,
    context: IRequiredContext,
  ): Promise<ILacchainVerifyCredentialResponse>
}
