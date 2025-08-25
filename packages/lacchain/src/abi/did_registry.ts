export const DID_REGISTRY_CONTRACT_GAS = {
  contractName: 'DIDRegistry',
  abi: [
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_minKeyRotationTime',
          type: 'uint256',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'identity',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'bytes',
          name: 'name',
          type: 'bytes',
        },
        {
          indexed: false,
          internalType: 'bytes',
          name: 'value',
          type: 'bytes',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'validTo',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'previousChange',
          type: 'uint256',
        },
      ],
      name: 'DIDAttributeChanged',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'identity',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'controller',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'previousChange',
          type: 'uint256',
        },
      ],
      name: 'DIDControllerChanged',
      type: 'event',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'changed',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'controllers',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'nonce',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'subject',
          type: 'address',
        },
      ],
      name: 'getControllers',
      outputs: [
        {
          internalType: 'address[]',
          name: '',
          type: 'address[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'identity',
          type: 'address',
        },
      ],
      name: 'identityController',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'identity',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'controller',
          type: 'address',
        },
      ],
      name: 'addController',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'identity',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'controller',
          type: 'address',
        },
      ],
      name: 'removeController',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'identity',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'newController',
          type: 'address',
        },
      ],
      name: 'changeController',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'identity',
          type: 'address',
        },
        {
          internalType: 'uint8',
          name: 'sigV',
          type: 'uint8',
        },
        {
          internalType: 'bytes32',
          name: 'sigR',
          type: 'bytes32',
        },
        {
          internalType: 'bytes32',
          name: 'sigS',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'newController',
          type: 'address',
        },
      ],
      name: 'changeControllerSigned',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'identity',
          type: 'address',
        },
        {
          internalType: 'bytes',
          name: 'name',
          type: 'bytes',
        },
        {
          internalType: 'bytes',
          name: 'value',
          type: 'bytes',
        },
        {
          internalType: 'uint256',
          name: 'validity',
          type: 'uint256',
        },
      ],
      name: 'setAttribute',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'identity',
          type: 'address',
        },
        {
          internalType: 'uint8',
          name: 'sigV',
          type: 'uint8',
        },
        {
          internalType: 'bytes32',
          name: 'sigR',
          type: 'bytes32',
        },
        {
          internalType: 'bytes32',
          name: 'sigS',
          type: 'bytes32',
        },
        {
          internalType: 'bytes',
          name: 'name',
          type: 'bytes',
        },
        {
          internalType: 'bytes',
          name: 'value',
          type: 'bytes',
        },
        {
          internalType: 'uint256',
          name: 'validity',
          type: 'uint256',
        },
      ],
      name: 'setAttributeSigned',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'identity',
          type: 'address',
        },
        {
          internalType: 'bytes',
          name: 'name',
          type: 'bytes',
        },
        {
          internalType: 'bytes',
          name: 'value',
          type: 'bytes',
        },
      ],
      name: 'revokeAttribute',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'identity',
          type: 'address',
        },
        {
          internalType: 'uint8',
          name: 'sigV',
          type: 'uint8',
        },
        {
          internalType: 'bytes32',
          name: 'sigR',
          type: 'bytes32',
        },
        {
          internalType: 'bytes32',
          name: 'sigS',
          type: 'bytes32',
        },
        {
          internalType: 'bytes',
          name: 'name',
          type: 'bytes',
        },
        {
          internalType: 'bytes',
          name: 'value',
          type: 'bytes',
        },
      ],
      name: 'revokeAttributeSigned',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'identity',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'keyRotationTime',
          type: 'uint256',
        },
      ],
      name: 'enableKeyRotation',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'identity',
          type: 'address',
        },
      ],
      name: 'disableKeyRotation',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
  bytecode:
    '0x6080604052733b62e51e37d090453600395ff1f9bdf4d73984046000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555034801561006457600080fd5b50604051612ef9380380612ef98339818101604052602081101561008757600080fd5b81019080805190602001909291905050508060058190555050612e4a806100af6000396000f3fe608060405234801561001057600080fd5b50600436106100f45760003560e01c8063921605e111610097578063dff0d6f411610066578063dff0d6f414610897578063f96d0f9f14610a2a578063fd6046d714610a82578063ffb628e214610b1b576100f4565b8063921605e1146104b85780639478c0d114610506578063c7b2864d1461057e578063ccbfa4961461071b576100f4565b80633e11e378116100d35780633e11e378146102055780634303951b1461026957806370ae92d2146102ee5780638dd8305614610346576100f4565b8062bb9412146100f957806322b6be681461015d5780632bb88442146101a1575b600080fd5b61015b6004803603604081101561010f57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610b89565b005b61019f6004803603602081101561017357600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610b9f565b005b610203600480360360408110156101b757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610bb3565b005b6102676004803603604081101561021b57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610bc9565b005b6102ec600480360360a081101561027f57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803560ff1690602001909291908035906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610bdf565b005b6103306004803603602081101561030457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610d57565b6040518082815260200191505060405180910390f35b6104b66004803603606081101561035c57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019064010000000081111561039957600080fd5b8201836020820111156103ab57600080fd5b803590602001918460018302840111640100000000831117156103cd57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561043057600080fd5b82018360208201111561044257600080fd5b8035906020019184600183028401116401000000008311171561046457600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050610d6f565b005b610504600480360360408110156104ce57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610d87565b005b6105526004803603604081101561051c57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610d9d565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610719600480360360e081101561059457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803560ff1690602001909291908035906020019092919080359060200190929190803590602001906401000000008111156105f257600080fd5b82018360208201111561060457600080fd5b8035906020019184600183028401116401000000008311171561062657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561068957600080fd5b82018360208201111561069b57600080fd5b803590602001918460018302840111640100000000831117156106bd57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050919291929080359060200190929190505050610de8565b005b6108956004803603608081101561073157600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019064010000000081111561076e57600080fd5b82018360208201111561078057600080fd5b803590602001918460018302840111640100000000831117156107a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561080557600080fd5b82018360208201111561081757600080fd5b8035906020019184600183028401116401000000008311171561083957600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050919291929080359060200190929190505050610ff1565b005b610a28600480360360c08110156108ad57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803560ff16906020019092919080359060200190929190803590602001909291908035906020019064010000000081111561090b57600080fd5b82018360208201111561091d57600080fd5b8035906020019184600183028401116401000000008311171561093f57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290803590602001906401000000008111156109a257600080fd5b8201836020820111156109b457600080fd5b803590602001918460018302840111640100000000831117156109d657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050919291929050505061100b565b005b610a6c60048036036020811015610a4057600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061120a565b6040518082815260200191505060405180910390f35b610ac460048036036020811015610a9857600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611222565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b83811015610b07578082015181840152602081019050610aec565b505050509050019250505060405180910390f35b610b5d60048036036020811015610b3157600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506112ef565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610b9b82610b95611626565b836117b1565b5050565b610bb081610bab611626565b611a08565b50565b610bc582610bbf611626565b83611b14565b5050565b610bdb82610bd5611626565b83612063565b5050565b6000601960f81b600060f81b3060046000610bf98b6112ef565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054898660405160200180877effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168152600101867effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526001018573ffffffffffffffffffffffffffffffffffffffff1660601b81526014018481526020018373ffffffffffffffffffffffffffffffffffffffff1660601b8152601401807f6368616e6765436f6e74726f6c6c6572000000000000000000000000000000008152506010018273ffffffffffffffffffffffffffffffffffffffff1660601b81526014019650505050505050604051602081830303815290604052805190602001209050610d4f86610d49888888888761229d565b84612063565b505050505050565b60046020528060005260406000206000915090505481565b610d8283610d7b611626565b84846123a2565b505050565b610d9982610d93611626565b83612609565b5050565b60016020528160005260406000208181548110610db657fe5b906000526020600020016000915091509054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000601960f81b600060f81b3060046000610e028d6112ef565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548b88888860405160200180897effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168152600101887effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526001018773ffffffffffffffffffffffffffffffffffffffff1660601b81526014018681526020018573ffffffffffffffffffffffffffffffffffffffff1660601b8152601401807f7365744174747269627574650000000000000000000000000000000000000000815250600c0184805190602001908083835b60208310610f335780518252602082019150602081019050602083039250610f10565b6001836020036101000a03801982511681845116808217855250505050505090500183805190602001908083835b60208310610f845780518252602082019150602081019050602083039250610f61565b6001836020036101000a03801982511681845116808217855250505050505090500182815260200198505050505050505050604051602081830303815290604052805190602001209050610fe788610fdf8a8a8a8a8761229d565b8686866127b8565b5050505050505050565b61100584610ffd611626565b8585856127b8565b50505050565b6000601960f81b600060f81b30600460006110258c6112ef565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548a878760405160200180887effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168152600101877effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526001018673ffffffffffffffffffffffffffffffffffffffff1660601b81526014018581526020018473ffffffffffffffffffffffffffffffffffffffff1660601b8152601401807f7265766f6b654174747269627574650000000000000000000000000000000000815250600f0183805190602001908083835b602083106111555780518252602082019150602081019050602083039250611132565b6001836020036101000a03801982511681845116808217855250505050505090500182805190602001908083835b602083106111a65780518252602082019150602081019050602083039250611183565b6001836020036101000a038019825116818451168082178552505050505050905001975050505050505050604051602081830303815290604052805190602001209050611201876111fa898989898761229d565b85856123a2565b50505050505050565b60036020528060005260406000206000915090505481565b6060600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208054806020026020016040519081016040528092919081815260200182805480156112e357602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311611299575b50505050509050919050565b600080600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002080549050905060008114156113495782915050611621565b60018114156113d057600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008154811061139d57fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16915050611621565b6000600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905060008160010160009054906101000a900460ff16156114d657600061145784611449856002015442612a2190919063ffffffff16565b612a6b90919063ffffffff16565b9050600160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081815481106114a357fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169150506115db565b8282600001541061155e57600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008154811061152c57fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690506115da565b600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208260000154815481106115ac57fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161461161a57809350505050611621565b8493505050505b919050565b6000606060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166040516024016040516020818303038152906040527f7a6ce2e1000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506040518082805190602001908083835b6020831061171757805182526020820191506020810190506020830392506116f4565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114611779576040519150601f19603f3d011682016040523d82523d6000602084013e61177e565b606091505b5090508091505080806020019051602081101561179a57600080fd5b810190808051906020019092919050505091505090565b82826117bc826112ef565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161461185c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600e8152602001807f4e6f7420617574686f72697a656400000000000000000000000000000000000081525060200191505060405180910390fd5b60006118688685612ab5565b90506000811215611a00576000600160008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002080549050141561195f57600160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020869080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b600160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020849080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b505050505050565b8181611a13826112ef565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614611ab3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600e8152602001807f4e6f7420617574686f72697a656400000000000000000000000000000000000081525060200191505060405180910390fd5b6000600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160006101000a81548160ff02191690831515021790555050505050565b8282611b1f826112ef565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614611bbf576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600e8152602001807f4e6f7420617574686f72697a656400000000000000000000000000000000000081525060200191505060405180910390fd5b60018060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208054905011611c59576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602b815260200180612dea602b913960400191505060405180910390fd5b8273ffffffffffffffffffffffffffffffffffffffff16611c79866112ef565b73ffffffffffffffffffffffffffffffffffffffff161415611d03576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f43616e6e6f742064656c6574652063757272656e7420636f6e74726f6c6c657281525060200191505060405180910390fd5b6000611d0f8685612ab5565b90506000811215611d88576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260148152602001807f436f6e74726f6c6c6572206e6f7420657869737400000000000000000000000081525060200191505060405180910390fd5b6000600160008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208054905090506000600160008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001830381548110611e1e57fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905080600160008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208481548110611e9657fe5b9060005260206000200160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550611ee7886112ef565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415611f625782600260008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055505b600160008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001830381548110611faf57fe5b9060005260206000200160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600160008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002080548061202457fe5b6001900381819060005260206000200160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905590555050505050505050565b828261206e826112ef565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161461210e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600e8152602001807f4e6f7420617574686f72697a656400000000000000000000000000000000000081525060200191505060405180910390fd5b600061211a8685612ab5565b90506000811215612193576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260148152602001807f436f6e74726f6c6c6572206e6f7420657869737400000000000000000000000081525060200191505060405180910390fd5b60008112612295576121a58682612bf0565b8573ffffffffffffffffffffffffffffffffffffffff167f2a7278c7e47d91c392e2d4f854ebe76d04458b3f431d27ef2e64707e68615e4885600360008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a243600360008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b505050505050565b60008060018387878760405160008152602001604052604051808581526020018460ff1681526020018381526020018281526020019450505050506020604051602081039080840390855afa1580156122fa573d6000803e3d6000fd5b50505060206040510351905061230f876112ef565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161461234657600080fd5b600460008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600081548092919060010191905055508091505095945050505050565b83836123ad826112ef565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161461244d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600e8152602001807f4e6f7420617574686f72697a656400000000000000000000000000000000000081525060200191505060405180910390fd5b8573ffffffffffffffffffffffffffffffffffffffff167f011b18dd995a3172c6dbe3b65ce383beec725369bb7cc6c16721013f9f993a7885856000600360008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054604051808060200180602001858152602001848152602001838103835287818151815260200191508051906020019080838360005b838110156125195780820151818401526020810190506124fe565b50505050905090810190601f1680156125465780820380516001836020036101000a031916815260200191505b50838103825286818151815260200191508051906020019080838360005b8381101561257f578082015181840152602081019050612564565b50505050905090810190601f1680156125ac5780820380516001836020036101000a031916815260200191505b50965050505050505060405180910390a243600360008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505050505050565b8282612614826112ef565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146126b4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600e8152602001807f4e6f7420617574686f72697a656400000000000000000000000000000000000081525060200191505060405180910390fd5b60055483101561270f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526021815260200180612dc96021913960400191505060405180910390fd5b6001600260008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160006101000a81548160ff02191690831515021790555082600260008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201819055505050505050565b84846127c3826112ef565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614612863576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600e8152602001807f4e6f7420617574686f72697a656400000000000000000000000000000000000081525060200191505060405180910390fd5b8673ffffffffffffffffffffffffffffffffffffffff167f011b18dd995a3172c6dbe3b65ce383beec725369bb7cc6c16721013f9f993a788686864201600360008d73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054604051808060200180602001858152602001848152602001838103835287818151815260200191508051906020019080838360005b83811015612930578082015181840152602081019050612915565b50505050905090810190601f16801561295d5780820380516001836020036101000a031916815260200191505b50838103825286818151815260200191508051906020019080838360005b8381101561299657808201518184015260208101905061297b565b50505050905090810190601f1680156129c35780820380516001836020036101000a031916815260200191505b50965050505050505060405180910390a243600360008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555050505050505050565b6000612a6383836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f000000000000815250612c41565b905092915050565b6000612aad83836040518060400160405280601881526020017f536166654d6174683a206d6f64756c6f206279207a65726f0000000000000000815250612d07565b905092915050565b600080600090505b600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002080549050811015612bc5578273ffffffffffffffffffffffffffffffffffffffff16600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208281548110612b6857fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415612bb85780915050612bea565b8080600101915050612abd565b507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff90505b92915050565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209050818160000181905550505050565b60008083118290612ced576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015612cb2578082015181840152602081019050612c97565b50505050905090810190601f168015612cdf5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b506000838581612cf957fe5b049050809150509392505050565b6000808314158290612db4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015612d79578082015181840152602081019050612d5e565b50505050905090810190601f168015612da65780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50828481612dbe57fe5b069050939250505056fe496e76616c6964206d696e696d756d206b657920726f746174696f6e2074696d65596f75206e656564206174206c656173742074776f20636f6e74726f6c6c65727320746f2064656c657465a264697066735822122039a846bf10deaa4f9ed3327e0de8ff0cec13d20a372708a0b48244fc27a413a464736f6c634300060c0033',
}

