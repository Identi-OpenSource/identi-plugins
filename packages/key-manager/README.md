# Key manager plugin

This plugin manages keys.

## Usage

### Install

```bash
pnpm add @identi-digital/key-manager
```

### Setup

```yaml
keyManager:
  $require: '@identi-digital/key-manager#KeyManager'
  $args:
    - store:
        $require: '@veramo/data-store#KeyStore'
        $args:
          - $ref: /dbConnection
      kms:
        local:
          $require: '@identi-digital/key-manager#KeyManagementSystem'
          $args:
            - $require: '@veramo/data-store#PrivateKeyStore'
              $args:
                - $ref: /dbConnection
                - $require: '@veramo/kms-local#SecretBox'
                  $args:
                    - $ref: /constants/secretKey
```
