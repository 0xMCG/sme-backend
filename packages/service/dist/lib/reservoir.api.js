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
exports.ReservoirApi = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const api_1 = require("api");
let ReservoirApi = exports.ReservoirApi = class ReservoirApi {
    constructor(configService) {
        this.configService = configService;
    }
    async getCollectionsTopsellingV1() {
        const apiKey = this.configService.get('RESERVOIR_API_KEY');
        const sdk = (0, api_1.default)('@reservoirprotocol/v3.0#2n2re32lkmyg6l7');
        sdk.auth(apiKey);
        const response = await sdk.getCollectionsTopsellingV1({ accept: '*/*' });
        return response?.data?.collections;
    }
    async getCollectionsV6() {
        const apiKey = this.configService.get('RESERVOIR_API_KEY');
        const sdk = (0, api_1.default)('@reservoirprotocol/v3.0#2n2re32lkmyg6l7');
        sdk.auth(apiKey);
        const response = await sdk.getCollectionsV6({ accept: '*/*' });
        return response?.data?.collections;
    }
};
exports.ReservoirApi = ReservoirApi = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ReservoirApi);
//# sourceMappingURL=reservoir.api.js.map