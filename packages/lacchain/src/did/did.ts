import { Signer as TxSigner, Provider, Overrides } from 'ethers'
import DIDRegistry from './registry.js'
import { attributeToHex } from './utils.js'

interface IConfig {
  identifier: string
  chainNameOrId?: string | number | bigint

  registry: string

  alg?: 'ES256K' | 'ES256K-R'
  txSigner: TxSigner
  privateKey?: string

  rpcUrl?: string
  provider: Provider
}

export default class LacDID {
  public did: string
  private controller: DIDRegistry

  constructor(conf: IConfig) {
    this.did = conf.identifier
    this.controller = new DIDRegistry(conf.identifier, conf.registry, conf.txSigner, conf.provider)
  }

  async setAttribute(
    key: string,
    value: string | Uint8Array,
    expiresIn = 86400,
    txOptions: Overrides = {},
  ): Promise<string> {
    const receipt = await this.controller.setAttribute(key, attributeToHex(key, value), expiresIn, {
      ...txOptions,
    })
    return receipt.hash
  }

  async revokeAttribute(key: string, value: string | Uint8Array, txOptions: Overrides = {}): Promise<string> {
    const receipt = await this.controller.revokeAttribute(key, attributeToHex(key, value), {
      ...txOptions,
    })
    return receipt.hash
  }
}
