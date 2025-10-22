/**
 * @public
 */
export { SDJwtPlugin } from './SDJwt.js'
export * from './types/ISDJwtPlugin.js'

import { digest, generateSalt } from '@sd-jwt/crypto-nodejs'
import { verifySignature } from './utils/verifySignature.js'

export { digest, generateSalt, verifySignature }
