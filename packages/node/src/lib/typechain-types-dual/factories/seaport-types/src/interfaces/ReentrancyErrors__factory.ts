/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  ReentrancyErrors,
  ReentrancyErrorsInterface,
} from "../../../../seaport-types/src/interfaces/ReentrancyErrors";

const _abi = [
  {
    inputs: [],
    name: "NoReentrantCalls",
    type: "error",
  },
] as const;

export class ReentrancyErrors__factory {
  static readonly abi = _abi;
  static createInterface(): ReentrancyErrorsInterface {
    return new utils.Interface(_abi) as ReentrancyErrorsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ReentrancyErrors {
    return new Contract(address, _abi, signerOrProvider) as ReentrancyErrors;
  }
}
