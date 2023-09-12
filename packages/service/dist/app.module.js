"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const order_module_1 = require("./order/order.module");
const collection_module_1 = require("./collection/collection.module");
const subscribe_module_1 = require("./subscriber/subscribe.module");
const block_module_1 = require("./block/block.module");
const contractEventSubscribe_service_1 = require("./subscriber/contractEventSubscribe.service");
const ether_provider_1 = require("./lib/ether.provider");
const block_service_1 = require("./block/block.service");
const order_schema_1 = require("./order/schema/order.schema");
const block_schema_1 = require("./block/schema/block.schema");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => {
                    return {
                        uri: configService.get('DB_HOST', 'localhost'),
                        user: configService.get('DB_USER', 'admin'),
                        pass: configService.get('DB_PASS', 'admin'),
                        dbName: configService.get('DB_NAME', 'admin'),
                    };
                },
            }),
            mongoose_1.MongooseModule.forFeature([
                { name: 'Order', schema: order_schema_1.OrderSchema },
                { name: 'Block', schema: block_schema_1.BlockSchema },
            ]),
            order_module_1.OrderModule,
            collection_module_1.CollectionModule,
            subscribe_module_1.SubscribeModule,
            block_module_1.BlockModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            contractEventSubscribe_service_1.ContractEventSubscribeService,
            ether_provider_1.EtherProvider,
            block_service_1.BlockService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map