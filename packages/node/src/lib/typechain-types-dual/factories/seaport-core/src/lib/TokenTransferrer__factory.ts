/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  TokenTransferrer,
  TokenTransferrerInterface,
} from "../../../../seaport-core/src/lib/TokenTransferrer";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
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
    name: "BadReturnValueFromERC20OnTransfer",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
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
        name: "identifiers",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    name: "ERC1155BatchTransferGenericFailure",
    type: "error",
  },
  {
    inputs: [],
    name: "Invalid1155BatchTransferEncoding",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "InvalidERC721TransferAmount",
    type: "error",
  },
  {
    inputs: [],
    name: "MissingItemAmount",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "NoContract",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
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
        name: "identifier",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TokenTransferGenericFailure",
    type: "error",
  },
  {
    inputs: [],
    name: "UnusedItemParameters",
    type: "error",
  },
];

const _bytecode =
  "0x608080604052346013576011908160198239f35b600080fdfe600080fdfea164736f6c6343000811000a";

type TokenTransferrerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TokenTransferrerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TokenTransferrer__factory extends ContractFactory {
  constructor(...args: TokenTransferrerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TokenTransferrer> {
    return super.deploy(overrides || {}) as Promise<TokenTransferrer>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): TokenTransferrer {
    return super.attach(address) as TokenTransferrer;
  }
  override connect(signer: Signer): TokenTransferrer__factory {
    return super.connect(signer) as TokenTransferrer__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TokenTransferrerInterface {
    return new utils.Interface(_abi) as TokenTransferrerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TokenTransferrer {
    return new Contract(address, _abi, signerOrProvider) as TokenTransferrer;
  }
}