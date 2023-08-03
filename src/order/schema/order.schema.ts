import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
  hash: String,
  entry: {
    parameters: {
      offerer: String,
      zone: String,
      zoneHash: String,
      startTime: String,
      endTime: String,
      orderType: Number,
      offer: [ [Object] ],
      consideration: [ [Object] ],
      totalOriginalConsiderationItems: Number,
      salt: String,
      conduitKey: String,
      counter: String
    },
    signature: String
  }
});