import mongoose from 'mongoose';

export const RoyaltiesSchema = new mongoose.Schema({
    tokenId: String,
    tokenAddress: String,
    rate: Number,
});
