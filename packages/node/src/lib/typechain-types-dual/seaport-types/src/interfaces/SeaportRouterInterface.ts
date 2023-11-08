/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../common";

export type OfferItemStruct = {
  itemType: PromiseOrValue<BigNumberish>;
  token: PromiseOrValue<string>;
  identifierOrCriteria: PromiseOrValue<BigNumberish>;
  startAmount: PromiseOrValue<BigNumberish>;
  endAmount: PromiseOrValue<BigNumberish>;
};

export type OfferItemStructOutput = [
  number,
  string,
  BigNumber,
  BigNumber,
  BigNumber
] & {
  itemType: number;
  token: string;
  identifierOrCriteria: BigNumber;
  startAmount: BigNumber;
  endAmount: BigNumber;
};

export type ConsiderationItemStruct = {
  itemType: PromiseOrValue<BigNumberish>;
  token: PromiseOrValue<string>;
  identifierOrCriteria: PromiseOrValue<BigNumberish>;
  startAmount: PromiseOrValue<BigNumberish>;
  endAmount: PromiseOrValue<BigNumberish>;
  recipient: PromiseOrValue<string>;
};

export type ConsiderationItemStructOutput = [
  number,
  string,
  BigNumber,
  BigNumber,
  BigNumber,
  string
] & {
  itemType: number;
  token: string;
  identifierOrCriteria: BigNumber;
  startAmount: BigNumber;
  endAmount: BigNumber;
  recipient: string;
};

export type OrderParametersStruct = {
  offerer: PromiseOrValue<string>;
  zone: PromiseOrValue<string>;
  offer: OfferItemStruct[];
  consideration: ConsiderationItemStruct[];
  orderType: PromiseOrValue<BigNumberish>;
  startTime: PromiseOrValue<BigNumberish>;
  endTime: PromiseOrValue<BigNumberish>;
  zoneHash: PromiseOrValue<BytesLike>;
  salt: PromiseOrValue<BigNumberish>;
  conduitKey: PromiseOrValue<BytesLike>;
  totalOriginalConsiderationItems: PromiseOrValue<BigNumberish>;
};

export type OrderParametersStructOutput = [
  string,
  string,
  OfferItemStructOutput[],
  ConsiderationItemStructOutput[],
  number,
  BigNumber,
  BigNumber,
  string,
  BigNumber,
  string,
  BigNumber
] & {
  offerer: string;
  zone: string;
  offer: OfferItemStructOutput[];
  consideration: ConsiderationItemStructOutput[];
  orderType: number;
  startTime: BigNumber;
  endTime: BigNumber;
  zoneHash: string;
  salt: BigNumber;
  conduitKey: string;
  totalOriginalConsiderationItems: BigNumber;
};

export type AdvancedOrderStruct = {
  parameters: OrderParametersStruct;
  numerator: PromiseOrValue<BigNumberish>;
  denominator: PromiseOrValue<BigNumberish>;
  signature: PromiseOrValue<BytesLike>;
  extraData: PromiseOrValue<BytesLike>;
};

export type AdvancedOrderStructOutput = [
  OrderParametersStructOutput,
  BigNumber,
  BigNumber,
  string,
  string
] & {
  parameters: OrderParametersStructOutput;
  numerator: BigNumber;
  denominator: BigNumber;
  signature: string;
  extraData: string;
};

export type CriteriaResolverStruct = {
  orderIndex: PromiseOrValue<BigNumberish>;
  side: PromiseOrValue<BigNumberish>;
  index: PromiseOrValue<BigNumberish>;
  identifier: PromiseOrValue<BigNumberish>;
  criteriaProof: PromiseOrValue<BytesLike>[];
};

export type CriteriaResolverStructOutput = [
  BigNumber,
  number,
  BigNumber,
  BigNumber,
  string[]
] & {
  orderIndex: BigNumber;
  side: number;
  index: BigNumber;
  identifier: BigNumber;
  criteriaProof: string[];
};

export type FulfillmentComponentStruct = {
  orderIndex: PromiseOrValue<BigNumberish>;
  itemIndex: PromiseOrValue<BigNumberish>;
};

export type FulfillmentComponentStructOutput = [BigNumber, BigNumber] & {
  orderIndex: BigNumber;
  itemIndex: BigNumber;
};

export type ReceivedItemStruct = {
  itemType: PromiseOrValue<BigNumberish>;
  token: PromiseOrValue<string>;
  identifier: PromiseOrValue<BigNumberish>;
  amount: PromiseOrValue<BigNumberish>;
  recipient: PromiseOrValue<string>;
};

export type ReceivedItemStructOutput = [
  number,
  string,
  BigNumber,
  BigNumber,
  string
] & {
  itemType: number;
  token: string;
  identifier: BigNumber;
  amount: BigNumber;
  recipient: string;
};

