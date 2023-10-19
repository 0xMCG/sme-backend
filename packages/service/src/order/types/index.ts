import { ApiProperty } from '@nestjs/swagger';

class Offer {
  @ApiProperty()
  itemType: number;
  @ApiProperty()
  token: string;
  @ApiProperty()
  identifierOrCriteria: string;
  @ApiProperty()
  startAmount: string;
  @ApiProperty()
  endAmount: string;
}

class Consideration {
  @ApiProperty()
  itemType: number;
  @ApiProperty()
  token: string;
  @ApiProperty()
  identifierOrCriteria: string;
  @ApiProperty()
  startAmount: string;
  @ApiProperty()
  endAmount: string;
  @ApiProperty()
  recipient: string;
}

export class OrderParameter {
  @ApiProperty()
  offerer: string;
  @ApiProperty()
  zone: string;
  @ApiProperty()
  zoneHash: string;
  @ApiProperty()
  startTime: string;
  @ApiProperty()
  endTime: string;
  @ApiProperty()
  orderType: number;
  @ApiProperty({
    type: Array<Offer>,
  })
  offer: Array<Offer>;
  @ApiProperty({
    type: Array<Consideration>,
  })
  consideration: Array<Consideration>;
  @ApiProperty()
  totalOriginalConsiderationItems: number;
  @ApiProperty()
  salt: string;
  @ApiProperty()
  conduitKey: string;
  @ApiProperty()
  counter: string;
}

class OrderEntry {
  @ApiProperty({
    type: OrderParameter,
  })
  parameters: OrderParameter;
  @ApiProperty()
  signature: string;
}

export enum OrderType {
  BID = '1',
  SELL = '2',
  INITIAL = '3'
}

export { Offer, Consideration, OrderEntry };

export enum OrderStatus {
  CANCELLED = 'Cancelled',
  MATCHED = 'Matched',
  VALID = 'Valid',
  PENDING = 'PENDING'
}

export enum TaskStatus {
  REQUESTED = 'requested random number',
  PENDING = 'pending',
  MATCHED = 'matched',
}

export class OrderQueryParams {
  status: string;
  type: string;
  offerer: string;
}
