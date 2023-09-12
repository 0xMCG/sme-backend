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
exports.BlockService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
let BlockService = exports.BlockService = class BlockService {
    constructor(blockSchema) {
        this.blockSchema = blockSchema;
    }
    create(blockNumber) {
        const model = new this.blockSchema({
            last: blockNumber,
        });
        return model.save();
    }
    findOne() {
        return this.blockSchema.findOne({}).exec();
    }
    update(id, block) {
        return this.blockSchema
            .updateOne({ _id: id }, {
            $set: { last: block },
        })
            .exec();
    }
};
exports.BlockService = BlockService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Block')),
    __metadata("design:paramtypes", [Object])
], BlockService);
//# sourceMappingURL=block.service.js.map