export type ExecutionStruct = {
  item: ReceivedItemStruct;
  offerer: PromiseOrValue<string>;
  conduitKey: PromiseOrValue<BytesLike>;
};

export type ExecutionStructOutput = [
  ReceivedItemStructOutput,
  string,
  string
] & { item: ReceivedItemStructOutput; offerer: string; conduitKey: string };

export declare namespace SeaportRouterInterface {
  export type AdvancedOrderParamsStruct = {
    advancedOrders: AdvancedOrderStruct[];
    criteriaResolvers: CriteriaResolverStruct[];
    offerFulfillments: FulfillmentComponentStruct[][];
    considerationFulfillments: FulfillmentComponentStruct[][];
    etherValue: PromiseOrValue<BigNumberish>;
  };

  export type AdvancedOrderParamsStructOutput = [
    AdvancedOrderStructOutput[],
    CriteriaResolverStructOutput[],
    FulfillmentComponentStructOutput[][],
    FulfillmentComponentStructOutput[][],
    BigNumber
  ] & {
    advancedOrders: AdvancedOrderStructOutput[];
    criteriaResolvers: CriteriaResolverStructOutput[];
    offerFulfillments: FulfillmentComponentStructOutput[][];
    considerationFulfillments: FulfillmentComponentStructOutput[][];
    etherValue: BigNumber;
  };

  export type FulfillAvailableAdvancedOrdersParamsStruct = {
    seaportContracts: PromiseOrValue<string>[];
    advancedOrderParams: SeaportRouterInterface.AdvancedOrderParamsStruct[];
    fulfillerConduitKey: PromiseOrValue<BytesLike>;
    recipient: PromiseOrValue<string>;
    maximumFulfilled: PromiseOrValue<BigNumberish>;
  };

  export type FulfillAvailableAdvancedOrdersParamsStructOutput = [
    string[],
    SeaportRouterInterface.AdvancedOrderParamsStructOutput[],
    string,
    string,
    BigNumber
  ] & {
    seaportContracts: string[];
    advancedOrderParams: SeaportRouterInterface.AdvancedOrderParamsStructOutput[];
    fulfillerConduitKey: string;
    recipient: string;
    maximumFulfilled: BigNumber;
  };
}

export interface SeaportRouterInterfaceInterface extends utils.Interface {
  functions: {
    "fulfillAvailableAdvancedOrders((address[],(((address,address,(uint8,address,uint256,uint256,uint256)[],(uint8,address,uint256,uint256,uint256,address)[],uint8,uint256,uint256,bytes32,uint256,bytes32,uint256),uint120,uint120,bytes,bytes)[],(uint256,uint8,uint256,uint256,bytes32[])[],(uint256,uint256)[][],(uint256,uint256)[][],uint256)[],bytes32,address,uint256))": FunctionFragment;
    "getAllowedSeaportContracts()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "fulfillAvailableAdvancedOrders"
      | "getAllowedSeaportContracts"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "fulfillAvailableAdvancedOrders",
    values: [SeaportRouterInterface.FulfillAvailableAdvancedOrdersParamsStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "getAllowedSeaportContracts",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "fulfillAvailableAdvancedOrders",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAllowedSeaportContracts",
    data: BytesLike
  ): Result;

  events: {};
}

export interface SeaportRouterInterface extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: SeaportRouterInterfaceInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    fulfillAvailableAdvancedOrders(
      params: SeaportRouterInterface.FulfillAvailableAdvancedOrdersParamsStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getAllowedSeaportContracts(overrides?: CallOverrides): Promise<[string[]]>;
  };

  fulfillAvailableAdvancedOrders(
    params: SeaportRouterInterface.FulfillAvailableAdvancedOrdersParamsStruct,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getAllowedSeaportContracts(overrides?: CallOverrides): Promise<string[]>;

  callStatic: {
    fulfillAvailableAdvancedOrders(
      params: SeaportRouterInterface.FulfillAvailableAdvancedOrdersParamsStruct,
      overrides?: CallOverrides
    ): Promise<
      [boolean[][], ExecutionStructOutput[][]] & {
        availableOrders: boolean[][];
        executions: ExecutionStructOutput[][];
      }
    >;

    getAllowedSeaportContracts(overrides?: CallOverrides): Promise<string[]>;
  };

  filters: {};

  estimateGas: {
    fulfillAvailableAdvancedOrders(
      params: SeaportRouterInterface.FulfillAvailableAdvancedOrdersParamsStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getAllowedSeaportContracts(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    fulfillAvailableAdvancedOrders(
      params: SeaportRouterInterface.FulfillAvailableAdvancedOrdersParamsStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getAllowedSeaportContracts(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
