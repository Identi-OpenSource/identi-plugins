import { IAgentPlugin } from '@veramo/core-types'
import {
  ILacchainPublicKeyDirectory,
  ILacchainVerifyAddressArgs,
  ILacchainVerifyAddressResponse,
  IPKDRequiredContext,
} from './types/ILacchainPublicKeyDirectory.js'
import { fetch } from 'cross-fetch'

import { schema } from './plugin.schema.js'

/**
 * {@inheritDoc IMyAgentPlugin}
 *
 * @beta
 */
export class LacchainPublicKeyDirectoryPlugin implements IAgentPlugin {
  /** Plugin methods */
  readonly methods: ILacchainPublicKeyDirectory
  private basePath: string

  readonly schema = schema.ILacchainPublicKeyDirectory

  constructor(options: { basePath: string }) {
    this.basePath = options.basePath
    this.methods = {
      lacchainVerifyAddress: this.lacchainVerifyAddress.bind(this),
    }
  }

  /** {@inheritdoc ILacchainPublicKeyDirectory.lacchainVerifyAddress} */
  private async lacchainVerifyAddress(
    args: ILacchainVerifyAddressArgs,
    context: IPKDRequiredContext,
  ): Promise<ILacchainVerifyAddressResponse> {
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

    const url = `${this.basePath}/${args.trusted_list_address}/verification/${address}`

    const response = await fetch(url, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error(`invalid_argument: unable to verify address: ${response.statusText}`)
    }

    const data = await response.json()

    const status = data?.entity?.status === 'active' ? true : false

    return {
      result: status,
    }
  }

  private async getAddress(did: string | undefined, context: IPKDRequiredContext): Promise<string> {
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
