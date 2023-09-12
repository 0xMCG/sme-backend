import { OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { EtherProvider } from '../lib/ether.provider';
import { OrderService } from '../order/order.service';
import { BlockService } from '../block/block.service';
import { MutexManager } from './MutexManager';
export declare class ContractEventSubscribeService implements OnModuleInit, OnApplicationShutdown {
    private readonly etherProvider;
    private readonly orderService;
    private readonly mutexManager;
    private readonly blockService;
    private blockNumber;
    private _blockDBId;
    private readonly eventOrdersMatched;
    private readonly eventOrdersCancelled;
    constructor(etherProvider: EtherProvider, orderService: OrderService, mutexManager: MutexManager, blockService: BlockService);
    onApplicationShutdown(signal?: string): Promise<void>;
    onModuleInit(): Promise<void>;
    handleHistoryBlockCron(): Promise<void>;
    handleLastBlockCron(): Promise<void>;
    handleOrderMatched(orderHash: string): void;
    handleOrderCancelled(orderHash: string): void;
}
