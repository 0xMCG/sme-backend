import { Injectable, OnModuleInit } from '@nestjs/common';
import { EtherProvider } from 'src/lib/ether.provider';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class ContractEventSubscribeService implements OnModuleInit {
  private blockNumber;

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
        console.log('收到OrderCancelled事件数据:', event.args);
      })
      .on('OrdersMatched', (event) => {
        console.log('收到OrdersMatched事件数据:', event.args);
      });
  }

  @Cron(CronExpression.EVERY_10_SECONDS) // Cron expression (e.g., every hour)
  handleCron() {
    console.log('Running cron job every 10 seconds');
    if (this.blockNumber === 0) {
      //TODO: 从db中获取最后同步的区块

      this.blockNumber = 4092331;
    }

    console.log('this.blockNumber::', this.blockNumber);

    const eventName = 'OrdersMatched';
    // Task logic to be executed on schedule
    this.etherProvider
      .getProvider()
      .getBlockWithTransactions(this.blockNumber)
      .then((block) => {
        this.blockNumber++;
        const transactions = block.transactions;

        // 遍历交易，获取事件日志
        transactions.forEach((tx) => {
          tx.wait()
            .then((receipt) => {
              // 解析日志
              for (const log of receipt.logs || []) {
                if (log.address != this.etherProvider.getContract().address) {
                  continue;
                }
                const event = this.etherProvider
                  .getContract()
                  .interface.parseLog(log);
                if (event && event.name === eventName) {
                  console.log('event.args', event.args);
                }
              }
            })
            .catch((_) => {
              console.error('获取交易收据时出错');
            });
        });
      })
      .catch((error) => {
        console.error('获取块时出错:', error);
        //TODO: 将当前blocknumber存入db
      });
  }
}
