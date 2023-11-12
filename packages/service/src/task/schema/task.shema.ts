import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
  requestId: { type: String, index: true, unique: true, require: true },
  status: String,
  orderHashes: Array<String>
});
