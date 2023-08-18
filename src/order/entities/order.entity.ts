import { Consideration, Offer } from '../types';

export class Order {
  hash: string;
  entry: {
    parameters: {
      offerer: string;
      zone: string;
      zoneHash: string;
      startTime: string;
      endTime: string;
      orderType: number;
      offer: [Offer];
      consideration: [Consideration];
      totalOriginalConsiderationItems: number;
      salt: string;
      conduitKey: string;
      counter: string;
    };
    signature: string;
  };
}
