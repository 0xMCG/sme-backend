/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
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
} from "../../common";

export type SchemaStruct = {
  id: PromiseOrValue<BigNumberish>;
  metadata: PromiseOrValue<BytesLike>;
};

export type SchemaStructOutput = [BigNumber, string] & {
  id: BigNumber;
  metadata: string;
};

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

export interface TestZoneInterface extends utils.Interface {
  functions: {
    "getSeaportMetadata()": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "validateOrder((bytes32,address,address,(uint8,address,uint256,uint256)[],(uint8,address,uint256,uint256,address)[],bytes,bytes32[],uint256,uint256,bytes32))": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "getSeaportMetadata"
      | "supportsInterface"
      | "validateOrder"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getSeaportMetadata",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "validateOrder",
    values: [ZoneParametersStruct]
  ): string;

  decodeFunctionResult(
    functionFragment: "getSeaportMetadata",
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

  events: {};
}

export interface TestZone extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TestZoneInterface;

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
    getSeaportMetadata(
      overrides?: CallOverrides
    ): Promise<
      [string, SchemaStructOutput[]] & {
        name: string;
        schemas: SchemaStructOutput[];
      }
    >;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    validateOrder(
      zoneParameters: ZoneParametersStruct,
      overrides?: CallOverrides
    ): Promise<[string] & { validOrderMagicValue: string }>;
  };

  getSeaportMetadata(
    overrides?: CallOverrides
  ): Promise<
    [string, SchemaStructOutput[]] & {
      name: string;
      schemas: SchemaStructOutput[];
    }
  >;

  supportsInterface(
    interfaceId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  validateOrder(
    zoneParameters: ZoneParametersStruct,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    getSeaportMetadata(
      overrides?: CallOverrides
    ): Promise<
      [string, SchemaStructOutput[]] & {
        name: string;
        schemas: SchemaStructOutput[];
      }
    >;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    validateOrder(
      zoneParameters: ZoneParametersStruct,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {};

  estimateGas: {
    getSeaportMetadata(overrides?: CallOverrides): Promise<BigNumber>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    validateOrder(
      zoneParameters: ZoneParametersStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getSeaportMetadata(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    validateOrder(
      zoneParameters: ZoneParametersStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
