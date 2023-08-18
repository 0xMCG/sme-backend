import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { EtherProvider } from 'src/lib/ether.provider';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OrderService } from 'src/order/order.service';
import { OrderStatus } from 'src/order/types';
import { BlockService } from 'src/block/block.service';

@Injectable()
export class ContractEventSubscribeService implements OnModuleInit, OnApplicationShutdown  {
  private blockNumber;
  private _blockDBId;
  private readonly eventOrdersMatched = 'OrdersMatched';
  private readonly eventOrdersCancelled = 'OrdersCancelled';

  constructor(
    private readonly etherProvider: EtherProvider,
    private readonly orderService: OrderService,
    private readonly blockService: BlockService,
  ) {
    this.blockNumber = 0;
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
    this.etherProvider
      .getContract()
      .on('OrderCancelled', (event) => {
        console.log('Get OrderCancelled event data:', event.args);
      })
      .on('OrdersMatched', (event) => {
        console.log('Get OrdersMatched event data:', event.args);
      });
  }

  @Cron(CronExpression.EVERY_5_SECONDS) // Cron expression (e.g., every hour)
  handleCron() {
    console.log('Running cron job every 10 seconds');
    // if (this.blockNumber === 0) {
    //   //TODO: Get last block from db
    //   this.blockNumber = 4092331;
    // }

    console.log('this.blockNumber::', this.blockNumber);

    // Task logic to be executed on schedule
    this.etherProvider
      .getProvider()
      .getBlockWithTransactions(this.blockNumber)
      .then((block) => {
        this.blockNumber++;
        const transactions = block.transactions;

        transactions.forEach((tx) => {
          tx.wait()
            .then((receipt) => {
              // parse log
              for (const log of receipt.logs || []) {
                if (log.address != this.etherProvider.getContract().address) {
                  continue;
                }
                const event = this.etherProvider
                  .getContract()
                  .interface.parseLog(log);
                if (event && event.name === this.eventOrdersMatched) {
                  const hashes = event.args['orderHashes'] as [];
                  for (const hash of hashes) {
                    this.handleOrderMatched(hash);
                  }
                }
                if (event && event.name === this.eventOrdersCancelled) {
                  // TODO: Get cancelled event args
                  console.log('event.args', event.args);
                }
              }
            })
            .catch((_) => {
              console.error('Get transaction data error');
            });
        });
      })
      .catch((error) => {
        console.error('Get block error:', error);
        --this.blockNumber;
        //TODO: save current block to db
        this.blockService.update(this._blockDBId, this.blockNumber)
      });
  }

  handleOrderMatched(orderHash: string) {
    this.orderService.updateOrderStatus(orderHash, OrderStatus.MATCHED);
  }

  handleOrderCancelled(orderHash: string) {
    this.orderService.updateOrderStatus(orderHash, OrderStatus.CANCELLED);
  }
}
