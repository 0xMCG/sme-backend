import { Injectable, OnModuleInit } from '@nestjs/common';
import { EtherProvider } from 'src/lib/ether.provider';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OrderService } from 'src/order/order.service';
import { OrderStatus } from 'src/order/types';

@Injectable()
export class ContractEventSubscribeService implements OnModuleInit {
  private blockNumber;
  private readonly eventOrdersMatched = 'OrdersMatched';
  private readonly eventOrdersCancelled = 'OrdersCancelled';


  constructor(
    private readonly etherProvider: EtherProvider,
    private readonly orderService: OrderService,
  ) {
    this.blockNumber = 0;
  }

  onModuleInit() {
    this.etherProvider
      .getContract()
      .on('OrderCancelled', (event) => {
        console.log('Get OrderCancelled event data:', event.args);
      })
      .on('OrdersMatched', (event) => {
        console.log('Get OrdersMatched event data:', event.args);
      });
  }

  @Cron(CronExpression.EVERY_10_SECONDS) // Cron expression (e.g., every hour)
  handleCron() {
    console.log('Running cron job every 10 seconds');
    if (this.blockNumber === 0) {
      //TODO: Get last block from db

      this.blockNumber = 4092331;
    }

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
        //TODO: save current block to db
      });
  }

  handleOrderMatched(orderHash: string) {
    this.orderService.updateOrderStatus(orderHash, OrderStatus.MATCHED);
  }

  handleOrderCancelled(orderHash: string) {
    this.orderService.updateOrderStatus(orderHash, OrderStatus.CANCELLED);
  }
}
