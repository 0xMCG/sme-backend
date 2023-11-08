/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  TestERC721Fee,
  TestERC721FeeInterface,
} from "../../../contracts/test/TestERC721Fee";

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
        indexed: true,
        internalType: "uint256",
        name: "id",
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
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
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
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
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
        name: "id",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
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
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
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
    name: "isApprovedForAll",
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
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
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
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_salePrice",
        type: "uint256",
      },
    ],
    name: "royaltyInfo",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
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
        name: "id",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
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
        name: "id",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "enabled",
        type: "bool",
      },
    ],
    name: "setCreatorFeeEnabled",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "minTransactionPrice_",
        type: "uint256",
      },
    ],
    name: "setMinTransactionPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
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
        name: "id",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523462000300576200001462000305565b60206246656560e81b818301526200002b62000305565b6246454560e81b8282015282519092906001600160401b0390818111620002ea576000938454916001948584811c94168015620002df575b83851014620002cb578190601f9485811162000278575b5083908583116001146200021457889262000208575b5050600019600383901b1c191690851b1785555b8551928311620001f45783548481811c91168015620001e9575b82821014620001d5578281116200018d575b50809183116001146200012757508394829394926200011b575b5050600019600383901b1c191690821b1790555b60ff19600854166008556009556040516114e090816200032a8239f35b015190503880620000ea565b90601f198316958486528286209286905b8882106200017557505083859697106200015b575b505050811b019055620000fe565b015160001960f88460031b161c191690553880806200014d565b80878596829496860151815501950193019062000138565b8486528186208380860160051c820192848710620001cb575b0160051c019085905b828110620001bf575050620000d0565b878155018590620001af565b92508192620001a6565b634e487b7160e01b86526022600452602486fd5b90607f1690620000be565b634e487b7160e01b85526041600452602485fd5b01519050388062000090565b8880528489208894509190601f1984168a5b8782821062000261575050841162000247575b505050811b018555620000a4565b015160001960f88460031b161c1916905538808062000239565b8385015186558b9790950194938401930162000226565b9091508780528388208580850160051c820192868610620002c1575b918991869594930160051c01915b828110620002b25750506200007a565b8a8155859450899101620002a2565b9250819262000294565b634e487b7160e01b87526022600452602487fd5b93607f169362000063565b634e487b7160e01b600052604160045260246000fd5b600080fd5b60408051919082016001600160401b03811183821017620002ea576040526003825256fe608060408181526004918236101561001657600080fd5b600092833560e01c91826301ffc9a714610ec15750816306fdde0314610de6578163081812fc14610d8b578163095ea7b314610c9d57816323b872dd14610c855781632a55205a14610b1957816340c10f19146109dd57816342842e0e146108de5783826342966c68146107e4575081636352211e1461077d57816370a08231146106b457816395d89b41146105635781639a66a820146104f7578163a22cb46514610428578163b07c6382146103f0578163b88d4fde1461021f578163c87b56dd14610168575063e985e9c5146100ed57600080fd5b3461016457807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101645760ff816020936101296110c9565b6101316110f1565b73ffffffffffffffffffffffffffffffffffffffff91821683526005875283832091168252855220549151911615158152f35b5080fd5b8383346101645760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc360112610164578051918183019083821067ffffffffffffffff8311176101f357506101ef93508152600882527f746f6b656e55524900000000000000000000000000000000000000000000000060208301525191829182611063565b0390f35b806041867f4e487b71000000000000000000000000000000000000000000000000000000006024945252fd5b9050346103ec5760807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126103ec576102586110c9565b906102616110f1565b916044359260643567ffffffffffffffff928382116103e857366023830112156103e857818501359384116103e85736602485840101116103e8576102a78684836112a3565b823b159586156102bf575b886102bc8861146e565b80f35b9091929380959650875195869485937f150b7a0200000000000000000000000000000000000000000000000000000000998a8652339086015273ffffffffffffffffffffffffffffffffffffffff80961660248601526044850152606484016080905281608485015260240160a48401378881830160a40152601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01681010360a40192169181875a94602095f19283156103df57506102bc927fffffffff000000000000000000000000000000000000000000000000000000009185916103b1575b5016143880808080806102b2565b6103d2915060203d81116103d8575b6103ca8183610ff3565b810190611436565b386103a3565b503d6103c0565b513d85823e3d90fd5b8780fd5b8280fd5b8390346101645760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc360112610164573560095580f35b50503461016457807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc360112610164576104606110c9565b90602435908115158092036104f357338452600560205273ffffffffffffffffffffffffffffffffffffffff8185209316928385526020528084207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0081541660ff8416179055519081527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3160203392a380f35b8380fd5b8390346101645760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261016457358015158091036101645760ff7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff006008541691161760085580f35b919050346103ec57827ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126103ec5780519183600180549182821c9282811680156106aa575b602095868610821461067e575084885290811561063e57506001146105e6575b6101ef86866105dc828b0383610ff3565b5191829182611063565b9295508083527fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf65b82841061062b57505050826101ef946105dc9282010194386105cb565b805486850188015292860192810161060e565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001687860152505050151560051b83010192506105dc826101ef386105cb565b8360226024927f4e487b7100000000000000000000000000000000000000000000000000000000835252fd5b93607f16936105ab565b839150346101645760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101645773ffffffffffffffffffffffffffffffffffffffff6107036110c9565b169081156107205760208480858581526003845220549051908152f35b60649060208551917f08c379a0000000000000000000000000000000000000000000000000000000008352820152600c60248201527f5a45524f5f4144445245535300000000000000000000000000000000000000006044820152fd5b9050346103ec5760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126103ec578160209373ffffffffffffffffffffffffffffffffffffffff9235815260028552205416906107de821515611174565b51908152f35b915091346101645760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261016457823592838352600260205273ffffffffffffffffffffffffffffffffffffffff828420541691610847831515611174565b82845260036020528084207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81540190558484526002602052808420917fffffffffffffffffffffffff00000000000000000000000000000000000000009283815416905560205283209081541690557fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8280a480f35b9050346103ec576108ee36611114565b9291906108fc8482846112a3565b803b15938415610911575b866102bc8661146e565b60209293945060a49087875195869485937f150b7a0200000000000000000000000000000000000000000000000000000000998a8652339086015273ffffffffffffffffffffffffffffffffffffffff8093166024860152604485015260806064850152826084850152165af19283156103df57506102bc927fffffffff000000000000000000000000000000000000000000000000000000009185916109bf575b50161438808080610907565b6109d7915060203d81116103d8576103ca8183610ff3565b386109b3565b919050346103ec57807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126103ec57610a166110c9565b906024359273ffffffffffffffffffffffffffffffffffffffff80931692610a3f84151561123e565b84865260026020528286205416610abd575081845260036020528084206001815401905582845260026020528320817fffffffffffffffffffffffff0000000000000000000000000000000000000000825416179055827fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8180a480f35b602060649251917f08c379a0000000000000000000000000000000000000000000000000000000008352820152600e60248201527f414c52454144595f4d494e5445440000000000000000000000000000000000006044820152fd5b90508234610c8257827ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc360112610c82576024359160ff600854168015610c25576009548410610bc85715610bc05760ff60fa5b1692838102938185041490151715610b9457505061271082519161fee28352046020820152f35b9060116024927f4e487b7100000000000000000000000000000000000000000000000000000000835252fd5b60ff82610b6d565b60648260208751917f08c379a0000000000000000000000000000000000000000000000000000000008352820152601260248201527f73616c6520707269636520746f6f206c6f7700000000000000000000000000006044820152fd5b60648260208751917f08c379a0000000000000000000000000000000000000000000000000000000008352820152601460248201527f63726561746f72206665652064697361626c65640000000000000000000000006044820152fd5b80fd5b8334610c82576102bc610c9736611114565b916112a3565b9050346103ec57817ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126103ec57610cd56110c9565b9060243592838552600260205273ffffffffffffffffffffffffffffffffffffffff90818187205416928333148015610d6c575b610d12906111d9565b8587526020528520921691827fffffffffffffffffffffffff00000000000000000000000000000000000000008254161790557f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258480a480f35b508387526005602090815282882033895290528187205460ff16610d09565b9050346103ec5760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126103ec57816020938273ffffffffffffffffffffffffffffffffffffffff9335825285522054169051908152f35b919050346103ec57827ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126103ec578051918380549060019082821c928281168015610eb7575b602095868610821461067e575084885290811561063e5750600114610e5f576101ef86866105dc828b0383610ff3565b8080949750527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5635b828410610ea457505050826101ef946105dc9282010194386105cb565b8054868501880152928601928101610e87565b93607f1693610e2f565b8491346103ec5760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126103ec57357fffffffff0000000000000000000000000000000000000000000000000000000081168091036103ec57602092507f01ffc9a70000000000000000000000000000000000000000000000000000000081149081908215610fc9575b8215610f9f575b8215610f64575b505015158152f35b7f2a55205a000000000000000000000000000000000000000000000000000000001491508115610f97575b508380610f5c565b905083610f8f565b7f5b5e139f0000000000000000000000000000000000000000000000000000000081149250610f55565b7f80ac58cd0000000000000000000000000000000000000000000000000000000081149250610f4e565b90601f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0910116810190811067ffffffffffffffff82111761103457604052565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60208082528251818301819052939260005b8581106110b5575050507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8460006040809697860101520116010190565b818101830151848201604001528201611075565b6004359073ffffffffffffffffffffffffffffffffffffffff821682036110ec57565b600080fd5b6024359073ffffffffffffffffffffffffffffffffffffffff821682036110ec57565b7ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc60609101126110ec5773ffffffffffffffffffffffffffffffffffffffff9060043582811681036110ec579160243590811681036110ec579060443590565b1561117b57565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f4e4f545f4d494e544544000000000000000000000000000000000000000000006044820152fd5b156111e057565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f4e4f545f415554484f52495a45440000000000000000000000000000000000006044820152fd5b1561124557565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f494e56414c49445f524543495049454e540000000000000000000000000000006044820152fd5b600083815260206002815273ffffffffffffffffffffffffffffffffffffffff936040908580838620541695169485036113d95790611325867fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef959493169661130d88151561123e565b8633149081156113bc575b81156113a6575b506111d9565b848352600382528083207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff815401905585835280832060018154019055868352600282526004818420927fffffffffffffffffffffffff000000000000000000000000000000000000000093888582541617905552822090815416905580a4565b905088855260048452828520541633143861131f565b8786526005855283862033875285528386205460ff169150611318565b6064838351907f08c379a00000000000000000000000000000000000000000000000000000000082526004820152600a60248201527f57524f4e475f46524f4d000000000000000000000000000000000000000000006044820152fd5b908160209103126110ec57517fffffffff00000000000000000000000000000000000000000000000000000000811681036110ec5790565b1561147557565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f554e534146455f524543495049454e54000000000000000000000000000000006044820152fdfea164736f6c6343000811000a";

type TestERC721FeeConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestERC721FeeConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestERC721Fee__factory extends ContractFactory {
  constructor(...args: TestERC721FeeConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TestERC721Fee> {
    return super.deploy(overrides || {}) as Promise<TestERC721Fee>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): TestERC721Fee {
    return super.attach(address) as TestERC721Fee;
  }
  override connect(signer: Signer): TestERC721Fee__factory {
    return super.connect(signer) as TestERC721Fee__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestERC721FeeInterface {
    return new utils.Interface(_abi) as TestERC721FeeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestERC721Fee {
    return new Contract(address, _abi, signerOrProvider) as TestERC721Fee;
  }
}
