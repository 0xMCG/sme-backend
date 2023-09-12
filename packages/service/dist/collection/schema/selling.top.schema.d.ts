import mongoose from 'mongoose';
export declare const SellingTop: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    recentSales: mongoose.Types.DocumentArray<any> | any[] | {
        [x: string]: any;
    }[] | any[];
    name?: string;
    id?: string;
    count?: number;
    image?: string;
    volume?: number;
}, mongoose.Document<unknown, {}, {
    recentSales: mongoose.Types.DocumentArray<any> | any[] | {
        [x: string]: any;
    }[] | any[];
    name?: string;
    id?: string;
    count?: number;
    image?: string;
    volume?: number;
}> & {
    recentSales: mongoose.Types.DocumentArray<any> | any[] | {
        [x: string]: any;
    }[] | any[];
    name?: string;
    id?: string;
    count?: number;
    image?: string;
    volume?: number;
} & {
    _id: mongoose.Types.ObjectId;
}>;
