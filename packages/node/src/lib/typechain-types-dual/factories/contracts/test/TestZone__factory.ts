/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  TestZone,
  TestZoneInterface,
} from "../../../contracts/test/TestZone";

const _abi = [
  {
    inputs: [],
    name: "getSeaportMetadata",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "metadata",
            type: "bytes",
          },
        ],
        internalType: "struct Schema[]",
        name: "schemas",
        type: "tuple[]",
      },
    ],
    stateMutability: "pure",
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
        components: [
          {
            internalType: "bytes32",
            name: "orderHash",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "fulfiller",
            type: "address",
          },
          {
            internalType: "address",
            name: "offerer",
            type: "address",
          },
          {
            components: [
              {
                internalType: "enum ItemType",
                name: "itemType",
                type: "uint8",
              },
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "identifier",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct SpentItem[]",
            name: "offer",
            type: "tuple[]",
          },
          {
            components: [
              {
                internalType: "enum ItemType",
                name: "itemType",
                type: "uint8",
              },
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "identifier",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
              {
                internalType: "address payable",
                name: "recipient",
                type: "address",
              },
            ],
            internalType: "struct ReceivedItem[]",
            name: "consideration",
            type: "tuple[]",
          },
          {
            internalType: "bytes",
            name: "extraData",
            type: "bytes",
          },
          {
            internalType: "bytes32[]",
            name: "orderHashes",
            type: "bytes32[]",
          },
          {
            internalType: "uint256",
            name: "startTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endTime",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "zoneHash",
            type: "bytes32",
          },
        ],
        internalType: "struct ZoneParameters",
        name: "zoneParameters",
        type: "tuple",
      },
    ],
    name: "validateOrder",
    outputs: [
      {
        internalType: "bytes4",
        name: "validOrderMagicValue",
        type: "bytes4",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60808060405234610016576109cb908161001c8239f35b600080fdfe60806040526004361015610013575b600080fd5b6000803560e01c90816301ffc9a7146100525750806317b1f9421461004957632e778efc1461004157600080fd5b61000e6105d9565b5061000e610114565b346101115760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261011157600435907fffffffff00000000000000000000000000000000000000000000000000000000821680920361011157507f3839be190000000000000000000000000000000000000000000000000000000081149081156100e7575b50151560805260206080f35b7f01ffc9a700000000000000000000000000000000000000000000000000000000915014816100db565b80fd5b503461000e577ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc60208136011261000e57600480359167ffffffffffffffff831161000e5761014083830191843603011261000e5760a483016101778183610690565b15159050610296575050610124820135600181036101fa576101f6826040519182917f08c379a0000000000000000000000000000000000000000000000000000000008352820160609060208152601560208201527f526576657274206f6e207a6f6e6520686173682031000000000000000000000060408201520190565b0390fd5b600291501461000e576101246003915b01351461026d576102697f17b1f942000000000000000000000000000000000000000000000000000000005b6040517fffffffff0000000000000000000000000000000000000000000000000000000090911681529081906020820190565b0390f35b6102697fffffffff00000000000000000000000000000000000000000000000000000000610236565b826102a18284610690565b905014600014610312576101f6836040519182917f08c379a0000000000000000000000000000000000000000000000000000000008352820160609060208152601c60208201527f526576657274206f6e20657874726144617461206c656e67746820340000000060408201520190565b600561032082849594610690565b90501460001461032f57600080fd5b602061033b8285610690565b905011806104c0575b610357575b50505061012460039161020a565b61036461036c9184610690565b8101906107a9565b9182519260c485019061037f828461081e565b905085036104335760005b85811061039957505050610349565b6103a38183610918565b516103b8826103b2868861081e565b9061093a565b35036103cc576103c790610872565b61038a565b6101f6856040519182917f08c379a0000000000000000000000000000000000000000000000000000000008352820160609060208152601f60208201527f526576657274206f6e20756e6578706563746564206f7264657220686173680060408201520190565b6101f6846040519182917f08c379a0000000000000000000000000000000000000000000000000000000008352820160809060208152602860208201527f526576657274206f6e20756e6578706563746564206f7264657220686173686560408201527f73206c656e67746800000000000000000000000000000000000000000000000060608201520190565b50601f6104cd8285610690565b90501615610344565b919082519283825260005b8481106105205750507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8460006020809697860101520116010190565b6020818301810151848301820152016104e1565b610546604092838352838301906104d6565b906020908181840391015283519182815281810182808560051b8401019601946000925b85841061057b575050505050505090565b9091929394959685806105c8837fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0866001960301885286838d5180518452015191818582015201906104d6565b99019401940192959493919061056a565b503461000e576000807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261011157610612610711565b9060018252805b602090818110156106445760209161062f610711565b90848252606081830152828601015201610619565b83805115610683575b610bbb60208201515261065e610952565b6020610669836108fe565b510152610674610989565b61026960405192839283610534565b61068b6108ce565b61064d565b9035907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe18136030182121561000e570180359067ffffffffffffffff821161000e5760200191813603831361000e57565b507f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051906040820182811067ffffffffffffffff82111761073157604052565b6107396106e1565b604052565b907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f604051930116820182811067ffffffffffffffff82111761073157604052565b60209067ffffffffffffffff811161079c575b60051b0190565b6107a46106e1565b610795565b602090818184031261000e5780359067ffffffffffffffff821161000e57019180601f8401121561000e5782356107e76107e282610782565b61073e565b93838086848152019260051b82010192831161000e578301905b82821061080f575050505090565b81358152908301908301610801565b9035907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe18136030182121561000e570180359067ffffffffffffffff821161000e57602001918160051b3603831361000e57565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff811461089f5760010190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b507f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60209080511561090c570190565b6109146108ce565b0190565b602091815181101561092d575b60051b010190565b6109356108ce565b610925565b919081101561094a5760051b0190565b6107a46108ce565b6040516020810181811067ffffffffffffffff82111761097c575b60405260008152906000368137565b6109846106e1565b61096d565b610991610711565b90600882527f546573745a6f6e65000000000000000000000000000000000000000000000000602083015256fea164736f6c6343000811000a";

type TestZoneConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestZoneConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestZone__factory extends ContractFactory {
  constructor(...args: TestZoneConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TestZone> {
    return super.deploy(overrides || {}) as Promise<TestZone>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): TestZone {
    return super.attach(address) as TestZone;
  }
  override connect(signer: Signer): TestZone__factory {
    return super.connect(signer) as TestZone__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestZoneInterface {
    return new utils.Interface(_abi) as TestZoneInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestZone {
    return new Contract(address, _abi, signerOrProvider) as TestZone;
  }
}
