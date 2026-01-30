# LACChain plugin for Veramo framework

This plugin provides all the functionality to manage DIDs on the LACChain blockchain using `ethr` or `lac` methods.

## Usage

### Install

```bash
pnpm add @identi-digital/lacchain
```

### Setup

#### For `ethr` method

```yaml
keyManager:
  $require: '@veramo/key-manager#KeyManager'
  $args:
    - store:
        $require: '@veramo/data-store#KeyStore'
        $args:
          - $ref: /dbConnection
      kms:
        lacchain:
          $require: '@identi-digital/lacchain#KeyManagementSystem'
          $args:
            - $require: '@veramo/data-store#PrivateKeyStore'
              $args:
                - $ref: /dbConnection
                - $require: '@veramo/kms-local#SecretBox'
                  $args:
                    - $ref: /constants/secretKey

ethr-did-resolver:
  $require: ethr-did-resolver?t=function&p=/ethr#getResolver
  $args:
    - networks:
        - name: lacchain
          rpcUrl: 'http://0.0.0.0'
          registry: '0x...' # DIDRegistry smart contract address

didManager:
  $require: '@veramo/did-manager#DIDManager'
  $args:
    - store:
        $require: '@veramo/data-store#DIDStore'
        $args:
          - $ref: /dbConnection
      defaultProvider: did:ethr:lacchain
      providers:
        did:ethr:lacchain:
          $require: '@identi-digital/lacchain#EthrLacDIDProvider'
          $args:
            - defaultKms: lacchain
              networks:
                - name: lacchain
                  rpcUrl: 'http://0.0.0.0'
                  registry: '0x...' # DIDRegistry smart contract address
                  nodeAddress: '0x...' # LACChain node address
```

#### For lac method

```yaml
keyManager:
  $require: '@veramo/key-manager#KeyManager'
  $args:
    - store:
        $require: '@veramo/data-store#KeyStore'
        $args:
          - $ref: /dbConnection
      kms:
        lacchain:
          $require: '@identi-digital/lacchain#KeyManagementSystem'
          $args:
            - $require: '@veramo/data-store#PrivateKeyStore'
              $args:
                - $ref: /dbConnection
                - $require: '@veramo/kms-local#SecretBox'
                  $args:
                    - $ref: /constants/secretKey

didResolver:
  $require: '@veramo/did-resolver#DIDResolverPlugin'
  $args:
    - resolver:
        $require: did-resolver#Resolver
        $args:
            # add others resolvers here
            lac:
              $ref: /did-lac-resolver

did-lac-resolver:
  $require: '@identi-digital/lacchain?t=function&p=/lac#getResolver'
  $args:
    - registry: '0x...'
      networks:
        - name: openprotest
          registry: '0x...'
          nodeAddress: '0x...'
          rpcUrl: 'http://0.0.0.0'

didManager:
  $require: '@veramo/did-manager#DIDManager'
  $args:
    - store:
        $require: '@veramo/data-store#DIDStore'
        $args:
          - $ref: /dbConnection
      defaultProvider: did:lac:openprotest
      providers:
        did:lac:openprotest:
          $require: '@identi-digital/lacchain#LacDIDProvider'
          $args:
            - defaultKms: lacchain
              networks:
                - name: openprotest
                  rpcUrl: 'http://0.0.0.0'
                  registry: '0x...'
                  nodeAddress: '0x...'
                  expirationTime: 1946394529
```
