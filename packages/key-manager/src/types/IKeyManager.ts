import { IKeyManagerSignArgs, IKeyManager as VeramoIKeyManager } from '@veramo/core-types'

/**
 *
 * @beta
 */
export interface IIdentiKeyManager extends VeramoIKeyManager {
  /**
   * Sign transaction for Lacchain
   */
  keyManagerLacSign(args: IKeyManagerSignArgs): Promise<string>
}
