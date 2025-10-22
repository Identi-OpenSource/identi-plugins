# `@identi-digital/sd-jwt`

A plugin for creating and verifying Selective Disclosure JSON Web Tokens (SD-JWTs).

## Usage

```
npm install @identi-digital/sd-jwt
```

Add the next configuration to your `agent.yml` file:
```yaml
constants:
  methods:
    - createVerifiableCredentialSDJwt
    - createVerifiablePresentationSDJwt
    - verifyVerifiableCredentialSDJwt
    - verifyVerifiablePresentationSDJwt

didResolver:
  $require: '@veramo/did-resolver#DIDResolverPlugin'
  $args:
    - resolver:
        $require: did-resolver#Resolver
        $args:
          - jwk:
              $ref: /jwk-did-resolver

jwk-did-resolver:
  $require: '@veramo/did-provider-jwk?t=function&p=/jwk#getDidJwkResolver'

didManager:
  $require: '@veramo/did-manager#DIDManager'
  $args:
    - store:
        $require: '@veramo/data-store#DIDStore'
        $args:
          - $ref: /dbConnection
      defaultProvider: did:jwk
      providers:
        did:jwk:
          $require: '@veramo/did-provider-jwk#JwkDIDProvider'
          $args:
            - defaultKms: local

SDJwtPlugin:
  $require: '@identi-digital/sd-jwt#SDJwtPlugin'
  $args:
    - hasher:
        $require: '@identi-digital/sd-jwt?t=object#digest'
      saltGenerator:
        $require: '@identi-digital/sd-jwt?t=object#generateSalt'
      verifySignature:
        $require: '@identi-digital/sd-jwt?t=object#verifySignature'

agent:
  $require: '@veramo/core#Agent'
  $args:
    - schemaValidation: false
      plugins:
        - $ref: /SDJwtPlugin
```

# How to use

### Create did:jwk for Issuer and Holder

**Request:**
```json
POST /didManagerCreate
Content-Type: application/json

{
  "provider": "did:jwk",
  "options": { "keyType": "Secp256r1" }
}
```

### Create Verifiable Credential SD-JWT

**Request:**
```json
POST /createVerifiableCredentialSDJwt
Content-Type: application/json

{
  "credentialPayload": {
    "issuer": "did:jwk:eyJh...",
    "credentialSubject": {
      "id": "did:jwk:eyJh...",
      "sub": "john_deo",
      "given_name": "John",
      "family_name": "Deo",
      "email": "johndeo@example.com"
    },
    "type": ["VerifiableCredential"],
    "@context": ["https://www.w3.org/2018/credentials/v1"],
    "issuanceDate": "2025-01-01T19:56:39.000Z",
    "expirationDate": "2026-01-01T19:56:39.000Z",
    "id": "b95925fe-dfd2-4c1b-8a91-1cab0318df24"
  },
  "disclosureFrame": {
    "credentialSubject": {
      "_sd": ["sub", "given_name", "family_name", "email"]
    }
  }
}
```

**Response:**
```json
{
  "credential": "eyJhbG...",
  "credentialDecode": {
    "jwt": {
      "header": {
        "alg": "ES256"
      },
      "payload": {
      },
      "signature": "0OU4jvF",
      "encoded": "eyJhbG..."
    },
    "disclosures": [
    ]
  }
}
```

### Verify Verifiable Credential SD-JWT

**Request:**
```json
POST /verifyVerifiableCredentialSDJwt
Content-Type: application/json

{
  "credential": "eyJhbG..."
}
```

**Response:**
```json
{
  "verifiedPayloads": {
    "payload": {
      "issuer": "did:jwk:eyJ...",
      "credentialSubject": {
        "id": "did:jwk:eyJhb...",
        "given_name": "John",
        "sub": "john_deo",
        "email": "johndeo@example.com",
        "family_name": "Deo"
      },
      "type": [
        "VerifiableCredential"
      ],
      "@context": [
        "https://www.w3.org/2018/credentials/v1"
      ],
      "issuanceDate": "2025-01-01T19:56:39.000Z",
      "expirationDate": "2026-01-01T19:56:39.000Z",
      "id": "b95925fe-dfd2-4c1b-8a91-1cab0318df24"
    },
    "header": {
      "alg": "ES256"
    }
  }
}
```

### Create Verifiable Presentation SD-JWT

**Request:**
```json
POST /createVerifiablePresentationSDJwt
Content-Type: application/json

{
  "credential": "eyJhbGciOiJFUzI1NiJ9...",
  "presentationFrame": {
    "credentialSubject": {
      "given_name": true
    }
  }
}
```

**Response:**
```json
{
  "presentation": "eyJhb...",
  "presentationDecode": {
    "jwt": {
      "header": {
        "alg": "ES256"
      },
      "payload": {
      },
      "signature": "0OU4...",
      "encoded": "eyJhbG..."
    },
    "disclosures": [
        {
        "_digest": "d9G...",
        "_encoded": "WyIzMzlh...",
        "salt": "339a1...",
        "key": "given_name",
        "value": "John"
      }
    ]
  }
}
```

### Verify Verifiable Presentation SD-JWT

**Request:**
```json
POST /verifyVerifiablePresentationSDJwt
Content-Type: application/json

{
  "presentation": "eyJhbGciOiJFUzI1NiJ9..."
}
```

**Response:**
```json
{
  "verifiedPayloads": {
    "payload": {
      "issuer": "did:jwk:eyJhb..",
      "credentialSubject": {
        "id": "did:jwk:eyJh...",
        "given_name": "John"
      },
      "type": [
        "VerifiableCredential"
      ],
      "@context": [
        "https://www.w3.org/2018/credentials/v1"
      ],
      "issuanceDate": "2025-01-01T19:56:39.000Z",
      "expirationDate": "2026-01-01T19:56:39.000Z",
      "id": "b95925fe-dfd2-4c1b-8a91-1cab0318df24"
    },
    "header": {
      "alg": "ES256"
    }
  }
}
```
