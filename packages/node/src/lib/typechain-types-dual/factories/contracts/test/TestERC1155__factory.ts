/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  TestERC1155,
  TestERC1155Interface,
} from "../../../contracts/test/TestERC1155";

const _abi = [
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
        name: "operator",
        type: "address",
      },
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
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
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
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [
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
        internalType: "address[]",
        name: "owners",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "balances",
        type: "uint256[]",
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
        name: "tokenId",
        type: "uint256",
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
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
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
        internalType: "uint256",
        name: "amount",
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
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "uri",
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
] as const;

const _bytecode =
  "0x6080806040523461001657611031908161001c8239f35b600080fdfe60a06040818152600436101561001457600080fd5b600091823560e01c908162fdd58e14610bc25750806301ffc9a714610ad15780630e89341c14610a41578063156e29f6146108715780632eb2c2d6146105a65780634e1273f4146103ed578063a22cb4651461031f578063e985e9c5146102a75763f242432a1461008457600080fd5b346102a35760a07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126102a3576100bb610c29565b6100c3610c51565b90604435906064359060843567ffffffffffffffff811161029f576100ec903690600401610d03565b90928773ffffffffffffffffffffffffffffffffffffffff809416958633148015610280575b61011b90610d31565b868252602094828652898320828452865289832061013a858254610d96565b9055881697888352828652898320828452865289832061015b858254610dd2565b905588888b5184815286898201527fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628d3392a43b6101a957505050505050506101a691501515610ec6565b80f35b908495969792916102078a51988996879586947ff23a6e61000000000000000000000000000000000000000000000000000000009d8e875233600488015260248701526044860152606485015260a0608485015260a4840191610e87565b03925af19384156102775750927fffffffff00000000000000000000000000000000000000000000000000000000916101a694869261024a575b50501614610ec6565b6102699250803d10610270575b6102618183610ddf565b810190610e4f565b3880610241565b503d610257565b513d86823e3d90fd5b508682526001602090815289832033845290528882205460ff16610112565b8680fd5b5080fd5b50346102a357807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126102a35760ff816020936102e4610c29565b6102ec610c51565b73ffffffffffffffffffffffffffffffffffffffff91821683526001875283832091168252855220549151911615158152f35b50346102a357807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126102a357610356610c29565b90602435908115158092036103e957338452600160205273ffffffffffffffffffffffffffffffffffffffff8185209316928385526020528084207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0081541660ff8416179055519081527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3160203392a380f35b8380fd5b5090346105a357817ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126105a35767ffffffffffffffff906004358281116102a35761043f903690600401610cd2565b909160249384359081116102a35785918461045f87933690600401610cd2565b93909161046d858814610f2b565b6104768761100c565b9261048387519485610ddf565b87845261048f8861100c565b956020987fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08a87019801368937865b8181106105065750505050505083519485948186019282875251809352850193925b8281106104ef57505050500390f35b8351855286955093810193928101926001016104e0565b6105178183879d9a999b9c9d610f90565b3573ffffffffffffffffffffffffffffffffffffffff811680910361059f5787528688528a8720610549828587610f90565b35885288528a872054895182101561057357600582901b8a018901529699989795966001016104be565b86887f4e487b710000000000000000000000000000000000000000000000000000000081526032600452fd5b8780fd5b80fd5b50346102a3577ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc60a08136011261086d576105df610c29565b906105e8610c51565b9067ffffffffffffffff60443581811161029f5761060a903690600401610cd2565b909160643581811161086957610624903690600401610cd2565b9490916084359081116108655761063f903690600401610d03565b909661064c878614610f2b565b73ffffffffffffffffffffffffffffffffffffffff98891698610681338b148c8e8215610846575b908a918a95948f94610d31565b809487166080525b8c8686106107e357939450509350507f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb6106cb84519480865285018a8c610fcf565b938085036020820152806106e46080519633958c610fcf565b0390a43b610702575050505050505050506101a66080511515610ec6565b61075896610768610777946020988c519a8b998a997fbc197c81000000000000000000000000000000000000000000000000000000009e8f8c523360048d015260248c015260a060448c015260a48b0191610fcf565b91868984030160648a0152610fcf565b92858403016084860152610e87565b0381876080515af19283156107da57506101a6927fffffffff000000000000000000000000000000000000000000000000000000009185916107bc575b501614610ec6565b6107d4915060203d8111610270576102618183610ddf565b386107b4565b513d85823e3d90fd5b6107ff866107f78160019a61083898610f90565b35928d610f90565b359482526020828152838320828452815283832061081e878254610d96565b905560805183528281528383209183525220918254610dd2565b90550185908a888d8f610689565b60ff92508d815260016020528181203382526020522054168c8e610674565b8980fd5b8880fd5b8280fd5b50346102a35760607ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126102a3576108a9610c29565b6024359060443593835160209586820182811067ffffffffffffffff821117610a145790879291875283825273ffffffffffffffffffffffffffffffffffffffff8516948585528484528785208786528452878520610909838254610dd2565b90558585895189815284878201527fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628b3392a43b610958575050505061095191501515610ec6565b5160018152f35b9383946109b39488518096819582947ff23a6e61000000000000000000000000000000000000000000000000000000009b8c85523360048601528560248601526044850152606484015260a0608484015260a4830190610c74565b03925af1918215610a095761095193927fffffffff0000000000000000000000000000000000000000000000000000000092906109f257501614610ec6565b6107d49150863d8811610270576102618183610ddf565b8451903d90823e3d90fd5b6024847f4e487b710000000000000000000000000000000000000000000000000000000081526041600452fd5b50346102a35760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126102a35780519080820182811067ffffffffffffffff821117610a1457610acd93508152600382527f7572690000000000000000000000000000000000000000000000000000000000602083015251918291602083526020830190610c74565b0390f35b50346102a35760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126102a357600435907fffffffff00000000000000000000000000000000000000000000000000000000821680920361086d57602092507f01ffc9a7000000000000000000000000000000000000000000000000000000008214918215610b98575b8215610b6e575b50519015158152f35b7f0e89341c0000000000000000000000000000000000000000000000000000000014915038610b65565b7fd9b67a260000000000000000000000000000000000000000000000000000000081149250610b5e565b9190503461086d57807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261086d5760209273ffffffffffffffffffffffffffffffffffffffff610c13610c29565b1681528084528181206024358252845220548152f35b6004359073ffffffffffffffffffffffffffffffffffffffff82168203610c4c57565b600080fd5b6024359073ffffffffffffffffffffffffffffffffffffffff82168203610c4c57565b919082519283825260005b848110610cbe5750507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8460006020809697860101520116010190565b602081830181015184830182015201610c7f565b9181601f84011215610c4c5782359167ffffffffffffffff8311610c4c576020808501948460051b010111610c4c57565b9181601f84011215610c4c5782359167ffffffffffffffff8311610c4c5760208381860195010111610c4c57565b15610d3857565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f4e4f545f415554484f52495a45440000000000000000000000000000000000006044820152fd5b91908203918211610da357565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b91908201809211610da357565b90601f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0910116810190811067ffffffffffffffff821117610e2057604052565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b90816020910312610c4c57517fffffffff0000000000000000000000000000000000000000000000000000000081168103610c4c5790565b601f82602094937fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0938186528686013760008582860101520116010190565b15610ecd57565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f554e534146455f524543495049454e54000000000000000000000000000000006044820152fd5b15610f3257565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f4c454e4754485f4d49534d4154434800000000000000000000000000000000006044820152fd5b9190811015610fa05760051b0190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b90918281527f07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8311610c4c5760209260051b809284830137010190565b67ffffffffffffffff8111610e205760051b6020019056fea164736f6c6343000811000a";

type TestERC1155ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestERC1155ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestERC1155__factory extends ContractFactory {
  constructor(...args: TestERC1155ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TestERC1155> {
    return super.deploy(overrides || {}) as Promise<TestERC1155>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): TestERC1155 {
    return super.attach(address) as TestERC1155;
  }
  override connect(signer: Signer): TestERC1155__factory {
    return super.connect(signer) as TestERC1155__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestERC1155Interface {
    return new utils.Interface(_abi) as TestERC1155Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestERC1155 {
    return new Contract(address, _abi, signerOrProvider) as TestERC1155;
  }
}
