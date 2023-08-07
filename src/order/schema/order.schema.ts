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
            offer: [{
                itemType: Number,
                token: String,
                identifierOrCriteria: String,
                startAmount: String,
                endAmount: String
            }],
            consideration: [{
                itemType: Number,
                token: String,
                identifierOrCriteria: String,
                startAmount: String,
                endAmount: String,
                recipient: String
            }],
            totalOriginalConsiderationItems: Number,
            salt: String,
            conduitKey: String,
            counter: String
        },
        signature: String
    }
});