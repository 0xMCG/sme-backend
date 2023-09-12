import * as mongoose from 'mongoose';
export declare const HotTopSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    sampleImages: string[];
    mintStages: mongoose.Types.DocumentArray<any> | any[] | {
        [x: string]: any;
    }[] | any[];
    name?: string;
    description?: string;
    id?: string;
    slug?: string;
    createdAt?: Date;
    image?: string;
    banner?: string;
    discordUrl?: string;
    externalUrl?: string;
    twitterUsername?: string;
    openseaVerificationStatus?: string;
    tokenCount?: string;
    onSaleCount?: string;
    primaryContract?: string;
    tokenSetId?: string;
    creator?: string;
    collectionBidSupported?: boolean;
    ownerCount?: number;
    contractKind?: string;
    mintedTimestamp?: string;
    royalties?: {
        breakdown: {
            recipient?: string;
            bps?: number;
        }[];
        recipient?: string;
        bps?: number;
    };
    allRoyalties?: {
        eip2981: {
            recipient?: string;
            bps?: number;
        }[];
        onchain: {
            recipient?: string;
            bps?: number;
        }[];
        opensea: {
            recipient?: string;
            bps?: number;
        }[];
    };
    floorAsk?: {
        token?: {
            name?: string;
            image?: string;
            contract?: string;
            tokenId?: string;
        };
        id?: string;
        sourceDomain?: string;
        maker?: string;
        validFrom?: number;
        validUntil?: number;
        price?: {
            currency?: {
                symbol?: string;
                name?: string;
                contract?: string;
                decimals?: number;
            };
            amount?: {
                raw?: string;
                decimal?: number;
                usd?: number;
                native?: number;
            };
        };
    };
    topBid?: {
        id?: string;
        sourceDomain?: string;
        maker?: string;
        validFrom?: number;
        validUntil?: number;
        price?: {
            currency?: {
                symbol?: string;
                name?: string;
                contract?: string;
                decimals?: number;
            };
            amount?: {
                raw?: string;
                decimal?: number;
                usd?: number;
                native?: number;
            };
            netAmount?: {
                raw?: string;
                decimal?: number;
                usd?: number;
                native?: number;
            };
        };
    };
    rank?: {
        "1day"?: number;
        "7day"?: number;
        "30day"?: number;
        allTime?: number;
    };
    volume?: {
        "1day"?: number;
        "7day"?: number;
        "30day"?: number;
        allTime?: number;
    };
    volumeChange?: {
        "1day"?: number;
        "7day"?: number;
        "30day"?: number;
    };
    floorSale?: {
        "1day"?: number;
        "7day"?: number;
        "30day"?: number;
    };
    floorSaleChange?: {
        "1day"?: number;
        "7day"?: number;
        "30day"?: number;
    };
}, mongoose.Document<unknown, {}, {
    sampleImages: string[];
    mintStages: mongoose.Types.DocumentArray<any> | any[] | {
        [x: string]: any;
    }[] | any[];
    name?: string;
    description?: string;
    id?: string;
    slug?: string;
    createdAt?: Date;
    image?: string;
    banner?: string;
    discordUrl?: string;
    externalUrl?: string;
    twitterUsername?: string;
    openseaVerificationStatus?: string;
    tokenCount?: string;
    onSaleCount?: string;
    primaryContract?: string;
    tokenSetId?: string;
    creator?: string;
    collectionBidSupported?: boolean;
    ownerCount?: number;
    contractKind?: string;
    mintedTimestamp?: string;
    royalties?: {
        breakdown: {
            recipient?: string;
            bps?: number;
        }[];
        recipient?: string;
        bps?: number;
    };
    allRoyalties?: {
        eip2981: {
            recipient?: string;
            bps?: number;
        }[];
        onchain: {
            recipient?: string;
            bps?: number;
        }[];
        opensea: {
            recipient?: string;
            bps?: number;
        }[];
    };
    floorAsk?: {
        token?: {
            name?: string;
            image?: string;
            contract?: string;
            tokenId?: string;
        };
        id?: string;
        sourceDomain?: string;
        maker?: string;
        validFrom?: number;
        validUntil?: number;
        price?: {
            currency?: {
                symbol?: string;
                name?: string;
                contract?: string;
                decimals?: number;
            };
            amount?: {
                raw?: string;
                decimal?: number;
                usd?: number;
                native?: number;
            };
        };
    };
    topBid?: {
        id?: string;
        sourceDomain?: string;
        maker?: string;
        validFrom?: number;
        validUntil?: number;
        price?: {
            currency?: {
                symbol?: string;
                name?: string;
                contract?: string;
                decimals?: number;
            };
            amount?: {
                raw?: string;
                decimal?: number;
                usd?: number;
                native?: number;
            };
            netAmount?: {
                raw?: string;
                decimal?: number;
                usd?: number;
                native?: number;
            };
        };
    };
    rank?: {
        "1day"?: number;
        "7day"?: number;
        "30day"?: number;
        allTime?: number;
    };
    volume?: {
        "1day"?: number;
        "7day"?: number;
        "30day"?: number;
        allTime?: number;
    };
    volumeChange?: {
        "1day"?: number;
        "7day"?: number;
        "30day"?: number;
    };
    floorSale?: {
        "1day"?: number;
        "7day"?: number;
        "30day"?: number;
    };
    floorSaleChange?: {
        "1day"?: number;
        "7day"?: number;
        "30day"?: number;
    };
}> & {
    sampleImages: string[];
    mintStages: mongoose.Types.DocumentArray<any> | any[] | {
        [x: string]: any;
    }[] | any[];
    name?: string;
    description?: string;
    id?: string;
    slug?: string;
    createdAt?: Date;
    image?: string;
    banner?: string;
    discordUrl?: string;
    externalUrl?: string;
    twitterUsername?: string;
    openseaVerificationStatus?: string;
    tokenCount?: string;
    onSaleCount?: string;
    primaryContract?: string;
    tokenSetId?: string;
    creator?: string;
    collectionBidSupported?: boolean;
    ownerCount?: number;
    contractKind?: string;
    mintedTimestamp?: string;
    royalties?: {
        breakdown: {
            recipient?: string;
            bps?: number;
        }[];
        recipient?: string;
        bps?: number;
    };
    allRoyalties?: {
        eip2981: {
            recipient?: string;
            bps?: number;
        }[];
        onchain: {
            recipient?: string;
            bps?: number;
        }[];
        opensea: {
            recipient?: string;
            bps?: number;
        }[];
    };
    floorAsk?: {
        token?: {
            name?: string;
            image?: string;
            contract?: string;
            tokenId?: string;
        };
        id?: string;
        sourceDomain?: string;
        maker?: string;
        validFrom?: number;
        validUntil?: number;
        price?: {
            currency?: {
                symbol?: string;
                name?: string;
                contract?: string;
                decimals?: number;
            };
            amount?: {
                raw?: string;
                decimal?: number;
                usd?: number;
                native?: number;
            };
        };
    };
    topBid?: {
        id?: string;
        sourceDomain?: string;
        maker?: string;
        validFrom?: number;
        validUntil?: number;
        price?: {
            currency?: {
                symbol?: string;
                name?: string;
                contract?: string;
                decimals?: number;
            };
            amount?: {
                raw?: string;
                decimal?: number;
                usd?: number;
                native?: number;
            };
            netAmount?: {
                raw?: string;
                decimal?: number;
                usd?: number;
                native?: number;
            };
        };
    };
    rank?: {
        "1day"?: number;
        "7day"?: number;
        "30day"?: number;
        allTime?: number;
    };
    volume?: {
        "1day"?: number;
        "7day"?: number;
        "30day"?: number;
        allTime?: number;
    };
    volumeChange?: {
        "1day"?: number;
        "7day"?: number;
        "30day"?: number;
    };
    floorSale?: {
        "1day"?: number;
        "7day"?: number;
        "30day"?: number;
    };
    floorSaleChange?: {
        "1day"?: number;
        "7day"?: number;
        "30day"?: number;
    };
} & {
    _id: mongoose.Types.ObjectId;
}>;
