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
exports.ContractEventSubscribeService = void 0;
const common_1 = require("@nestjs/common");
const ether_provider_1 = require("../lib/ether.provider");
const schedule_1 = require("@nestjs/schedule");
const order_service_1 = require("../order/order.service");
const types_1 = require("../order/types");
const block_service_1 = require("../block/block.service");
const MutexManager_1 = require("./MutexManager");
let ContractEventSubscribeService = exports.ContractEventSubscribeService = class ContractEventSubscribeService {
    constructor(etherProvider, orderService, mutexManager, blockService) {
        this.etherProvider = etherProvider;
        this.orderService = orderService;
        this.mutexManager = mutexManager;
        this.blockService = blockService;
        this.eventOrdersMatched = 'OrdersMatched';
        this.eventOrdersCancelled = 'OrdersCancelled';
        this.blockNumber = 0;
    }
    async onApplicationShutdown(signal) {
        await this.blockService.update(this._blockDBId, this.blockNumber);
        process.exit(0);
    }
    async onModuleInit() {
        const block = await this.blockService.findOne();
        if (!block) {
            const result = await this.blockService.create(4092331);
            this._blockDBId = result._id;
            this.blockNumber = result.last;
        }
        else {
            this.blockNumber = block.last;
            this._blockDBId = block._id;
        }
        this.etherProvider
            .getContract()
            .on('OrderCancelled', (event) => {
            console.log('Get OrderCancelled event data:', event.args);
        })
            .on('OrdersMatched', (event) => {
            console.log('Get OrdersMatched event data:', event.args);
        });
    }
    async handleHistoryBlockCron() {
        const release = await this.mutexManager.acquireLock();
        console.log('Running get history block cron job every 10 seconds, current block: ', this.blockNumber);
        this.etherProvider
            .getProvider()
            .getBlockWithTransactions(this.blockNumber)
            .then((block) => {
            this.blockNumber++;
            release();
            const transactions = block.transactions;
            transactions.forEach((tx) => {
                tx.wait()
                    .then((receipt) => {
                    for (const log of receipt.logs || []) {
                        if (log.address != this.etherProvider.getContract().address) {
                            continue;
                        }
                        const event = this.etherProvider
                            .getContract()
                            .interface.parseLog(log);
                        if (event && event.name === this.eventOrdersMatched) {
                            const hashes = event.args['orderHashes'];
                            for (const hash of hashes) {
                                this.handleOrderMatched(hash);
                            }
                        }
                        if (event && event.name === this.eventOrdersCancelled) {
                            console.log('event.args', event.args);
                        }
                    }
                })
                    .catch((_) => {
                    release();
                });
            });
        })
            .catch((error) => {
            console.error('Get block error:', this.blockNumber, error);
            --this.blockNumber;
            release();
            this.blockService.update(this._blockDBId, this.blockNumber);
        });
    }
    async handleLastBlockCron() {
        const lastBlockNumber = await this.etherProvider
            .getProvider()
            .getBlockNumber();
        console.log('Get last block cron, last block number', lastBlockNumber);
        this.etherProvider
            .getProvider()
            .getBlockWithTransactions(lastBlockNumber)
            .then((block) => {
            const transactions = block.transactions;
            transactions.forEach((tx) => {
                tx.wait()
                    .then((receipt) => {
                    for (const log of receipt.logs || []) {
                        if (log.address != this.etherProvider.getContract().address) {
                            continue;
                        }
                        const event = this.etherProvider
                            .getContract()
                            .interface.parseLog(log);
                        if (event && event.name === this.eventOrdersMatched) {
                            const hashes = event.args['orderHashes'];
                            for (const hash of hashes) {
                                this.handleOrderMatched(hash);
                            }
                        }
                        if (event && event.name === this.eventOrdersCancelled) {
                            console.log('event.args', event.args);
                        }
                    }
                })
                    .catch((_) => {
                });
            });
        })
            .catch((error) => {
            console.error('Get last block cron, get block error:', this.blockNumber, error);
        });
    }
    handleOrderMatched(orderHash) {
        this.orderService.updateOrderStatus(orderHash, types_1.OrderStatus.MATCHED);
    }
    handleOrderCancelled(orderHash) {
        this.orderService.updateOrderStatus(orderHash, types_1.OrderStatus.CANCELLED);
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContractEventSubscribeService.prototype, "handleHistoryBlockCron", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContractEventSubscribeService.prototype, "handleLastBlockCron", null);
exports.ContractEventSubscribeService = ContractEventSubscribeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ether_provider_1.EtherProvider,
        order_service_1.OrderService,
        MutexManager_1.MutexManager,
        block_service_1.BlockService])
], ContractEventSubscribeService);
//# sourceMappingURL=contractEventSubscribe.service.js.map