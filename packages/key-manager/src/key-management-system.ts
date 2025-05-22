import { AbstractPrivateKeyStore, ManagedPrivateKey } from '@veramo/key-manager'
import { KeyManagementSystem as VeramoKeyManagementSystem } from '@veramo/kms-local'
import { bytesToHex } from '@veramo/utils'
import { LacchainProvider, LacchainSigner } from '@lacchain/gas-model-provider'
import { Transaction } from 'ethers'
import { IKey } from '@veramo/core-types'

/**
 * Identi Key Management System
 *
 * @beta
 */
export class KeyManagementSystem extends VeramoKeyManagementSystem {
  private readonly identiKeyStore: AbstractPrivateKeyStore

  constructor(keyStore: AbstractPrivateKeyStore) {
    super(keyStore)
    this.identiKeyStore = keyStore
  }

  async lacSign({
    keyRef,
    algorithm,
    data,
    provider,
    nodeAddress,
    expirationTime,
  }: {
    keyRef: Pick<IKey, 'kid'>
    algorithm?: string
    data: Uint8Array
    provider: LacchainProvider
    nodeAddress: string
    expirationTime: number | string
  }): Promise<string> {
    let managedKey: ManagedPrivateKey
    try {
      managedKey = await this.identiKeyStore.getKey({ alias: keyRef.kid })
    } catch (e) {
      throw new Error(`key_not_found: No key entry found for kid=${keyRef.kid}`)
    }

    if (managedKey.type === 'Secp256k1') {
      if (
        typeof algorithm !== 'undefined' &&
        ['eth_signTransaction', 'signTransaction', 'signTx'].includes(algorithm)
      ) {
        return await this.eth_lac_signTransaction(
          managedKey.privateKeyHex,
          data,
          provider,
          nodeAddress,
          Number(expirationTime),
        )
      }
    }

    throw Error(`not_supported: Cannot sign ${algorithm} using key of type ${managedKey.type}`)
  }

  /**
   * @returns a `0x` prefixed hex string representing the signed raw transaction
   */
  private async eth_lac_signTransaction(
    privateKeyHex: string,
    rlpTransaction: Uint8Array,
    provider: LacchainProvider,
    nodeAddress: string,
    expirationTime: number = 1936394529,
  ) {
    const transaction = Transaction.from(bytesToHex(rlpTransaction, true))
    const wallet = new LacchainSigner(privateKeyHex, provider, nodeAddress, expirationTime)

    if (transaction.from) {
      // debug('WARNING: executing a transaction signing request with a `from` field.')
      if (wallet.address.toLowerCase() !== transaction.from.toLowerCase()) {
        const msg =
          'invalid_arguments: eth_signTransaction `from` field does not match the chosen key. `from` field should be omitted.'
        // debug(msg)
        throw new Error(msg)
      }
    }
    const signedRawTransaction = await wallet.signTransaction(transaction)

    return signedRawTransaction
  }
}
