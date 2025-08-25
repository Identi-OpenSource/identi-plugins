import crypto from 'crypto'
import * as web3Abi from 'web3-eth-abi'
import * as web3Utils from 'web3-utils'
import * as ethUtil from 'ethereumjs-util'

const VERIFIABLE_CREDENTIAL_TYPEHASH = web3Utils.soliditySha3(
  'VerifiableCredential(address issuer,address subject,bytes32 data,uint256 validFrom,uint256 validTo)',
)
const EIP712DOMAIN_TYPEHASH = web3Utils.soliditySha3(
  'EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)',
)

export function sha256(data: string): string {
  const hashFn = crypto.createHash('sha256')
  hashFn.update(data)
  return hashFn.digest('hex')
}

export function getCredentialHash(
  claimsVerifierContractAddress: string,
  verifiableCredential: any,
  issuer: any,
  subjectAddress: string,
) {
  const hashHex = `0x${sha256(JSON.stringify(verifiableCredential.credentialSubject))}`
  const encodeEIP712Domain = web3Abi.encodeParameters(
    ['bytes32', 'bytes32', 'bytes32', 'uint256', 'address'],
    [
      EIP712DOMAIN_TYPEHASH,
      web3Utils.sha3('EIP712Domain'),
      web3Utils.sha3('1'),
      648529,
      claimsVerifierContractAddress,
    ],
  )

  const hashEIP712Domain = web3Utils.soliditySha3(encodeEIP712Domain)
  const validFrom = new Date(verifiableCredential.issuanceDate).getTime()
  const validTo = new Date(verifiableCredential.expirationDate).getTime()
  const encodeHashCredential = web3Abi.encodeParameters(
    ['bytes32', 'address', 'address', 'bytes32', 'uint256', 'uint256'],
    [
      VERIFIABLE_CREDENTIAL_TYPEHASH,
      issuer.address,
      subjectAddress,
      hashHex,
      Math.round(validFrom / 1000),
      Math.round(validTo / 1000),
    ],
  )
  const hashCredential = web3Utils.soliditySha3(encodeHashCredential)
  const encodedCredentialHash = web3Abi.encodeParameters(
    ['bytes32', 'bytes32'],
    [hashEIP712Domain, hashCredential?.toString()],
  )
  return web3Utils.soliditySha3('0x1901'.toString() + encodedCredentialHash.substring(2, 131))
}

export function signCredential(credentialHash: string, issuer: any): string {
  const rsv = ethUtil.ecsign(
    Buffer.from(credentialHash.substring(2, 67), 'hex'),
    Buffer.from(
      issuer.privateKey.startsWith('0x') ? issuer.privateKey.substring(2) : issuer.privateKey,
      'hex',
    ),
  )
  return ethUtil.toRpcSig(rsv.v, rsv.r, rsv.s)
}
