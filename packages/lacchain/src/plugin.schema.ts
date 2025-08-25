export const schema = {
  "ILacchainCredential": {
    "components": {
      "schemas": {
        "ILacchainCheckRoleArgs": {
          "type": "object",
          "properties": {
            "kid": {
              "type": "string"
            },
            "claimsVerifierAddress": {
              "type": "string"
            },
            "role": {
              "$ref": "#/components/schemas/RoleType"
            },
            "address": {
              "type": "string"
            },
            "did": {
              "type": "string"
            }
          },
          "required": [
            "kid",
            "claimsVerifierAddress",
            "role"
          ],
          "description": "Arguments for checking a role"
        },
        "RoleType": {
          "type": "string",
          "enum": [
            "ISSUER",
            "SIGNER"
          ]
        },
        "ILacchainDeployArgs": {
          "type": "object",
          "properties": {
            "kid": {
              "type": "string"
            }
          },
          "required": [
            "kid"
          ],
          "description": "Arguments for deploying a contract"
        },
        "ILacchainDeployResponse": {
          "type": "object",
          "properties": {
            "credentialRegistryAddress": {
              "type": "string"
            },
            "claimsVerifierAddress": {
              "type": "string"
            }
          },
          "required": [
            "credentialRegistryAddress",
            "claimsVerifierAddress"
          ],
          "description": "Arguments for deploying a contract"
        },
        "ILacchainGrantRoleArgs": {
          "type": "object",
          "properties": {
            "kid": {
              "type": "string"
            },
            "claimsVerifierAddress": {
              "type": "string"
            },
            "role": {
              "$ref": "#/components/schemas/RoleType"
            },
            "address": {
              "type": "string"
            },
            "did": {
              "type": "string"
            }
          },
          "required": [
            "kid",
            "claimsVerifierAddress",
            "role"
          ],
          "description": "Arguments for granting a role"
        },
        "ILacchainRegisterCredentialArgs": {
          "type": "object",
          "properties": {
            "credential": {
              "$ref": "#/components/schemas/CredentialPayload",
              "description": "The JSON payload of the Credential according to the  {@link https://www.w3.org/TR/vc-data-model/#credentials | canonical model } \n\nThe signer of the Credential is chosen based on the `issuer.id` property of the `credential`\n\n`@context`, `type` and `issuanceDate` will be added automatically if omitted"
            },
            "save": {
              "type": "boolean",
              "description": "If this parameter is true, the resulting VerifiableCredential is sent to the  {@link  @veramo/core-types#IDataStore | storage plugin }  to be saved.",
              "deprecated": "Please call\n{@link @veramo/core-types#IDataStore.dataStoreSaveVerifiableCredential | dataStoreSaveVerifiableCredential()} to\nsave the credential after creating it."
            },
            "removeOriginalFields": {
              "type": "boolean",
              "description": "Remove payload members during JWT-JSON transformation. Defaults to `true`. See https://www.w3.org/TR/vc-data-model/#jwt-encoding"
            },
            "keyRef": {
              "type": "string",
              "description": "[Optional] The ID of the key that should sign this credential. If this is not specified, the first matching key will be used."
            },
            "fetchRemoteContexts": {
              "type": "boolean",
              "description": "When dealing with JSON-LD you also MUST provide the proper contexts. Set this to `true` ONLY if you want the `@context` URLs to be fetched in case they are not preloaded. The context definitions SHOULD rather be provided at startup instead of being fetched.\n\nDefaults to `false`"
            },
            "resolutionOptions": {
              "description": "Any other options that can be forwarded to the lower level libraries"
            },
            "claimsVerifierAddress": {
              "type": "string"
            }
          },
          "required": [
            "claimsVerifierAddress",
            "credential",
            "resolutionOptions"
          ],
          "description": "Arguments for registering a credential"
        },
        "CredentialPayload": {
          "type": "object",
          "properties": {
            "issuer": {
              "$ref": "#/components/schemas/IssuerType"
            },
            "credentialSubject": {
              "$ref": "#/components/schemas/CredentialSubject"
            },
            "type": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "@context": {
              "$ref": "#/components/schemas/ContextType"
            },
            "issuanceDate": {
              "$ref": "#/components/schemas/DateType"
            },
            "expirationDate": {
              "$ref": "#/components/schemas/DateType"
            },
            "credentialStatus": {
              "$ref": "#/components/schemas/CredentialStatusReference"
            },
            "id": {
              "type": "string"
            }
          },
          "required": [
            "issuer"
          ],
          "description": "Used as input when creating Verifiable Credentials"
        },
        "IssuerType": {
          "anyOf": [
            {
              "type": "object",
              "properties": {
                "id": {
                  "type": "string"
                }
              },
              "required": [
                "id"
              ]
            },
            {
              "type": "string"
            }
          ],
          "description": "The issuer of a  {@link  VerifiableCredential }  or the holder of a  {@link  VerifiablePresentation } .\n\nThe value of the issuer property MUST be either a URI or an object containing an id property. It is RECOMMENDED that the URI in the issuer or its id be one which, if de-referenced, results in a document containing machine-readable information about the issuer that can be used to verify the information expressed in the credential.\n\nSee  {@link https://www.w3.org/TR/vc-data-model/#issuer | Issuer data model }"
        },
        "CredentialSubject": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            }
          },
          "description": "The value of the credentialSubject property is defined as a set of objects that contain one or more properties that are each related to a subject of the verifiable credential. Each object MAY contain an id.\n\nSee  {@link https://www.w3.org/TR/vc-data-model/#credential-subject | Credential Subject }"
        },
        "ContextType": {
          "anyOf": [
            {
              "type": "string"
            },
            {
              "type": "object"
            },
            {
              "type": "array",
              "items": {
                "anyOf": [
                  {
                    "type": "string"
                  },
                  {
                    "type": "object"
                  }
                ]
              }
            }
          ],
          "description": "The data type for `@context` properties of credentials, presentations, etc."
        },
        "DateType": {
          "type": "string",
          "description": "Represents an issuance or expiration date for Credentials / Presentations. This is used as input when creating them."
        },
        "CredentialStatusReference": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "type": {
              "type": "string"
            }
          },
          "required": [
            "id",
            "type"
          ],
          "description": "Used for the discovery of information about the current status of a verifiable credential, such as whether it is suspended or revoked. The precise contents of the credential status information is determined by the specific `credentialStatus` type definition, and varies depending on factors such as whether it is simple to implement or if it is privacy-enhancing.\n\nSee  {@link https://www.w3.org/TR/vc-data-model/#status | Credential Status }"
        },
        "ILacchainRevokeCredentialArgs": {
          "type": "object",
          "properties": {
            "credential": {
              "$ref": "#/components/schemas/CredentialPayload",
              "description": "The JSON payload of the Credential according to the  {@link https://www.w3.org/TR/vc-data-model/#credentials | canonical model } \n\nThe signer of the Credential is chosen based on the `issuer.id` property of the `credential`\n\n`@context`, `type` and `issuanceDate` will be added automatically if omitted"
            },
            "save": {
              "type": "boolean",
              "description": "If this parameter is true, the resulting VerifiableCredential is sent to the  {@link  @veramo/core-types#IDataStore | storage plugin }  to be saved.",
              "deprecated": "Please call\n{@link @veramo/core-types#IDataStore.dataStoreSaveVerifiableCredential | dataStoreSaveVerifiableCredential()} to\nsave the credential after creating it."
            },
            "removeOriginalFields": {
              "type": "boolean",
              "description": "Remove payload members during JWT-JSON transformation. Defaults to `true`. See https://www.w3.org/TR/vc-data-model/#jwt-encoding"
            },
            "keyRef": {
              "type": "string",
              "description": "[Optional] The ID of the key that should sign this credential. If this is not specified, the first matching key will be used."
            },
            "fetchRemoteContexts": {
              "type": "boolean",
              "description": "When dealing with JSON-LD you also MUST provide the proper contexts. Set this to `true` ONLY if you want the `@context` URLs to be fetched in case they are not preloaded. The context definitions SHOULD rather be provided at startup instead of being fetched.\n\nDefaults to `false`"
            },
            "resolutionOptions": {
              "description": "Any other options that can be forwarded to the lower level libraries"
            },
            "kid": {
              "type": "string"
            },
            "claimsVerifierAddress": {
              "type": "string"
            }
          },
          "required": [
            "claimsVerifierAddress",
            "credential",
            "kid",
            "resolutionOptions"
          ],
          "description": "Arguments for registering a credential"
        },
        "ILacchainRevokeRoleArgs": {
          "type": "object",
          "properties": {
            "kid": {
              "type": "string"
            },
            "address": {
              "type": "string"
            },
            "did": {
              "type": "string"
            },
            "claimsVerifierAddress": {
              "type": "string"
            },
            "role": {
              "$ref": "#/components/schemas/RoleType"
            }
          },
          "required": [
            "kid",
            "claimsVerifierAddress",
            "role"
          ],
          "description": "Arguments for revoking a role"
        },
        "ILacchainVerifyCredentialArgs": {
          "type": "object",
          "properties": {
            "claimsVerifierAddress": {
              "type": "string"
            },
            "credential": {
              "type": "object",
              "properties": {
                "issuer": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "id"
                  ]
                },
                "proof": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string"
                      },
                      "type": {
                        "type": "string"
                      },
                      "verificationMethod": {
                        "type": "string"
                      },
                      "domain": {
                        "type": "string"
                      },
                      "proofValue": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "id",
                      "type",
                      "verificationMethod",
                      "domain",
                      "proofValue"
                    ]
                  },
                  "minItems": 1,
                  "maxItems": 1
                },
                "credentialSubject": {
                  "$ref": "#/components/schemas/CredentialSubject"
                },
                "type": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "@context": {
                  "$ref": "#/components/schemas/ContextType"
                },
                "issuanceDate": {
                  "$ref": "#/components/schemas/DateType"
                },
                "expirationDate": {
                  "$ref": "#/components/schemas/DateType"
                },
                "credentialStatus": {
                  "$ref": "#/components/schemas/CredentialStatusReference"
                },
                "id": {
                  "type": "string"
                }
              },
              "required": [
                "issuer",
                "proof"
              ]
            }
          },
          "required": [
            "claimsVerifierAddress",
            "credential"
          ],
          "description": "Arguments for verifying a credential"
        },
        "ILacchainVerifyCredentialResponse": {
          "type": "object",
          "properties": {
            "credentialExists": {
              "type": "boolean"
            },
            "isNotRevoked": {
              "type": "boolean"
            },
            "issuerSignatureValid": {
              "type": "boolean"
            },
            "additionalSigners": {
              "type": "boolean"
            },
            "isNotExpired": {
              "type": "boolean"
            }
          },
          "required": [
            "credentialExists",
            "isNotRevoked",
            "issuerSignatureValid",
            "additionalSigners",
            "isNotExpired"
          ],
          "description": "Arguments for verifying a credential"
        }
      },
      "methods": {
        "lacchainCredentialCheckRole": {
          "description": "Check if an address has a specific role",
          "arguments": {
            "$ref": "#/components/schemas/ILacchainCheckRoleArgs"
          },
          "returnType": {
            "type": "boolean"
          }
        },
        "lacchainCredentialDeploy": {
          "description": "Deploy smart contract",
          "arguments": {
            "$ref": "#/components/schemas/ILacchainDeployArgs"
          },
          "returnType": {
            "$ref": "#/components/schemas/ILacchainDeployResponse"
          }
        },
        "lacchainCredentialGrantRole": {
          "description": "Grant role to an address",
          "arguments": {
            "$ref": "#/components/schemas/ILacchainGrantRoleArgs"
          },
          "returnType": {
            "type": "boolean"
          }
        },
        "lacchainCredentialRegisterCredential": {
          "description": "Register a credential",
          "arguments": {
            "$ref": "#/components/schemas/ILacchainRegisterCredentialArgs"
          },
          "returnType": {
            "type": "string"
          }
        },
        "lacchainCredentialRevokeCredential": {
          "description": "Revoke a credential",
          "arguments": {
            "$ref": "#/components/schemas/ILacchainRevokeCredentialArgs"
          },
          "returnType": {
            "type": "string"
          }
        },
        "lacchainCredentialRevokeRole": {
          "description": "Revoke role from an address",
          "arguments": {
            "$ref": "#/components/schemas/ILacchainRevokeRoleArgs"
          },
          "returnType": {
            "type": "boolean"
          }
        },
        "lacchainCredentialVerifyCredential": {
          "description": "Verify a credential",
          "arguments": {
            "$ref": "#/components/schemas/ILacchainVerifyCredentialArgs"
          },
          "returnType": {
            "$ref": "#/components/schemas/ILacchainVerifyCredentialResponse"
          }
        }
      }
    }
  }
}