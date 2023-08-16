import * as mongoose from 'mongoose';

export const HotTopSchema = new mongoose.Schema({

    id: {
        type: String,
        index: true
    },
    slug: String,
    createdAt: Date,
    name: String,
    image: String,
    banner: String,
    discordUrl: String,
    externalUrl: String,
    twitterUsername: String,
    openseaVerificationStatus: String,
    description: String,
    sampleImages: [String],
    tokenCount: String,
    onSaleCount: String,
    primaryContract: String,
    tokenSetId: String,
    creator: String,
    royalties: {
        recipient: String,
        breakdown: [
            {
                bps: Number,
                recipient: String
            }
        ],
        bps: Number
    },
    allRoyalties: {
        eip2981: [
            {
                bps: Number,
                recipient: String
            }
        ],
        onchain: [
            {
                bps: Number,
                recipient: String
            }
        ],
        opensea: [
            {
                bps: Number,
                recipient: String
            }
        ]
    },
    floorAsk: {
        id: String,
        sourceDomain: String,
        price: {
            currency: {
                contract: String,
                name: String,
                symbol: String,
                decimals: Number
            },
            amount: {
                raw: String,
                decimal: Number,
                usd: Number,
                native: Number
            }
        },
        maker: String,
        validFrom: Number,
        validUntil: Number,
        token: {
            contract: String,
            tokenId: String,
            name: String,
            image: String
        }
    },
    topBid: {
        id: String,
        sourceDomain: String,
        price: {
            currency: {
                contract: String,
                name: String,
                symbol: String,
                decimals: Number
            },
            amount: {
                raw: String,
                decimal: Number,
                usd: Number,
                native: Number
            },
            netAmount: {
                raw: String,
                decimal: Number,
                usd: Number,
                native: Number
            }
        },
        maker: String,
        validFrom: Number,
        validUntil: Number
    },
    rank: {
        '1day': Number,
        '7day': Number,
        '30day': Number,
        allTime: Number
    },
    volume: {
        '1day': Number,
        '7day': Number,
        '30day': Number,
        allTime: Number
    },
    volumeChange: {
        '1day': Number,
        '7day': Number,
        '30day': Number,
    },
    floorSale: {
        '1day': Number,
        '7day': Number,
        '30day': Number,
    },
    floorSaleChange: {
        '1day': Number,
        '7day': Number,
        '30day': Number,
    },
    collectionBidSupported: Boolean,
    ownerCount: Number,
    contractKind: String,
    mintedTimestamp: String,
    mintStages: []

});