export const DID_REGISTRY_RECOVERABLE_CONTRACT_GAS = {
  abi: [
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_minKeyRotationTime',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_maxAttempts',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_minControllers',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_resetSeconds',
          type: 'uint256',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'identity',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'bytes',
          name: 'name',
          type: 'bytes',
        },
        {
          indexed: false,
          internalType: 'bytes',
          name: 'value',
          type: 'bytes',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'validTo',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'previousChange',
          type: 'uint256',
        },
      ],
      name: 'DIDAttributeChanged',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'identity',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'controller',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'previousChange',
          type: 'uint256',
        },
      ],
      name: 'DIDControllerChanged',
      type: 'event',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'identity',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'controller',
          type: 'address',
        },
      ],
      name: 'addController',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'identity',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'newController',
          type: 'address',
        },
      ],
      name: 'changeController',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'identity',
          type: 'address',
        },
        {
          internalType: 'uint8',
          name: 'sigV',
          type: 'uint8',
        },
        {
          internalType: 'bytes32',
          name: 'sigR',
          type: 'bytes32',
        },
        {
          internalType: 'bytes32',
          name: 'sigS',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'newController',
          type: 'address',
        },
      ],
      name: 'changeControllerSigned',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'changed',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'controllers',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'identity',
          type: 'address',
        },
      ],
      name: 'disableKeyRotation',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'identity',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'keyRotationTime',
          type: 'uint256',
        },
      ],
      name: 'enableKeyRotation',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'failedAttempts',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'subject',
          type: 'address',
        },
      ],
      name: 'getControllers',
      outputs: [
        {
          internalType: 'address[]',
          name: '',
          type: 'address[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'identity',
          type: 'address',
        },
      ],
      name: 'identityController',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'lastAttempt',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'nonce',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'identity',
          type: 'address',
        },
        {
          internalType: 'uint8',
          name: 'sigV',
          type: 'uint8',
        },
        {
          internalType: 'bytes32',
          name: 'sigR',
          type: 'bytes32',
        },
        {
          internalType: 'bytes32',
          name: 'sigS',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'proofController',
          type: 'address',
        },
      ],
      name: 'recover',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'recoveredKeys',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'identity',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'controller',
          type: 'address',
        },
      ],
      name: 'removeController',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'identity',
          type: 'address',
        },
        {
          internalType: 'bytes',
          name: 'name',
          type: 'bytes',
        },
        {
          internalType: 'bytes',
          name: 'value',
          type: 'bytes',
        },
      ],
      name: 'revokeAttribute',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'identity',
          type: 'address',
        },
        {
          internalType: 'uint8',
          name: 'sigV',
          type: 'uint8',
        },
        {
          internalType: 'bytes32',
          name: 'sigR',
          type: 'bytes32',
        },
        {
          internalType: 'bytes32',
          name: 'sigS',
          type: 'bytes32',
        },
        {
          internalType: 'bytes',
          name: 'name',
          type: 'bytes',
        },
        {
          internalType: 'bytes',
          name: 'value',
          type: 'bytes',
        },
      ],
      name: 'revokeAttributeSigned',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'identity',
          type: 'address',
        },
        {
          internalType: 'bytes',
          name: 'name',
          type: 'bytes',
        },
        {
          internalType: 'bytes',
          name: 'value',
          type: 'bytes',
        },
        {
          internalType: 'uint256',
          name: 'validity',
          type: 'uint256',
        },
      ],
      name: 'setAttribute',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'identity',
          type: 'address',
        },
        {
          internalType: 'uint8',
          name: 'sigV',
          type: 'uint8',
        },
        {
          internalType: 'bytes32',
          name: 'sigR',
          type: 'bytes32',
        },
        {
          internalType: 'bytes32',
          name: 'sigS',
          type: 'bytes32',
        },
        {
          internalType: 'bytes',
          name: 'name',
          type: 'bytes',
        },
        {
          internalType: 'bytes',
          name: 'value',
          type: 'bytes',
        },
        {
          internalType: 'uint256',
          name: 'validity',
          type: 'uint256',
        },
      ],
      name: 'setAttributeSigned',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
  bytecode:
    '0x6080604052733b62e51e37d090453600395ff1f9bdf4d73984046000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555034801561006457600080fd5b50604051613b0d380380613b0d8339818101604052608081101561008757600080fd5b810190808051906020019092919080519060200190929190805190602001909291908051906020019092919050505083806005819055505082600681905550816007819055508060088190555050505050613a26806100e76000396000f3fe608060405234801561001057600080fd5b50600436106101205760003560e01c806370ae92d2116100ad578063ccbfa49611610071578063ccbfa496146108f4578063dff0d6f414610a70578063f96d0f9f14610c03578063fd6046d714610c5b578063ffb628e214610cf457610120565b806370ae92d2146104c75780638dd830561461051f578063921605e1146106915780639478c0d1146106df578063c7b2864d1461075757610120565b80632bb88442116100f45780632bb88442146102ca57806332627ec71461032e5780633e11e378146103865780634303951b146103ea5780634cd10d4b1461046f57610120565b8062bb9412146101255780630684e32a1461018957806322b6be6814610201578063289e3de014610245575b600080fd5b6101876004803603604081101561013b57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610d62565b005b6101d56004803603604081101561019f57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610d78565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6102436004803603602081101561021757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610dc3565b005b6102c8600480360360a081101561025b57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803560ff1690602001909291908035906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610dd7565b005b61032c600480360360408110156102e057600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611531565b005b6103706004803603602081101561034457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611547565b6040518082815260200191505060405180910390f35b6103e86004803603604081101561039c57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061155f565b005b61046d600480360360a081101561040057600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803560ff1690602001909291908035906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611575565b005b6104b16004803603602081101561048557600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506116ed565b6040518082815260200191505060405180910390f35b610509600480360360208110156104dd57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611705565b6040518082815260200191505060405180910390f35b61068f6004803603606081101561053557600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019064010000000081111561057257600080fd5b82018360208201111561058457600080fd5b803590602001918460018302840111640100000000831117156105a657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561060957600080fd5b82018360208201111561061b57600080fd5b8035906020019184600183028401116401000000008311171561063d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050919291929050505061171d565b005b6106dd600480360360408110156106a757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611735565b005b61072b600480360360408110156106f557600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061174b565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6108f2600480360360e081101561076d57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803560ff1690602001909291908035906020019092919080359060200190929190803590602001906401000000008111156107cb57600080fd5b8201836020820111156107dd57600080fd5b803590602001918460018302840111640100000000831117156107ff57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561086257600080fd5b82018360208201111561087457600080fd5b8035906020019184600183028401116401000000008311171561089657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050919291929080359060200190929190505050611796565b005b610a6e6004803603608081101561090a57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019064010000000081111561094757600080fd5b82018360208201111561095957600080fd5b8035906020019184600183028401116401000000008311171561097b57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290803590602001906401000000008111156109de57600080fd5b8201836020820111156109f057600080fd5b80359060200191846001830284011164010000000083111715610a1257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019092919050505061199f565b005b610c01600480360360c0811015610a8657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803560ff169060200190929190803590602001909291908035906020019092919080359060200190640100000000811115610ae457600080fd5b820183602082011115610af657600080fd5b80359060200191846001830284011164010000000083111715610b1857600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050919291929080359060200190640100000000811115610b7b57600080fd5b820183602082011115610b8d57600080fd5b80359060200191846001830284011164010000000083111715610baf57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506119b9565b005b610c4560048036036020811015610c1957600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611bb8565b6040518082815260200191505060405180910390f35b610c9d60048036036020811015610c7157600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611bd0565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b83811015610ce0578082015181840152602081019050610cc5565b505050509050019250505060405180910390f35b610d3660048036036020811015610d0a57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611c9d565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610d7482610d6e611fd4565b8361215f565b5050565b60096020528160005260406000208181548110610d9157fe5b906000526020600020016000915091509054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b610dd481610dcf611fd4565b6123b6565b50565b600754600160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805490501015610e74576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602d815260200180613978602d913960400191505060405180910390fd5b6000601960f81b600060f81b3060046000610e8e8b611c9d565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054898660405160200180877effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168152600101867effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526001018573ffffffffffffffffffffffffffffffffffffffff1660601b81526014018481526020018373ffffffffffffffffffffffffffffffffffffffff1660601b8152601401807f7265636f766572000000000000000000000000000000000000000000000000008152506007018273ffffffffffffffffffffffffffffffffffffffff1660601b81526014019650505050505050604051602081830303815290604052805190602001209050600060018287878760405160008152602001604052604051808581526020018460ff1681526020018381526020018281526020019450505050506020604051602081039080840390855afa158015611029573d6000803e3d6000fd5b5050506020604051035190508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146110d6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f496e76616c6964207369676e617475726500000000000000000000000000000081525060200191505060405180910390fd5b600654600a60008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410806111675750600854600b60008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020544203115b6111d9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f457863656564656420617474656d70747300000000000000000000000000000081525060200191505060405180910390fd5b60006111e588856124c2565b12156111f257505061152a565b600854600b60008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054420311156112ce576000600a60008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600960008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006112cd9190613939565b5b42600b60008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600061131e88856125fd565b90506000811261137e576001600a60008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254019250508190555050505061152a565b600960008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020849080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061148760016114796002600160008d73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208054905061273890919063ffffffff16565b61278290919063ffffffff16565b600960008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208054905010611526576114da88898661280a565b600960008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006115259190613939565b5b5050505b5050505050565b6115438261153d611fd4565b83612a44565b5050565b600a6020528060005260406000206000915090505481565b6115718261156b611fd4565b8361280a565b5050565b6000601960f81b600060f81b306004600061158f8b611c9d565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054898660405160200180877effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168152600101867effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526001018573ffffffffffffffffffffffffffffffffffffffff1660601b81526014018481526020018373ffffffffffffffffffffffffffffffffffffffff1660601b8152601401807f6368616e6765436f6e74726f6c6c6572000000000000000000000000000000008152506010018273ffffffffffffffffffffffffffffffffffffffff1660601b815260140196505050505050506040516020818303038152906040528051906020012090506116e5866116df8888888887612f93565b8461280a565b505050505050565b600b6020528060005260406000206000915090505481565b60046020528060005260406000206000915090505481565b61173083611729611fd4565b8484613098565b505050565b61174782611741611fd4565b836132ff565b5050565b6001602052816000526040600020818154811061176457fe5b906000526020600020016000915091509054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000601960f81b600060f81b30600460006117b08d611c9d565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548b88888860405160200180897effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168152600101887effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526001018773ffffffffffffffffffffffffffffffffffffffff1660601b81526014018681526020018573ffffffffffffffffffffffffffffffffffffffff1660601b8152601401807f7365744174747269627574650000000000000000000000000000000000000000815250600c0184805190602001908083835b602083106118e157805182526020820191506020810190506020830392506118be565b6001836020036101000a03801982511681845116808217855250505050505090500183805190602001908083835b60208310611932578051825260208201915060208101905060208303925061190f565b6001836020036101000a038019825116818451168082178552505050505050905001828152602001985050505050505050506040516020818303038152906040528051906020012090506119958861198d8a8a8a8a87612f93565b8686866134ae565b5050505050505050565b6119b3846119ab611fd4565b8585856134ae565b50505050565b6000601960f81b600060f81b30600460006119d38c611c9d565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548a878760405160200180887effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168152600101877effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526001018673ffffffffffffffffffffffffffffffffffffffff1660601b81526014018581526020018473ffffffffffffffffffffffffffffffffffffffff1660601b8152601401807f7265766f6b654174747269627574650000000000000000000000000000000000815250600f0183805190602001908083835b60208310611b035780518252602082019150602081019050602083039250611ae0565b6001836020036101000a03801982511681845116808217855250505050505090500182805190602001908083835b60208310611b545780518252602082019150602081019050602083039250611b31565b6001836020036101000a038019825116818451168082178552505050505050905001975050505050505050604051602081830303815290604052805190602001209050611baf87611ba88989898987612f93565b8585613098565b50505050505050565b60036020528060005260406000206000915090505481565b6060600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805480602002602001604051908101604052809291908181526020018280548015611c9157602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311611c47575b50505050509050919050565b600080600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208054905090506000811415611cf75782915050611fcf565b6001811415611d7e57600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600081548110611d4b57fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16915050611fcf565b6000600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905060008160010160009054906101000a900460ff1615611e84576000611e0584611df785600201544261273890919063ffffffff16565b61371790919063ffffffff16565b9050600160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208181548110611e5157fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16915050611f89565b82826000015410611f0c57600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600081548110611eda57fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050611f88565b600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020826000015481548110611f5a57fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614611fc857809350505050611fcf565b8493505050505b919050565b6000606060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166040516024016040516020818303038152906040527f7a6ce2e1000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506040518082805190602001908083835b602083106120c557805182526020820191506020810190506020830392506120a2565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114612127576040519150601f19603f3d011682016040523d82523d6000602084013e61212c565b606091505b5090508091505080806020019051602081101561214857600080fd5b810190808051906020019092919050505091505090565b828261216a82611c9d565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161461220a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600e8152602001807f4e6f7420617574686f72697a656400000000000000000000000000000000000081525060200191505060405180910390fd5b600061221686856124c2565b905060008112156123ae576000600160008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002080549050141561230d57600160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020869080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b600160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020849080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b505050505050565b81816123c182611c9d565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614612461576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600e8152602001807f4e6f7420617574686f72697a656400000000000000000000000000000000000081525060200191505060405180910390fd5b6000600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160006101000a81548160ff02191690831515021790555050505050565b600080600090505b600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805490508110156125d2578273ffffffffffffffffffffffffffffffffffffffff16600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020828154811061257557fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156125c557809150506125f7565b80806001019150506124ca565b507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff90505b92915050565b600080600090505b600960008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208054905081101561270d578273ffffffffffffffffffffffffffffffffffffffff16600960008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002082815481106126b057fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156127005780915050612732565b8080600101915050612605565b507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff90505b92915050565b600061277a83836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f000000000000815250613761565b905092915050565b600080828401905083811015612800576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f536166654d6174683a206164646974696f6e206f766572666c6f77000000000081525060200191505060405180910390fd5b8091505092915050565b828261281582611c9d565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146128b5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600e8152602001807f4e6f7420617574686f72697a656400000000000000000000000000000000000081525060200191505060405180910390fd5b60006128c186856124c2565b9050600081121561293a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260148152602001807f436f6e74726f6c6c6572206e6f7420657869737400000000000000000000000081525060200191505060405180910390fd5b60008112612a3c5761294c8682613827565b8573ffffffffffffffffffffffffffffffffffffffff167f2a7278c7e47d91c392e2d4f854ebe76d04458b3f431d27ef2e64707e68615e4885600360008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a243600360008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b505050505050565b8282612a4f82611c9d565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614612aef576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600e8152602001807f4e6f7420617574686f72697a656400000000000000000000000000000000000081525060200191505060405180910390fd5b60018060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208054905011612b89576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602b8152602001806139c6602b913960400191505060405180910390fd5b8273ffffffffffffffffffffffffffffffffffffffff16612ba986611c9d565b73ffffffffffffffffffffffffffffffffffffffff161415612c33576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f43616e6e6f742064656c6574652063757272656e7420636f6e74726f6c6c657281525060200191505060405180910390fd5b6000612c3f86856124c2565b90506000811215612cb8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260148152602001807f436f6e74726f6c6c6572206e6f7420657869737400000000000000000000000081525060200191505060405180910390fd5b6000600160008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208054905090506000600160008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001830381548110612d4e57fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905080600160008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208481548110612dc657fe5b9060005260206000200160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550612e1788611c9d565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415612e925782600260008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055505b600160008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001830381548110612edf57fe5b9060005260206000200160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600160008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805480612f5457fe5b6001900381819060005260206000200160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905590555050505050505050565b60008060018387878760405160008152602001604052604051808581526020018460ff1681526020018381526020018281526020019450505050506020604051602081039080840390855afa158015612ff0573d6000803e3d6000fd5b50505060206040510351905061300587611c9d565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161461303c57600080fd5b600460008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600081548092919060010191905055508091505095945050505050565b83836130a382611c9d565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614613143576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600e8152602001807f4e6f7420617574686f72697a656400000000000000000000000000000000000081525060200191505060405180910390fd5b8573ffffffffffffffffffffffffffffffffffffffff167f011b18dd995a3172c6dbe3b65ce383beec725369bb7cc6c16721013f9f993a7885856000600360008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054604051808060200180602001858152602001848152602001838103835287818151815260200191508051906020019080838360005b8381101561320f5780820151818401526020810190506131f4565b50505050905090810190601f16801561323c5780820380516001836020036101000a031916815260200191505b50838103825286818151815260200191508051906020019080838360005b8381101561327557808201518184015260208101905061325a565b50505050905090810190601f1680156132a25780820380516001836020036101000a031916815260200191505b50965050505050505060405180910390a243600360008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505050505050565b828261330a82611c9d565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146133aa576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600e8152602001807f4e6f7420617574686f72697a656400000000000000000000000000000000000081525060200191505060405180910390fd5b600554831015613405576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260218152602001806139a56021913960400191505060405180910390fd5b6001600260008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160006101000a81548160ff02191690831515021790555082600260008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201819055505050505050565b84846134b982611c9d565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614613559576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600e8152602001807f4e6f7420617574686f72697a656400000000000000000000000000000000000081525060200191505060405180910390fd5b8673ffffffffffffffffffffffffffffffffffffffff167f011b18dd995a3172c6dbe3b65ce383beec725369bb7cc6c16721013f9f993a788686864201600360008d73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054604051808060200180602001858152602001848152602001838103835287818151815260200191508051906020019080838360005b8381101561362657808201518184015260208101905061360b565b50505050905090810190601f1680156136535780820380516001836020036101000a031916815260200191505b50838103825286818151815260200191508051906020019080838360005b8381101561368c578082015181840152602081019050613671565b50505050905090810190601f1680156136b95780820380516001836020036101000a031916815260200191505b50965050505050505060405180910390a243600360008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555050505050505050565b600061375983836040518060400160405280601881526020017f536166654d6174683a206d6f64756c6f206279207a65726f0000000000000000815250613878565b905092915050565b6000808311829061380d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b838110156137d25780820151818401526020810190506137b7565b50505050905090810190601f1680156137ff5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50600083858161381957fe5b049050809150509392505050565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209050818160000181905550505050565b6000808314158290613925576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b838110156138ea5780820151818401526020810190506138cf565b50505050905090810190601f1680156139175780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5082848161392f57fe5b0690509392505050565b5080546000825590600052602060002090810190613957919061395a565b50565b5b8082111561397357600081600090555060010161395b565b509056fe4964656e74697479206d757374206861766520746865206d696e696d756d206f6620636f6e74726f6c6c657273496e76616c6964206d696e696d756d206b657920726f746174696f6e2074696d65596f75206e656564206174206c656173742074776f20636f6e74726f6c6c65727320746f2064656c657465a26469706673582212200e03a7ccc6c026cf7c3ada9d8832cc9a03858d36c328ff9ad6e83d3eb7f70d4164736f6c634300060c0033',
}
