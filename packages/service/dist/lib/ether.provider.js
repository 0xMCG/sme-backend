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
exports.EtherProvider = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const ethers_1 = require("ethers");
const Seaport_vSME_1 = require("../abi/Seaport_vSME");
let EtherProvider = exports.EtherProvider = class EtherProvider {
    constructor(configService) {
        this.configService = configService;
        this.provider = new ethers_1.ethers.providers.JsonRpcProvider(this.configService.get('RPC_PROVIDER'));
        this.smeSeaportAddress = '0x9c1687C953Fff856e244A152995B96e569C4762A';
        this.contract = new ethers_1.ethers.Contract(this.smeSeaportAddress, Seaport_vSME_1.SeaportABIvSME, this.provider);
    }
    getProvider() {
        return this.provider;
    }
    getContract() {
        return this.contract;
    }
    getContractAddress() {
        return this.smeSeaportAddress;
    }
};
exports.EtherProvider = EtherProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EtherProvider);
//# sourceMappingURL=ether.provider.js.map