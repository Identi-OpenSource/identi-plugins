import { ethers } from 'ethers'
import * as ethUtil from 'ethereumjs-util'
import { CREDENTIAL_REGISTRY_GAS, CLAIMS_VERIFIER_GAS } from '../abi/credentials.js'
import { LacchainSigner } from '@lacchain/gas-model-provider'
import { getCredentialHash, signCredential, sha256 } from '../utils/credential.js'
import { LacchainProvider } from '@lacchain/gas-model-provider'

export enum RoleType {
  ISSUER = 'ISSUER',
  SIGNER = 'SIGNER',
}

export interface IDeployContract {
  address: string
  hash: string
}

export default class CredentialRegistryService {
  private ISSUER_ROLE = '0x114e74f6ea3bd819998f78687bfcb11b140da08e9b7d222fa9c1f1ba1f2aa122'
  private SIGNER_ROLE = '0xe2f4eaae4a9751e85a3e4a7b9587827a877f29914755229b07a7b2da98285f70'

  constructor() {}

  async deployCredentialRegistry(signer: LacchainSigner): Promise<IDeployContract> {
    const CredentialRegistry = new ethers.ContractFactory(
      CREDENTIAL_REGISTRY_GAS.abi,
      CREDENTIAL_REGISTRY_GAS.bytecode,
      signer,
    )
    const registry = await CredentialRegistry.deploy({ gasPrice: 0 })
    const receipt = await registry.deploymentTransaction()?.wait()

    return {
      address: receipt!.contractAddress || '',
      hash: receipt!.hash || '',
    }
  }

  async deployClaimsVerifier(
    credentialRegistryAddress: string,
    signer: LacchainSigner,
  ): Promise<IDeployContract> {
    const ClaimsVerifier = new ethers.ContractFactory(
      CLAIMS_VERIFIER_GAS.abi,
      CLAIMS_VERIFIER_GAS.bytecode,
      signer,
    )

    const claimsVerifier = await ClaimsVerifier.deploy(credentialRegistryAddress, { gasPrice: 0 })
    const receipt = await claimsVerifier.deploymentTransaction()?.wait()
    const credentialRegistry = new ethers.Contract(
      credentialRegistryAddress,
      CREDENTIAL_REGISTRY_GAS.abi,
      signer,
    )

    await credentialRegistry.grantRole(this.ISSUER_ROLE, receipt?.contractAddress).catch((err) => {
      throw new Error(`Failed to grant ISSUER_ROLE: ${err.message}`)
    })

    return {
      address: receipt!.contractAddress || '',
      hash: receipt!.hash || '',
    }
  }

  async grantRole(
    claimsVerifierAddress: string,
    address: string,
    roleType: RoleType,
    signer: LacchainSigner,
  ) {
    const claimsVerifier = new ethers.Contract(claimsVerifierAddress, CLAIMS_VERIFIER_GAS.abi, signer)
    const role = roleType === RoleType.ISSUER ? this.ISSUER_ROLE : this.SIGNER_ROLE

    const tx = await claimsVerifier.grantRole(role, address).catch((err) => {
      throw new Error(`Failed to grant ${roleType}_ROLE: ${err.message}`)
    })
    return { hash: tx.hash }
  }

  async hasRole(claimsVerifierAddress: string, address: string, roleType: RoleType, signer: LacchainSigner) {
    const claimsVerifier = new ethers.Contract(claimsVerifierAddress, CLAIMS_VERIFIER_GAS.abi, signer)
    const role = roleType === RoleType.ISSUER ? this.ISSUER_ROLE : this.SIGNER_ROLE
    const tx = await claimsVerifier.hasRole(role, address).catch((err) => {
      throw new Error(`Failed to check ${roleType}_ROLE: ${err.message}`)
    })

    return tx
  }

  async revokeRole(
    claimsVerifierAddress: string,
    address: string,
    roleType: RoleType,
    signer: LacchainSigner,
  ) {
    const claimsVerifier = new ethers.Contract(claimsVerifierAddress, CLAIMS_VERIFIER_GAS.abi, signer)
    const role = roleType === RoleType.ISSUER ? this.ISSUER_ROLE : this.SIGNER_ROLE

    const tx = await claimsVerifier.revokeRole(role, address).catch((err) => {
      throw new Error(`Failed to revoke ${roleType}_ROLE: ${err.message}`)
    })
    return { hash: tx.hash }
  }

  async registerCredential(
    claimsVerifierAddress: string,
    verifiableCredential: any,
    subjectAddress: string,
    signer: LacchainSigner,
  ) {
    const claimsVerifier = new ethers.Contract(claimsVerifierAddress, CLAIMS_VERIFIER_GAS.abi, signer)
    const credentialHash = getCredentialHash(
      claimsVerifierAddress,
      verifiableCredential,
      signer,
      subjectAddress,
    )
    if (!credentialHash) {
      throw new Error('Failed to get credential hash')
    }
    const signature = signCredential(credentialHash, signer)
    const tx = await claimsVerifier.registerCredential(
      subjectAddress,
      credentialHash,
      Math.round(new Date(verifiableCredential.issuanceDate).getTime() / 1000),
      Math.round(new Date(verifiableCredential.expirationDate).getTime() / 1000),
      signature,
      {
        gasLimit: 4000000,
        gasPrice: 0,
      },
    )
    await tx.wait()

    verifiableCredential.proof = [
      {
        id: verifiableCredential.issuer.id,
        type: 'EcdsaSecp256k1Signature2019',
        proofPurpose: 'assertionMethod',
        verificationMethod: `${verifiableCredential.issuer.id}#vm-0`,
        domain: claimsVerifierAddress,
        proofValue: signature,
      },
    ]

    return verifiableCredential
  }

  async revokeCredential(
    claimsVerifierAddress: string,
    verifiableCredential: any,
    subjectAddress: string,
    signer: LacchainSigner,
  ) {
    const claimsVerifier = new ethers.Contract(claimsVerifierAddress, CLAIMS_VERIFIER_GAS.abi, signer)
    const credentialHash = getCredentialHash(
      claimsVerifierAddress,
      verifiableCredential,
      signer,
      subjectAddress,
    )

    const tx = await claimsVerifier.revokeCredential(credentialHash)

    return tx.receipt.status
  }

  async verifyCredential(
    claimsVerifierAddress: string,
    verifiableCredential: any,
    issuerAddress: string,
    subjectAddress: string,
    signer: LacchainSigner | LacchainProvider,
  ) {
    const claimsVerifier = new ethers.Contract(claimsVerifierAddress, CLAIMS_VERIFIER_GAS.abi, signer)

    const data = `0x${sha256(JSON.stringify(verifiableCredential.credentialSubject))}`

    const rsv = ethUtil.fromRpcSig(verifiableCredential.proof[0].proofValue)
    const tx = await claimsVerifier.verifyCredential(
      [
        issuerAddress,
        subjectAddress,
        data,
        Math.round(new Date(verifiableCredential.issuanceDate).getTime() / 1000),
        Math.round(new Date(verifiableCredential.expirationDate).getTime() / 1000),
      ],
      rsv.v,
      rsv.r,
      rsv.s,
    )

    return {
      credentialExists: tx[0],
      isNotRevoked: tx[1],
      issuerSignatureValid: tx[2],
      additionalSigners: tx[3],
      isNotExpired: tx[4],
    }
  }
}
