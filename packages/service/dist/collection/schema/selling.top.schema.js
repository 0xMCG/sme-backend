"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellingTop = void 0;
const mongoose_1 = require("mongoose");
exports.SellingTop = new mongoose_1.default.Schema({
    volume: Number,
    count: Number,
    id: {
        type: String,
        index: true,
    },
    name: String,
    image: String,
    recentSales: [],
});
//# sourceMappingURL=selling.top.schema.js.map