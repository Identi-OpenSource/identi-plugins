import { isAddress, Contract, Overrides, TransactionReceipt, Signer, Provider } from 'ethers'
import { DID_REGISTRY_CONTRACT_GAS } from '../abi/did_registry.js'
import { interpretIdentifier, stringToBytes } from './utils.js'

export default class DIDRegistry {
  private provider: any
  private contract: any
  private address: string

  constructor(identifier: string, registry: string, signer: Signer, provider: Provider) {
    if (!isAddress(registry)) {
      throw new Error("Invalid 'registry' attribute")
    }
    const { address, network } = interpretIdentifier(identifier)
    this.address = address
    this.provider = provider
    this.contract = new Contract(registry, DID_REGISTRY_CONTRACT_GAS.abi, this.provider).connect(signer)
  }

  async setAttribute(
    attrName: string,
    attrValue: string,
    exp: number,
    options: Overrides = {},
  ): Promise<TransactionReceipt> {
    attrName = attrName.startsWith('0x') ? attrName : stringToBytes(attrName)

    return this.contract.setAttribute(this.address, attrName, attrValue, exp, options)
  }

  async revokeAttribute(
    attrName: string,
    attrValue: string,
    options: Overrides = {},
  ): Promise<TransactionReceipt> {
    attrName = attrName.startsWith('0x') ? attrName : stringToBytes(attrName)
    return this.contract.revokeAttribute(this.address, attrName, attrValue, options)
  }
}
