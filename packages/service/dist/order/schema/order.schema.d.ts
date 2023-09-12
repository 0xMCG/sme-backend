import * as mongoose from 'mongoose';
export declare const OrderSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    hash?: string;
    entry?: {
        parameters?: {
            offer: {
                itemType?: number;
                token?: string;
                identifierOrCriteria?: string;
                startAmount?: string;
                endAmount?: string;
            }[];
            consideration: {
                itemType?: number;
                token?: string;
                identifierOrCriteria?: string;
                startAmount?: string;
                endAmount?: string;
                recipient?: string;
            }[];
            offerer?: string;
            zone?: string;
            zoneHash?: string;
            startTime?: string;
            endTime?: string;
            orderType?: number;
            totalOriginalConsiderationItems?: number;
            salt?: string;
            conduitKey?: string;
            counter?: string;
        };
        signature?: string;
    };
    status?: string;
}, mongoose.Document<unknown, {}, {
    hash?: string;
    entry?: {
        parameters?: {
            offer: {
                itemType?: number;
                token?: string;
                identifierOrCriteria?: string;
                startAmount?: string;
                endAmount?: string;
            }[];
            consideration: {
                itemType?: number;
                token?: string;
                identifierOrCriteria?: string;
                startAmount?: string;
                endAmount?: string;
                recipient?: string;
            }[];
            offerer?: string;
            zone?: string;
            zoneHash?: string;
            startTime?: string;
            endTime?: string;
            orderType?: number;
            totalOriginalConsiderationItems?: number;
            salt?: string;
            conduitKey?: string;
            counter?: string;
        };
        signature?: string;
    };
    status?: string;
}> & {
    hash?: string;
    entry?: {
        parameters?: {
            offer: {
                itemType?: number;
                token?: string;
                identifierOrCriteria?: string;
                startAmount?: string;
                endAmount?: string;
            }[];
            consideration: {
                itemType?: number;
                token?: string;
                identifierOrCriteria?: string;
                startAmount?: string;
                endAmount?: string;
                recipient?: string;
            }[];
            offerer?: string;
            zone?: string;
            zoneHash?: string;
            startTime?: string;
            endTime?: string;
            orderType?: number;
            totalOriginalConsiderationItems?: number;
            salt?: string;
            conduitKey?: string;
            counter?: string;
        };
        signature?: string;
    };
    status?: string;
} & {
    _id: mongoose.Types.ObjectId;
}>;
