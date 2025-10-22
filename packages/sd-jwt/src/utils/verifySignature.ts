import { subtle } from 'node:crypto'

async function verifySignature(data: string, signature: string, key: JsonWebKey) {
  let { alg, crv } = key
  if (alg === 'ES256') alg = 'ECDSA'
  const publicKey = await subtle.importKey(
    'jwk',
    key,
    { name: alg, namedCurve: crv } as EcKeyImportParams,
    true,
    ['verify'],
  )
  return Promise.resolve(
    subtle.verify(
      { name: alg as string, hash: 'SHA-256' },
      publicKey,
      Buffer.from(signature, 'base64'),
      Buffer.from(data),
    ),
  )
}

export { verifySignature }
