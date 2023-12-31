import * as mongoose from 'mongoose';

export const TransactionSchema = new mongoose.Schema({
  orderHash: { type: String, index: true, require: true },
  txHash: String,
  price: String,
  status: String,
  numerator: String,
  denominator: String,
  itemNumerator: String,
  itemDenominator: String,
  itemSize: {
    type: Number,
    default: 0
  }
});
