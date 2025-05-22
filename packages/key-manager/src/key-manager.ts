import { AbstractKeyStore, KeyManager } from '@veramo/key-manager'
import { AbstractIdentiKeyManagementSystem } from './types/AbstractKeyManagementSystem.js'
import * as u8a from 'uint8arrays'
import { schema } from './plugin.schema.js'
import { IKeyManagerSignArgs, ManagedKeyInfo } from '@veramo/core-types'

/**
 * Key Manager
 *
 * @beta
 */
export class IdentiKeyManager extends KeyManager {
  /**
   * Plugin methods
   * @public
   */
  readonly schema = schema.IKeyManager

  private identiStore: AbstractKeyStore
  private identiKms: Record<string, AbstractIdentiKeyManagementSystem>

  constructor(options: { store: AbstractKeyStore; kms: Record<string, AbstractIdentiKeyManagementSystem> }) {
    super({
      store: options.store,
      kms: options.kms,
    })
    this.identiStore = options.store
    this.identiKms = options.kms

    // @ts-ignore
    this.methods = {
      ...this.methods,
      keyManagerLacSign: this.keyManagerLacSign.bind(this),
    }
  }

  private getIdentiKms(name: string): AbstractIdentiKeyManagementSystem {
    const kms = this.identiKms[name]
    if (!kms) {
      throw Error(`invalid_argument: This agent has no registered KeyManagementSystem with name='${name}'`)
    }
    return kms
  }

  /** {@inheritDoc IKeyManager.keyManagerLacSign} */
  async keyManagerLacSign(args: IKeyManagerSignArgs): Promise<string> {
    const { keyRef, data, algorithm, encoding, ...extras } = { encoding: 'utf-8', ...args }
    const keyInfo: ManagedKeyInfo = await this.identiStore.getKey({ kid: keyRef })
    let dataBytes
    if (typeof data === 'string') {
      if (encoding === 'base16' || encoding === 'hex') {
        const preData = data.startsWith('0x') ? data.substring(2) : data
        dataBytes = u8a.fromString(preData, 'base16')
      } else {
        dataBytes = u8a.fromString(data, <'utf-8'>encoding)
      }
    } else {
      dataBytes = data
    }
    const kms = this.getIdentiKms(keyInfo.kms)
    return kms.lacSign({ keyRef: keyInfo, algorithm, data: dataBytes, ...extras })
  }
}

export default IdentiKeyManager
