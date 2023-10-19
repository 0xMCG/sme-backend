import * as mongoose from 'mongoose';

export const TransactionSchema = new mongoose.Schema({
  orderHash: { type: String, index: true, require: true },
  price: String,
  status: String,
  numerator: String,
  denominator: String
});
