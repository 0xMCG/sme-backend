import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { EtherProvider } from '../lib/ether.provider';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OrderService } from '../order/order.service';
import { OrderStatus } from '../order/types';
import { BlockService } from '../block/block.service';
import { MutexManager } from './MutexManager';

@Injectable()
export class ContractEventSubscribeService
  implements OnModuleInit, OnApplicationShutdown
{
  private blockNumber;
  private _blockDBId;
  private readonly eventOrdersMatched = 'OrdersMatched';
  private readonly eventOrdersCancelled = 'OrdersCancelled';
  static instance: any;

  constructor(
    private readonly etherProvider: EtherProvider,
    private readonly orderService: OrderService,
    private readonly mutexManager: MutexManager,
    private readonly blockService: BlockService,
  ) {
    this.blockNumber = 0;

    if (ContractEventSubscribeService.instance) {
      return ContractEventSubscribeService.instance;
    }

    ContractEventSubscribeService.instance = this;
  }

  async onApplicationShutdown(signal?: string) {
    // save the current block to db when application shutdown
    await this.blockService.update(this._blockDBId, this.blockNumber);
    process.exit(0);
  }

  async onModuleInit() {
    const block = await this.blockService.findOne();
    if (!block) {
      const result = await this.blockService.create(4092331);
      this._blockDBId = result._id;
      this.blockNumber = result.last;
    } else {
      this.blockNumber = block.last;
      this._blockDBId = block._id;
    }
    // this.etherProvider
    //   .getContract()
    //   .on('OrderCancelled', (event) => {
    //     console.log('Get OrderCancelled event data:', event.args);
    //   })
    //   .on('OrdersMatched', (event) => {
    //     console.log('Get OrdersMatched event data:', event.args);
    //   });
  }

  @Cron(CronExpression.EVERY_10_SECONDS) // Cron expression (e.g., every hour)
  async handleHistoryBlockCron() {
    // const release = await this.mutexManager.acquireLock();

    // console.log(
    //   'Running get history block cron job every 10 seconds, current block: ',
    //   this.blockNumber,
    // );

    // // Task logic to be executed on schedule
    // this.etherProvider
    //   .getProvider()
    //   .getBlockWithTransactions(this.blockNumber)
    //   .then((block) => {
    //     this.blockNumber++;
    //     release();
    //     const transactions = block.transactions;
    //     transactions.forEach((tx) => {
    //       tx.wait()
    //         .then((receipt) => {
    //           // parse log
    //           for (const log of receipt.logs || []) {
    //             if (log.address != this.etherProvider.getContract().address) {
    //               continue;
    //             }
    //             const event = this.etherProvider
    //               .getContract()
    //               .interface.parseLog(log);
    //             if (event && event.name === this.eventOrdersMatched) {
    //               const hashes = event.args['orderHashes'] as [];
    //               for (const hash of hashes) {
    //                 this.handleOrderMatched(hash);
    //               }
    //             }
    //             if (event && event.name === this.eventOrdersCancelled) {
    //               // TODO: Get cancelled event args
    //               console.log('event.args', event.args);
    //             }
    //           }
    //         })
    //         .catch((_) => {
    //           // console.error('Get transaction data error');
    //           release();
    //         });
    //     });
    //   })
    //   .catch((error) => {
    //     console.error('Get block error:', this.blockNumber, error);
    //     --this.blockNumber;
    //     release();
    //     this.blockService.update(this._blockDBId, this.blockNumber);
    //   });
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleLastBlockCron() {
    // const lastBlockNumber = await this.etherProvider
    //   .getProvider()
    //   .getBlockNumber();

    // console.log('Get last block cron, last block number', lastBlockNumber);
    // this.etherProvider
    //   .getProvider()
    //   .getBlockWithTransactions(lastBlockNumber)
    //   .then((block) => {
    //     const transactions = block.transactions;
    //     transactions.forEach((tx) => {
    //       tx.wait()
    //         .then((receipt) => {
    //           // parse log
    //           for (const log of receipt.logs || []) {
    //             if (log.address != this.etherProvider.getContract().address) {
    //               continue;
    //             }
    //             const event = this.etherProvider
    //               .getContract()
    //               .interface.parseLog(log);
    //             if (event && event.name === this.eventOrdersMatched) {
    //               const hashes = event.args['orderHashes'] as [];
    //               for (const hash of hashes) {
    //                 this.handleOrderMatched(hash);
    //               }
    //             }
    //             if (event && event.name === this.eventOrdersCancelled) {
    //               // TODO: Get cancelled event args
    //               console.log('event.args', event.args);
    //             }
    //           }
    //         })
    //         .catch((_) => {
    //           // console.error('Get transaction data error');
    //         });
    //     });
    //   })
    //   .catch((error) => {
    //     console.error(
    //       'Get last block cron, get block error:',
    //       this.blockNumber,
    //       error,
    //     );
    //   });
  }

  handleOrderMatched(orderHash: string) {
    this.orderService.updateOrderStatus(orderHash, OrderStatus.MATCHED);
  }

  handleOrderCancelled(orderHash: string) {
    this.orderService.updateOrderStatus(orderHash, OrderStatus.CANCELLED);
  }
}
