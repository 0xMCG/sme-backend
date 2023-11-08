import * as mongoose from 'mongoose';

const offerItemSchema = new mongoose.Schema({
  
    itemType: Number,
    token: String,
    identifierOrCriteria: String,
    startAmount: String,
    endAmount: String,
  
}, { _id: false }); // 禁用嵌套模式的 _id 字段

const considerationItemSchema = new mongoose.Schema({
  
    itemType: Number,
    token: String,
    identifierOrCriteria: String,
    startAmount: String,
    endAmount: String,
    recipient: String,
  
}, { _id: false }); // 禁用嵌套模式的 _id 字段

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
      offer: [
        offerItemSchema
      ],
      consideration: [
        considerationItemSchema
      ],
      totalOriginalConsiderationItems: Number,
      salt: String,
      conduitKey: String,
      counter: String,
    },
    signature: String,
  },
  status: String,
  type: String
});
