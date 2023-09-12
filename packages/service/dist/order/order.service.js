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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const seaport_provider_1 = require("../lib/seaport.provider");
const types_1 = require("./types");
let OrderService = exports.OrderService = class OrderService {
    constructor(orderModel, seaportProvider) {
        this.orderModel = orderModel;
        this.seaportProvider = seaportProvider;
    }
    async create(createOrderDto) {
        if (createOrderDto.entry.parameters.offer.length == 0 &&
            createOrderDto.entry.parameters.consideration.length == 0) {
            throw new common_1.HttpException('offer and consideration cannot be empty at the same time', common_1.HttpStatus.BAD_REQUEST);
        }
        const ifExist = await this.orderModel
            .find({ hash: createOrderDto.hash })
            .limit(1)
            .exec();
        if (ifExist.length != 0)
            throw new common_1.HttpException('Order already exist', common_1.HttpStatus.BAD_REQUEST);
        const model = new this.orderModel(createOrderDto);
        return await model.save();
    }
    async findAll() {
        const current_timestamp = new Date().getTime() / 1000;
        return await this.orderModel
            .find({
            'entry.parameters.endTime': {
                $gte: current_timestamp.toString(),
            },
            status: {
                $nin: [types_1.OrderStatus.CANCELLED, types_1.OrderStatus.MATCHED],
            },
        })
            .exec();
    }
    async findOne(hash) {
        return await this.orderModel.find({ hash: hash }).limit(1).exec();
    }
    async deleteOne(hash) {
        return this.orderModel.deleteOne({ hash: hash }).exec();
    }
    async updateOrderStatus(hash, status) {
        return this.orderModel
            .updateOne({ hash }, {
            $set: { status },
        })
            .exec();
    }
};
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Order')),
    __metadata("design:paramtypes", [Object, seaport_provider_1.SeaportProvider])
], OrderService);
//# sourceMappingURL=order.service.js.map