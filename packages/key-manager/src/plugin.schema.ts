export const schema = {
  IKeyManager: {
    components: {
      schemas: {
        IKeyManagerCreateArgs: {
          type: 'object',
          properties: {
            type: {
              $ref: '#/components/schemas/TKeyType',
              description: 'Key type',
            },
            kms: {
              type: 'string',
              description: 'Key Management System',
            },
            meta: {
              $ref: '#/components/schemas/KeyMetadata',
              description: 'Optional. Key meta data',
            },
          },
          required: ['type', 'kms'],
          description: 'Input arguments for  {@link IKeyManager.keyManagerCreate | keyManagerCreate }',
        },
        TKeyType: {
          type: 'string',
          enum: ['Ed25519', 'Secp256k1', 'Secp256r1', 'X25519', 'Bls12381G1', 'Bls12381G2'],
          description: 'Cryptographic key type.',
        },
        KeyMetadata: {
          type: 'object',
          properties: {
            algorithms: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/TAlg',
              },
            },
          },
          description:
            'This encapsulates data about a key.\n\nImplementations of  {@link  @veramo/key-manager#AbstractKeyManagementSystem | AbstractKeyManagementSystem }  should populate this object, for each key, with the algorithms that can be performed using it.\n\nThis can also be used to add various tags to the keys under management.',
        },
        TAlg: {
          type: 'string',
          description:
            'Known algorithms supported by some of the above key types defined by  {@link  TKeyType } .\n\nActual implementations of  {@link  @veramo/key-manager#AbstractKeyManagementSystem | Key Management Systems }  can support more. One should check the  {@link IKey.meta | IKey.meta.algorithms }  property to see what is possible for a particular managed key.',
        },
        ManagedKeyInfo: {
          type: 'object',
          properties: {
            kid: {
              type: 'string',
              description: 'Key ID',
            },
            kms: {
              type: 'string',
              description: 'Key Management System',
            },
            type: {
              $ref: '#/components/schemas/TKeyType',
              description: 'Key type',
            },
            publicKeyHex: {
              type: 'string',
              description: 'Public key',
            },
            meta: {
              anyOf: [
                {
                  $ref: '#/components/schemas/KeyMetadata',
                },
                {
                  type: 'null',
                },
              ],
              description:
                'Optional. Key metadata. This should be used to determine which algorithms are supported.',
            },
          },
          required: ['kid', 'kms', 'type', 'publicKeyHex'],
          description:
            'Represents information about a managed key. Private or secret key material is NOT present.',
        },
        IKeyManagerDecryptJWEArgs: {
          type: 'object',
          properties: {
            kid: {
              type: 'string',
              description: 'Key ID',
            },
            data: {
              type: 'string',
              description: 'Encrypted data',
            },
          },
          required: ['kid', 'data'],
          description:
            'Input arguments for  {@link IKeyManager.keyManagerDecryptJWE | keyManagerDecryptJWE }',
        },
        IKeyManagerDeleteArgs: {
          type: 'object',
          properties: {
            kid: {
              type: 'string',
              description: 'Key ID',
            },
          },
          required: ['kid'],
          description: 'Input arguments for  {@link IKeyManager.keyManagerDelete | keyManagerDelete }',
        },
        IKeyManagerEncryptJWEArgs: {
          type: 'object',
          properties: {
            kid: {
              type: 'string',
              description: 'Key ID to use for encryption',
            },
            to: {
              type: 'object',
              properties: {
                kid: {
                  type: 'string',
                  description: 'Key ID',
                },
                type: {
                  $ref: '#/components/schemas/TKeyType',
                  description: 'Key type',
                },
                publicKeyHex: {
                  type: 'string',
                  description: 'Public key',
                },
                privateKeyHex: {
                  type: 'string',
                  description: 'Optional. Private key',
                },
                meta: {
                  anyOf: [
                    {
                      $ref: '#/components/schemas/KeyMetadata',
                    },
                    {
                      type: 'null',
                    },
                  ],
                  description:
                    'Optional. Key metadata. This should be used to determine which algorithms are supported.',
                },
              },
              required: ['kid', 'type', 'publicKeyHex'],
              description: 'Recipient key object',
            },
            data: {
              type: 'string',
              description: 'Data to encrypt',
            },
          },
          required: ['kid', 'to', 'data'],
          description:
            'Input arguments for  {@link IKeyManager.keyManagerEncryptJWE | keyManagerEncryptJWE }',
        },
        IKeyManagerGetArgs: {
          type: 'object',
          properties: {
            kid: {
              type: 'string',
              description: 'Key ID',
            },
          },
          required: ['kid'],
          description: 'Input arguments for  {@link IKeyManager.keyManagerGet | keyManagerGet }',
        },
        IKey: {
          type: 'object',
          properties: {
            kid: {
              type: 'string',
              description: 'Key ID',
            },
            kms: {
              type: 'string',
              description: 'Key Management System',
            },
            type: {
              $ref: '#/components/schemas/TKeyType',
              description: 'Key type',
            },
            publicKeyHex: {
              type: 'string',
              description: 'Public key',
            },
            privateKeyHex: {
              type: 'string',
              description: 'Optional. Private key',
            },
            meta: {
              anyOf: [
                {
                  $ref: '#/components/schemas/KeyMetadata',
                },
                {
                  type: 'null',
                },
              ],
              description:
                'Optional. Key metadata. This should be used to determine which algorithms are supported.',
            },
          },
          required: ['kid', 'kms', 'type', 'publicKeyHex'],
          description: 'Cryptographic key, usually managed by the current Veramo instance.',
        },
        MinimalImportableKey: {
          $ref: '#/components/schemas/RequireOnly<IKey,("privateKeyHex"|"type"|"kms")>',
          description: 'Represents the properties required to import a key.',
        },
        'RequireOnly<IKey,("privateKeyHex"|"type"|"kms")>': {
          type: 'object',
          properties: {
            kid: {
              type: 'string',
              description: 'Key ID',
            },
            kms: {
              type: 'string',
              description: 'Key Management System',
            },
            type: {
              $ref: '#/components/schemas/TKeyType',
              description: 'Key type',
            },
            publicKeyHex: {
              type: 'string',
              description: 'Public key',
            },
            privateKeyHex: {
              type: 'string',
              description: 'Optional. Private key',
            },
            meta: {
              anyOf: [
                {
                  $ref: '#/components/schemas/KeyMetadata',
                },
                {
                  type: 'null',
                },
              ],
              description:
                'Optional. Key metadata. This should be used to determine which algorithms are supported.',
            },
          },
          description:
            'Represents an object type where a subset of keys are required and everything else is optional.',
        },
        IKeyManagerSharedSecretArgs: {
          type: 'object',
          properties: {
            secretKeyRef: {
              type: 'string',
              description:
                'The secret key handle (`kid`) as returned by  {@link IKeyManager.keyManagerCreate | keyManagerCreate }',
            },
            publicKey: {
              type: 'object',
              properties: {
                publicKeyHex: {
                  type: 'string',
                  description: 'Public key',
                },
                type: {
                  $ref: '#/components/schemas/TKeyType',
                  description: 'Key type',
                },
              },
              required: ['publicKeyHex', 'type'],
              description:
                'The public key of the other party. The `type` of key MUST be compatible with the type referenced by `secretKeyRef`',
            },
          },
          required: ['secretKeyRef', 'publicKey'],
          description:
            'Input arguments for  {@link IKeyManager.keyManagerSharedSecret | keyManagerSharedSecret }',
        },
        IKeyManagerSignArgs: {
          type: 'object',
          properties: {
            keyRef: {
              type: 'string',
              description: 'The key handle, as returned during `keyManagerCreateKey`',
            },
            algorithm: {
              type: 'string',
              description:
                'The algorithm to use for signing. This must be one of the algorithms supported by the KMS for this key type.\n\nThe algorithm used here should match one of the names listed in `IKey.meta.algorithms`',
            },
            data: {
              type: 'string',
              description: 'Data to sign',
            },
            encoding: {
              type: 'string',
              enum: ['utf-8', 'base16', 'base64', 'hex'],
              description:
                'If the data is a "string" then you can specify which encoding is used. Default is "utf-8"',
            },
          },
          required: ['keyRef', 'data'],
          description: 'Input arguments for  {@link IKeyManager.keyManagerSign | keyManagerSign }',
        },
        IKeyManagerSignEthTXArgs: {
          type: 'object',
          properties: {
            kid: {
              type: 'string',
              description: 'Key ID',
            },
            transaction: {
              type: 'object',
              description: 'Ethereum transaction object',
            },
          },
          required: ['kid', 'transaction'],
          description: 'Input arguments for  {@link IKeyManager.keyManagerSignEthTX | keyManagerSignEthTX }',
        },
        IKeyManagerSignJWTArgs: {
          type: 'object',
          properties: {
            kid: {
              type: 'string',
              description: 'Key ID',
            },
            data: {
              anyOf: [
                {
                  type: 'string',
                },
                {
                  type: 'object',
                  properties: {
                    BYTES_PER_ELEMENT: {
                      type: 'number',
                    },
                    buffer: {
                      anyOf: [
                        {
                          type: 'object',
                          properties: {
                            byteLength: {
                              type: 'number',
                            },
                          },
                          required: ['byteLength'],
                        },
                        {},
                      ],
                    },
                    byteLength: {
                      type: 'number',
                    },
                    byteOffset: {
                      type: 'number',
                    },
                    length: {
                      type: 'number',
                    },
                  },
                  required: ['BYTES_PER_ELEMENT', 'buffer', 'byteLength', 'byteOffset', 'length'],
                  additionalProperties: {
                    type: 'number',
                  },
                },
              ],
              description: 'Data to sign',
            },
          },
          required: ['kid', 'data'],
          description: 'Input arguments for  {@link IKeyManager.keyManagerSignJWT | keyManagerSignJWT }',
        },
      },
      methods: {
        keyManagerCreate: {
          description: 'Creates and returns a new key',
          arguments: {
            $ref: '#/components/schemas/IKeyManagerCreateArgs',
          },
          returnType: {
            $ref: '#/components/schemas/ManagedKeyInfo',
          },
        },
        keyManagerDecryptJWE: {
          description: 'Decrypts data This API may change without a BREAKING CHANGE notice.',
          arguments: {
            $ref: '#/components/schemas/IKeyManagerDecryptJWEArgs',
          },
          returnType: {
            type: 'string',
          },
        },
        keyManagerDelete: {
          description: 'Deletes a key',
          arguments: {
            $ref: '#/components/schemas/IKeyManagerDeleteArgs',
          },
          returnType: {
            type: 'boolean',
          },
        },
        keyManagerEncryptJWE: {
          description: 'Encrypts data This API may change without a BREAKING CHANGE notice.',
          arguments: {
            $ref: '#/components/schemas/IKeyManagerEncryptJWEArgs',
          },
          returnType: {
            type: 'string',
          },
        },
        keyManagerGet: {
          description: 'Returns an existing key',
          arguments: {
            $ref: '#/components/schemas/IKeyManagerGetArgs',
          },
          returnType: {
            $ref: '#/components/schemas/IKey',
          },
        },
        keyManagerGetKeyManagementSystems: {
          description: 'Lists available key management systems',
          arguments: {
            type: 'object',
          },
          returnType: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
        keyManagerImport: {
          description: 'Imports a created key',
          arguments: {
            $ref: '#/components/schemas/MinimalImportableKey',
          },
          returnType: {
            $ref: '#/components/schemas/ManagedKeyInfo',
          },
        },
        keyManagerSharedSecret: {
          description: 'Compute a shared secret with the public key of another party.',
          arguments: {
            $ref: '#/components/schemas/IKeyManagerSharedSecretArgs',
          },
          returnType: {
            type: 'string',
          },
        },
        keyManagerSign: {
          description: 'Generates a signature according to the algorithm specified.',
          arguments: {
            $ref: '#/components/schemas/IKeyManagerSignArgs',
          },
          returnType: {
            type: 'string',
          },
        },
        keyManagerSignEthTX: {
          description: 'Signs Ethereum transaction',
          arguments: {
            $ref: '#/components/schemas/IKeyManagerSignEthTXArgs',
          },
          returnType: {
            type: 'string',
          },
        },
        keyManagerSignJWT: {
          description: 'Signs JWT',
          arguments: {
            $ref: '#/components/schemas/IKeyManagerSignJWTArgs',
          },
          returnType: {
            type: 'string',
          },
        },
        keyManagerLacSign: {
          description: 'Sign transaction for Lacchain',
          arguments: {
            $ref: '#/components/schemas/IKeyManagerSignArgs',
          },
          returnType: {
            type: 'string',
          },
        },
      },
    },
  },
}
