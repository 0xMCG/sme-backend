"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionService = void 0;
const common_1 = require("@nestjs/common");
const reservoir_api_1 = require("../lib/reservoir.api");
const mongoose_1 = require("@nestjs/mongoose");
let CollectionService = exports.CollectionService = class CollectionService {
    constructor(reservoirApi, hotTopSchema, sellingTopSchema) {
        this.reservoirApi = reservoirApi;
        this.hotTopSchema = hotTopSchema;
        this.sellingTopSchema = sellingTopSchema;
    }
    create(createCollectionDto) {
        return 'This action adds a new collection';
    }
    sellingTop() {
        return this.sellingTopSchema.find({}).limit(20).exec();
    }
    hotTop() {
        return this.hotTopSchema.find({}).limit(20).exec();
    }
    findAll() {
        return `This action returns all collection`;
    }
    findOne(id) {
        return this.hotTopSchema.findOne({ id }).exec();
    }
};
exports.CollectionService = CollectionService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)('HotTop')),
    __param(2, (0, mongoose_1.InjectModel)('SellingTop')),
    __metadata("design:paramtypes", [reservoir_api_1.ReservoirApi, Object, Object])
], CollectionService);
//# sourceMappingURL=collection.service.js.map