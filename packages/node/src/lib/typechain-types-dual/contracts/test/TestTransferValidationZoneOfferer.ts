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
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export type SpentItemStruct = {
  itemType: PromiseOrValue<BigNumberish>;
  token: PromiseOrValue<string>;
  identifier: PromiseOrValue<BigNumberish>;
  amount: PromiseOrValue<BigNumberish>;
};

export type SpentItemStructOutput = [number, string, BigNumber, BigNumber] & {
  itemType: number;
  token: string;
  identifier: BigNumber;
  amount: BigNumber;
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

export type SchemaStruct = {
  id: PromiseOrValue<BigNumberish>;
  metadata: PromiseOrValue<BytesLike>;
};

export type SchemaStructOutput = [BigNumber, string] & {
  id: BigNumber;
  metadata: string;
};

export type ZoneParametersStruct = {
  orderHash: PromiseOrValue<BytesLike>;
  fulfiller: PromiseOrValue<string>;
  offerer: PromiseOrValue<string>;
  offer: SpentItemStruct[];
  consideration: ReceivedItemStruct[];
  extraData: PromiseOrValue<BytesLike>;
  orderHashes: PromiseOrValue<BytesLike>[];
  startTime: PromiseOrValue<BigNumberish>;
  endTime: PromiseOrValue<BigNumberish>;
  zoneHash: PromiseOrValue<BytesLike>;
};

export type ZoneParametersStructOutput = [
  string,
  string,
  string,
  SpentItemStructOutput[],
  ReceivedItemStructOutput[],
  string,
  string[],
  BigNumber,
  BigNumber,
  string
] & {
  orderHash: string;
  fulfiller: string;
  offerer: string;
  offer: SpentItemStructOutput[];
  consideration: ReceivedItemStructOutput[];
  extraData: string;
  orderHashes: string[];
  startTime: BigNumber;
  endTime: BigNumber;
  zoneHash: string;
};

export interface TestTransferValidationZoneOffererInterface
  extends utils.Interface {
  functions: {
    "callCount()": FunctionFragment;
    "called()": FunctionFragment;
    "generateOrder(address,(uint8,address,uint256,uint256)[],(uint8,address,uint256,uint256)[],bytes)": FunctionFragment;
    "getSeaportMetadata()": FunctionFragment;
    "orderHashToValidateOrderDataHash(bytes32)": FunctionFragment;
    "previewOrder(address,address,(uint8,address,uint256,uint256)[],(uint8,address,uint256,uint256)[],bytes)": FunctionFragment;
    "ratifyOrder((uint8,address,uint256,uint256)[],(uint8,address,uint256,uint256,address)[],bytes,bytes32[],uint256)": FunctionFragment;
    "setExpectedOfferRecipient(address)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "validateOrder((bytes32,address,address,(uint8,address,uint256,uint256)[],(uint8,address,uint256,uint256,address)[],bytes,bytes32[],uint256,uint256,bytes32))": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "callCount"
      | "called"
      | "generateOrder"
      | "getSeaportMetadata"
      | "orderHashToValidateOrderDataHash"
      | "previewOrder"
      | "ratifyOrder"
      | "setExpectedOfferRecipient"
      | "supportsInterface"
      | "validateOrder"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "callCount", values?: undefined): string;
  encodeFunctionData(functionFragment: "called", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "generateOrder",
    values: [
      PromiseOrValue<string>,
      SpentItemStruct[],
      SpentItemStruct[],
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getSeaportMetadata",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "orderHashToValidateOrderDataHash",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "previewOrder",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      SpentItemStruct[],
      SpentItemStruct[],
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "ratifyOrder",
    values: [
      SpentItemStruct[],
      ReceivedItemStruct[],
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>[],
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "setExpectedOfferRecipient",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "validateOrder",
    values: [ZoneParametersStruct]
  ): string;

  decodeFunctionResult(functionFragment: "callCount", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "called", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "generateOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSeaportMetadata",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "orderHashToValidateOrderDataHash",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "previewOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ratifyOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setExpectedOfferRecipient",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "validateOrder",
    data: BytesLike
  ): Result;

  events: {
    "ValidateOrderDataHash(bytes32)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ValidateOrderDataHash"): EventFragment;
}

export interface ValidateOrderDataHashEventObject {
  dataHash: string;
}
export type ValidateOrderDataHashEvent = TypedEvent<
  [string],
  ValidateOrderDataHashEventObject
>;

export type ValidateOrderDataHashEventFilter =
  TypedEventFilter<ValidateOrderDataHashEvent>;

export interface TestTransferValidationZoneOfferer extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TestTransferValidationZoneOffererInterface;

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
    callCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    called(overrides?: CallOverrides): Promise<[boolean]>;

    generateOrder(
      arg0: PromiseOrValue<string>,
      a: SpentItemStruct[],
      b: SpentItemStruct[],
      c: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getSeaportMetadata(
      overrides?: CallOverrides
    ): Promise<
      [string, SchemaStructOutput[]] & {
        name: string;
        schemas: SchemaStructOutput[];
      }
    >;

    orderHashToValidateOrderDataHash(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    previewOrder(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      a: SpentItemStruct[],
      b: SpentItemStruct[],
      arg4: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<
      [SpentItemStructOutput[], ReceivedItemStructOutput[]] & {
        offer: SpentItemStructOutput[];
        consideration: ReceivedItemStructOutput[];
      }
    >;

    ratifyOrder(
      minimumReceived: SpentItemStruct[],
      maximumSpent: ReceivedItemStruct[],
      context: PromiseOrValue<BytesLike>,
      arg3: PromiseOrValue<BytesLike>[],
      arg4: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setExpectedOfferRecipient(
      expectedOfferRecipient: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    validateOrder(
      zoneParameters: ZoneParametersStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  callCount(overrides?: CallOverrides): Promise<BigNumber>;

  called(overrides?: CallOverrides): Promise<boolean>;

  generateOrder(
    arg0: PromiseOrValue<string>,
    a: SpentItemStruct[],
    b: SpentItemStruct[],
    c: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getSeaportMetadata(
    overrides?: CallOverrides
  ): Promise<
    [string, SchemaStructOutput[]] & {
      name: string;
      schemas: SchemaStructOutput[];
    }
  >;

  orderHashToValidateOrderDataHash(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  previewOrder(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<string>,
    a: SpentItemStruct[],
    b: SpentItemStruct[],
    arg4: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<
    [SpentItemStructOutput[], ReceivedItemStructOutput[]] & {
      offer: SpentItemStructOutput[];
      consideration: ReceivedItemStructOutput[];
    }
  >;

  ratifyOrder(
    minimumReceived: SpentItemStruct[],
    maximumSpent: ReceivedItemStruct[],
    context: PromiseOrValue<BytesLike>,
    arg3: PromiseOrValue<BytesLike>[],
    arg4: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setExpectedOfferRecipient(
    expectedOfferRecipient: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  validateOrder(
    zoneParameters: ZoneParametersStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    callCount(overrides?: CallOverrides): Promise<BigNumber>;

    called(overrides?: CallOverrides): Promise<boolean>;

    generateOrder(
      arg0: PromiseOrValue<string>,
      a: SpentItemStruct[],
      b: SpentItemStruct[],
      c: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<
      [SpentItemStructOutput[], ReceivedItemStructOutput[]] & {
        offer: SpentItemStructOutput[];
        consideration: ReceivedItemStructOutput[];
      }
    >;

    getSeaportMetadata(
      overrides?: CallOverrides
    ): Promise<
      [string, SchemaStructOutput[]] & {
        name: string;
        schemas: SchemaStructOutput[];
      }
    >;

    orderHashToValidateOrderDataHash(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    previewOrder(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      a: SpentItemStruct[],
      b: SpentItemStruct[],
      arg4: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<
      [SpentItemStructOutput[], ReceivedItemStructOutput[]] & {
        offer: SpentItemStructOutput[];
        consideration: ReceivedItemStructOutput[];
      }
    >;

    ratifyOrder(
      minimumReceived: SpentItemStruct[],
      maximumSpent: ReceivedItemStruct[],
      context: PromiseOrValue<BytesLike>,
      arg3: PromiseOrValue<BytesLike>[],
      arg4: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    setExpectedOfferRecipient(
      expectedOfferRecipient: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    validateOrder(
      zoneParameters: ZoneParametersStruct,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    "ValidateOrderDataHash(bytes32)"(
      dataHash?: null
    ): ValidateOrderDataHashEventFilter;
    ValidateOrderDataHash(dataHash?: null): ValidateOrderDataHashEventFilter;
  };

  estimateGas: {
    callCount(overrides?: CallOverrides): Promise<BigNumber>;

    called(overrides?: CallOverrides): Promise<BigNumber>;

    generateOrder(
      arg0: PromiseOrValue<string>,
      a: SpentItemStruct[],
      b: SpentItemStruct[],
      c: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getSeaportMetadata(overrides?: CallOverrides): Promise<BigNumber>;

    orderHashToValidateOrderDataHash(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    previewOrder(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      a: SpentItemStruct[],
      b: SpentItemStruct[],
      arg4: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    ratifyOrder(
      minimumReceived: SpentItemStruct[],
      maximumSpent: ReceivedItemStruct[],
      context: PromiseOrValue<BytesLike>,
      arg3: PromiseOrValue<BytesLike>[],
      arg4: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setExpectedOfferRecipient(
      expectedOfferRecipient: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    validateOrder(
      zoneParameters: ZoneParametersStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    callCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    called(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    generateOrder(
      arg0: PromiseOrValue<string>,
      a: SpentItemStruct[],
      b: SpentItemStruct[],
      c: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getSeaportMetadata(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    orderHashToValidateOrderDataHash(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    previewOrder(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      a: SpentItemStruct[],
      b: SpentItemStruct[],
      arg4: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    ratifyOrder(
      minimumReceived: SpentItemStruct[],
      maximumSpent: ReceivedItemStruct[],
      context: PromiseOrValue<BytesLike>,
      arg3: PromiseOrValue<BytesLike>[],
      arg4: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setExpectedOfferRecipient(
      expectedOfferRecipient: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    validateOrder(
      zoneParameters: ZoneParametersStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
