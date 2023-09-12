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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = exports.OrderEntry = exports.Consideration = exports.Offer = void 0;
const swagger_1 = require("@nestjs/swagger");
class Offer {
}
exports.Offer = Offer;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Offer.prototype, "itemType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Offer.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Offer.prototype, "identifierOrCriteria", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Offer.prototype, "startAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Offer.prototype, "endAmount", void 0);
class Consideration {
}
exports.Consideration = Consideration;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Consideration.prototype, "itemType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Consideration.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Consideration.prototype, "identifierOrCriteria", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Consideration.prototype, "startAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Consideration.prototype, "endAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Consideration.prototype, "recipient", void 0);
class OrderParameter {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OrderParameter.prototype, "offerer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OrderParameter.prototype, "zone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OrderParameter.prototype, "zoneHash", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OrderParameter.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OrderParameter.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], OrderParameter.prototype, "orderType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: (Array),
    }),
    __metadata("design:type", Array)
], OrderParameter.prototype, "offer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: (Array),
    }),
    __metadata("design:type", Array)
], OrderParameter.prototype, "consideration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], OrderParameter.prototype, "totalOriginalConsiderationItems", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OrderParameter.prototype, "salt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OrderParameter.prototype, "conduitKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OrderParameter.prototype, "counter", void 0);
class OrderEntry {
}
exports.OrderEntry = OrderEntry;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: OrderParameter,
    }),
    __metadata("design:type", OrderParameter)
], OrderEntry.prototype, "parameters", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OrderEntry.prototype, "signature", void 0);
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["CANCELLED"] = "Cancelled";
    OrderStatus["MATCHED"] = "Matched";
    OrderStatus["VALID"] = "Valid";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
//# sourceMappingURL=index.js.map