import mongoose from "mongoose";

export const SellingTop = new mongoose.Schema({
    volume: Number,
    count: Number,
    id: {
        type: String,
        index: true
    },
    name: String,
    image: String,
    recentSales: []
});