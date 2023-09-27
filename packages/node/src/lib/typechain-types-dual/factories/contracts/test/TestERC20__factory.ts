/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  TestERC20,
  TestERC20Interface,
} from "../../../contracts/test/TestERC20";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "blocking",
        type: "bool",
      },
    ],
    name: "blockTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "blocked",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "noReturnData",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "noReturn",
        type: "bool",
      },
    ],
    name: "setNoReturnData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "ok",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60e0604090808252346200043457620000188162000439565b600681526020906505465737432360d41b828201528251926200003b8462000439565b600580855264054535432360dc1b8486015282516001600160401b03959091908683116200041e576000928062000073855462000455565b96601f97888111620003cf575b508890888311600114620003675786926200035b575b50508160011b916000199060031b1c19161783555b8051878111620003475780600192620000c5845462000455565b888111620002f6575b5088908883116001146200029257869262000286575b5050600019600383901b1c191690821b1781555b60126080524660a0528351948391845490620001148262000455565b9182895289808a0196838316928360001462000268575050506001146200022c575b505085601f1992030116840193808510878611176200021857848452519020938301937f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f8552828401527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608401524660808401523060a084015260a0835260c08301948386109086111762000204575083905251902060c05261ffff196006541660065561138d9081620004938239608051816105ae015260a05181610f85015260c05181610fac0152f35b634e487b7160e01b81526041600452602490fd5b634e487b7160e01b83526041600452602483fd5b90889293508580528286209186925b828410620002525750505086010190388062000136565b80548a85018601528a949093019281016200023b565b925093925093945060ff191685521515901b86010190388062000136565b015190503880620000e4565b8487528987208594509190601f198416885b8c828210620002df5750508411620002c5575b505050811b018155620000f8565b015160001960f88460031b161c19169055388080620002b7565b8385015186558897909501949384019301620002a4565b90915083865288862088808501871c8201928b86106200033d575b9186918695949301881c01915b8281106200032e575050620000ce565b8881558594508691016200031e565b9250819262000311565b634e487b7160e01b84526041600452602484fd5b01519050388062000096565b8680528987209250601f198416875b8b828210620003b85750509084600195949392106200039e575b505050811b018355620000ab565b015160001960f88460031b161c1916905538808062000390565b600185968293968601518155019501930162000376565b90915085805288862088808501871c8201928b861062000414575b90859493929101871c01905b81811062000405575062000080565b878155849350600101620003f6565b92508192620003ea565b634e487b7160e01b600052604160045260246000fd5b600080fd5b604081019081106001600160401b038211176200041e57604052565b90600182811c9216801562000487575b60208310146200047157565b634e487b7160e01b600052602260045260246000fd5b91607f16916200046556fe60806040526004361015610013575b600080fd5b60003560e01c806306fdde031461017b578063095ea7b31461017257806318160ddd146101695780631b2438451461016057806323b872dd14610157578063303bdd2c1461014e578063313ce567146101455780633644e5151461013c578063395093511461013357806340c10f191461012a57806370a08231146101215780637ecebe001461011857806395d89b411461010f578063a9059cbb14610106578063cd1b5b71146100fd578063d505accf146100f4578063dd62ed3e146100eb5763e074d6a9146100e357600080fd5b61000e610d9d565b5061000e610d07565b5061000e610a58565b5061000e610a10565b5061000e61090f565b5061000e61084b565b5061000e6107e5565b5061000e61077f565b5061000e6106c6565b5061000e610614565b5061000e6105d2565b5061000e610575565b5061000e610533565b5061000e6104e5565b5061000e6104a0565b5061000e610463565b5061000e610413565b5061000e6102ad565b90600182811c921680156101cd575b602083101461019e57565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b91607f1691610193565b90601f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0910116810190811067ffffffffffffffff82111761021857604052565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60208082528251818301819052939260005b858110610299575050507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8460006040809697860101520116010190565b818101830151848201604001528201610259565b503461000e576000807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126103ca57604051908080546102ee81610184565b808552916001918083169081156103825750600114610328575b61032485610318818703826101d7565b60405191829182610247565b0390f35b80809450527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5635b82841061036a57505050810160200161031882610324610308565b8054602085870181019190915290930192810161034f565b869550610324969350602092506103189491507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001682840152151560051b8201019293610308565b80fd5b6004359073ffffffffffffffffffffffffffffffffffffffff8216820361000e57565b6024359073ffffffffffffffffffffffffffffffffffffffff8216820361000e57565b503461000e5760407ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261000e5760206104596104506103cd565b60243590610de0565b6040519015158152f35b503461000e5760007ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261000e576020600254604051908152f35b503461000e5760007ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261000e57602060ff60065460081c166040519015158152f35b503461000e5760607ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261000e5760206104596105226103cd565b61052a6103f0565b60443591611158565b503461000e5760007ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261000e57602060ff600654166040519015158152f35b503461000e5760007ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261000e57602060405160ff7f0000000000000000000000000000000000000000000000000000000000000000168152f35b503461000e5760007ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261000e57602061060c610f80565b604051908152f35b503461000e5760407ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261000e576106a561064f6103cd565b6024359033600052600460205261068a8160406000209073ffffffffffffffffffffffffffffffffffffffff16600052602052604060002090565b549182198082116106be575b5082018092116106b157610de0565b50602060405160018152f35b6106b9610e62565b610de0565b905038610696565b503461000e5760407ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261000e576106fe6103cd565b60007fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef602073ffffffffffffffffffffffffffffffffffffffff60243594600254868101809111610772575b60025516938484526003825260408420818154019055604051908152a3602060405160018152f35b61077a610e62565b61074a565b503461000e5760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261000e5773ffffffffffffffffffffffffffffffffffffffff6107cc6103cd565b1660005260036020526020604060002054604051908152f35b503461000e5760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261000e5773ffffffffffffffffffffffffffffffffffffffff6108326103cd565b1660005260056020526020604060002054604051908152f35b503461000e576000807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126103ca576040519080600180549161088f83610184565b8086529282811690811561038257506001146108b55761032485610318818703826101d7565b92508083527fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf65b8284106108f757505050810160200161031882610324610308565b805460208587018101919091529093019281016108dc565b503461000e5760407ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261000e576109476103cd565b73ffffffffffffffffffffffffffffffffffffffff6024359133600052600360205260406000208054908482039182116109ca575b55169081600052600360205260406000208181540190556040519081527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60203392a3602060405160018152f35b6109d2610e62565b61097c565b7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc602091011261000e57600435801515810361000e5790565b503461000e57610a1f366109d7565b15157fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff61ff006006549260081b16911617600655600080f35b503461000e5760e07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261000e57610a906103cd565b610a986103f0565b906044356064356084359360ff8516850361000e576020610c447f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92593610ae042821015610ea9565b610c0b610c17610aee610f80565b9289610b1a8173ffffffffffffffffffffffffffffffffffffffff166000526005602052604060002090565b805490600182019055610b956040519384928d8c8c8601968791959493909260a09360c08401977f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9855273ffffffffffffffffffffffffffffffffffffffff8092166020860152166040840152606083015260808201520152565b0391610bc77fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0938481018352826101d7565b519020604051938491888301968790916042927f19010000000000000000000000000000000000000000000000000000000000008352600283015260228201520190565b039081018352826101d7565b5190206040805191825260ff909816602082015260a4359781019790975260c43560608801526080870190565b866000978892838052039060015afa15610cfa575b84519083610cdb82610cb673ffffffffffffffffffffffffffffffffffffffff95610c908782168015159081610cee575b50610f1b565b73ffffffffffffffffffffffffffffffffffffffff166000526004602052604060002090565b9073ffffffffffffffffffffffffffffffffffffffff16600052602052604060002090565b556040519384528116931691602090a380f35b9050888c161438610c8a565b610d02610f0e565b610c59565b503461000e5760407ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261000e576020610d94610d446103cd565b73ffffffffffffffffffffffffffffffffffffffff610d616103f0565b91166000526004835260406000209073ffffffffffffffffffffffffffffffffffffffff16600052602052604060002090565b54604051908152f35b503461000e57610dac366109d7565b151560ff7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0060065416911617600655600080f35b73ffffffffffffffffffffffffffffffffffffffff9033600052600460205282610e2e8260406000209073ffffffffffffffffffffffffffffffffffffffff16600052602052604060002090565b5560405192835216907f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560203392a3600190565b507f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b91908203918211610e9f57565b610ea7610e62565b565b15610eb057565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601760248201527f5045524d49545f444541444c494e455f455850495245440000000000000000006044820152fd5b506040513d6000823e3d90fd5b15610f2257565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f494e56414c49445f5349474e45520000000000000000000000000000000000006044820152fd5b6000467f000000000000000000000000000000000000000000000000000000000000000003610fce57507f000000000000000000000000000000000000000000000000000000000000000090565b6040518154919081610fdf84610184565b808352602094858401946001918783821691826000146111155750506001146110bd575b505050918161101a6110b79361108b9503826101d7565b519020604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f95810195865260208601929092527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc69085015246606085015230608085015291829060a0850190565b037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe081018352826101d7565b51902090565b91908693508280527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5635b828410611100575050508201018161101a6110b7611003565b805486850186015287949093019281016110e7565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016885293151560051b8601909301935084925061101a91506110b79050611003565b91909160ff600654166113785773ffffffffffffffffffffffffffffffffffffffff908181169160009483865260046020526111b6604087203373ffffffffffffffffffffffffffffffffffffffff16600052602052604060002090565b54851161131a576112677fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9385885260046020526112173360408a209073ffffffffffffffffffffffffffffffffffffffff16600052602052604060002090565b547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81036112c6575b5073ffffffffffffffffffffffffffffffffffffffff166000526003602052604060002090565b611272868254610e92565b905561129e8173ffffffffffffffffffffffffffffffffffffffff166000526003602052604060002090565b8054860190556040519485521692602090a360065460081c60ff166112c35750600190565b80f35b87810390811161130d575b86895260046020526113063360408b209073ffffffffffffffffffffffffffffffffffffffff16600052602052604060002090565b5538611240565b611315610e62565b6112d1565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f4e4f545f415554484f52495a45440000000000000000000000000000000000006044820152fd5b50505060009056fea164736f6c6343000811000a";

type TestERC20ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestERC20ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestERC20__factory extends ContractFactory {
  constructor(...args: TestERC20ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TestERC20> {
    return super.deploy(overrides || {}) as Promise<TestERC20>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): TestERC20 {
    return super.attach(address) as TestERC20;
  }
  override connect(signer: Signer): TestERC20__factory {
    return super.connect(signer) as TestERC20__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestERC20Interface {
    return new utils.Interface(_abi) as TestERC20Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestERC20 {
    return new Contract(address, _abi, signerOrProvider) as TestERC20;
  }
}
