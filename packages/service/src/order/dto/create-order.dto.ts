// {
//     "parameters":{
//         "offerer":"0x28c73A60ccF8c66c14EbA8935984e616Df2926e3",
//         "zone":"0x0000000000000000000000000000000000000000",
//         "zoneHash":"0x0000000000000000000000000000000000000000000000000000000000000000",
//         "startTime":"1691115473",
//         "endTime":"1691119073",
//         "orderType":0,
//         "offer":[
//             {
//                 "itemType":2,
//                 "token":"0xE4E39D40d1b9c70dcd115FEA8DaEF242194f2cC7",
//                 "identifierOrCriteria":"5",
//                 "startAmount":"1",
//                 "endAmount":"1"
//             }
//         ],
//         "consideration":[
//             {
//                 "itemType":1,
//                 "token":"0x8D4E2c8bc6b1E4Fa0ED829E6786E9096dd6DC265",
//                 "identifierOrCriteria":"0",
//                 "startAmount":"200000000000000",
//                 "endAmount":"400000000000000",
//                 "recipient":"0x28c73A60ccF8c66c14EbA8935984e616Df2926e3"
//             }
//         ],
//         "totalOriginalConsiderationItems":1,
//         "salt":"0x0000000000000000000000000000000000000000000000006e5ca2cda03e17d9",
//         "conduitKey":"0x0000000000000000000000000000000000000000000000000000000000000000",
//         "counter":"0"
//     },
//     "signature":"0xeec57d9f257087fa276df6512470079c1682119d7c0b2f3c4f9036c4a8ec7bdd56ad7c67e858f2b9a0b4e6ec13b15294fa03f2d149b310fd7f0388c1467ec0d0"
// }

import { ApiProperty } from '@nestjs/swagger';
import { OrderEntry, OrderType } from '../types';

export class CreateOrderDto {
  @ApiProperty({
    required: false,
  })
  hash: string;

  @ApiProperty({
    type: OrderEntry,
  })
  entry: OrderEntry;

  @ApiProperty({
    required: true,
    enum: OrderType
  })
  type: OrderType;
}
