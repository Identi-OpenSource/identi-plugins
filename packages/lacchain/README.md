# LACChain plugin

This plugin provides a DID Provider for LACChain.

This plugins depends on `@identi-digital/key-manager` plugin because it uses the KMS to sign transactions.

## Usage

### Install

```bash
pnpm add @identi-digital/lacchain
```

### Setup

```yaml
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
          $require: '@identi-digital/lacchain#EthrDIDLacProvider'
          $args:
            - defaultKms: local
              networks:
                - name: lacchain
                  rpcUrl: 'http://0.0.0.0'
                  registry: '0x...' # DIDRegistry smart contract address
                  nodeAddress: '0x...' # LACChain node address
```
