import { IPluginMethodMap, IAgentContext, IResolver } from '@veramo/core-types'

/**
 * Represents the requirements that this plugin has.
 * The agent that is using this plugin is expected to provide these methods.
 *
 * This interface can be used for static type checks, to make sure your application is properly initialized.
 *
 * @beta
 */
export type IPKDRequiredContext = IAgentContext<IResolver>

/**
 * Arguments for verifying a credential
 * @beta
 */
export interface ILacchainVerifyAddressArgs {
  did?: string
  address?: string
  trusted_list_address: string
}

/**
 * Arguments for verifying a credential
 * @beta
 */
export interface ILacchainVerifyAddressResponse {
  result: boolean
}

/**
 * LacchainPublicKeyDirectory plugin interface
 *
 * @beta
 */
export interface ILacchainPublicKeyDirectory extends IPluginMethodMap {
  /**
   * Verify address
   * @param args - an {@link ILacchainVerifyAddressArgs} object
   * @returns - ILacchainVerifyAddressResponse
   * @beta
   */
  lacchainVerifyAddress(
    args: ILacchainVerifyAddressArgs,
    context: IPKDRequiredContext,
  ): Promise<ILacchainVerifyAddressResponse>
}
