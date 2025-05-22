import { IKey } from '@veramo/core-types'
import { AbstractKeyManagementSystem } from '@veramo/key-manager'

/**
 *
 * @beta
 */
export abstract class AbstractIdentiKeyManagementSystem extends AbstractKeyManagementSystem {
  /**
   *
   * @beta
   */
  abstract lacSign(args: {
    keyRef: Pick<IKey, 'kid'>
    algorithm?: string
    data: Uint8Array
    [x: string]: any
  }): Promise<string>
}
