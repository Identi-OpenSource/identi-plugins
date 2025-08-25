import DIDRegistry from './registry.js'
import * as ethers from 'ethers'
import { DID_REGISTRY_RECOVERABLE_CONTRACT_GAS } from '../abi/did_registry.js'

export default class DIDRegistryRecoverable extends DIDRegistry {
  constructor(conf = {}) {
    super(conf)
    const provider = this.configureProvider(conf)
    this.registry = new ethers.Contract(conf.registry, DID_REGISTRY_RECOVERABLE_CONTRACT_GAS.abi, provider)
  }

  recover(address, signature, controller) {
    return this.registry.recover(address, signature.v, signature.r, signature.s, controller, {
      gasLimit: 10000000,
      gasPrice: 0,
    })
  }
}
