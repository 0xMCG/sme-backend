import { Injectable } from '@nestjs/common';
import { EtherProvider } from '../lib/ether.provider';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MutexManager } from './MutexManager';
import { ConfigService } from '@nestjs/config';
import { SeaportProvider } from '../lib/seaport.provider';
import { TaskPublisher } from '../task/task.publisher';
import { MapContainer } from '../map.container';
import { ethers } from 'ethers';
import { sleep, WebSocketClient } from '../websocket/websocket.client';
import { TaskContainer } from '../task.container';

@Injectable()
export class ContractEventSubscribeService {
  private blockNumber;
  private readonly eventOrdersMatched = 'OrdersMatched';
  private readonly eventOrdersCancelled = 'OrdersCancelled';
  static instance: any;

  constructor(
      private readonly seaportProvider: SeaportProvider,
      private readonly etherProvider: EtherProvider,
      private readonly mutexManager: MutexManager,
      private configService: ConfigService,
      private readonly mapContainer: MapContainer,
      private readonly taskPublisher: TaskPublisher,
      private readonly webSocketClient: WebSocketClient,
      private readonly taskContainer: TaskContainer,
  ) {
    if (ContractEventSubscribeService.instance) {
      return ContractEventSubscribeService.instance;
    }
    // this.blockNumber = this.configService.get('START_BLOCK');
    // this.blockNumber = 4461746;
    this.blockNumber = 4481233;

    ContractEventSubscribeService.instance = this;
  }

  // async onModuleInit() {
  //   // const block = 4092331;
  //   this.etherProvider
  //     .getContract()
  //     .on('OrderCancelled', (event) => {
  //       console.log('Get OrderCancelled event data:', event.args);
  //     })
  //     .on('OrdersMatched', (event) => {
  //       console.log('Get OrdersMatched event data:', event.args);
  //     });
  // }

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
    //             if (log.address != '0xC619D985a88e341B618C23a543B8Efe2c55D1b37') {
    //               continue;
    //             }
    //             try {
    //               const event = this.etherProvider
    //               .getContract()
    //               .interface.parseLog(log);
    //               if (event && event.name === 'ReturnedRandomness') {
    //                 const randomWords = event.args['randomWords'].map(e => ethers.BigNumber.from(e).toString());
    //                 const requestId = event.args['requestId'].toString();
    //                 console.log('randomWords:::', randomWords);
    //                 console.log('requestId:::', requestId);
    //                 const isExist = this.mapContainer.get(requestId);
    //                 if (isExist) {
    //                   isExist.randomWords = randomWords;
    //                   this.mapContainer.set(requestId, isExist);
    //                 } else {
    //                   this.mapContainer.set(requestId, {
    //                     randomWords
    //                   })
    //                 }
    //                 console.log('', this.mapContainer)
    //                 console.log('Task publisher 推送消息')
    //                 this.taskPublisher.emitTaskEvent({
    //                   requestId,
    //                   takerOrder: [],
    //                   makerOrder: [],
    //                   premiumOrder: [],
    //                   randomWords: randomWords
    //                 })
    //               }
    //             } catch (error) {
    //               console.log('get tx result error::::', error.message)
    //             }
    //           }
    //         })
    //         .catch((error) => {
    //           // console.error('Get transaction data error', error.message);
    //           release();
    //         });
    //     });
    //   })
    //   .catch((error) => {
    //     console.error('Get block error:', this.blockNumber, error);
    //     --this.blockNumber;
    //     release();
    //     // this.blockService.update(this._blockDBId, this.blockNumber);
    //   });
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleLastBlockCron() {
    // if (this.mapContainer.size() === 0) return;

    // const release = await this.mutexManager.acquireLock();

    const firstRequestId = this.mapContainer.getFirstKey();

    const vrfContract = this.etherProvider.getVrfContract();
    const provider = this.etherProvider.getProvider();

    let filter = vrfContract.filters.ReturnedRandomness();
    let filterLog = {
      fromBlock: 3856444,
      toBlock: 'latest',
      topics: filter.topics
    }
    provider.getLogs(filterLog).then((result) => {
      // console.log('result:::', result);
      for (const res of result) {
        const event = vrfContract.interface.parseLog(res);
        // console.log('event::', event)
        if (event && event.name === 'ReturnedRandomness') {
          const randomWords = event.args['randomWords'].map((e) =>
              ethers.BigNumber.from(e).toString(),
          );
          const requestId = event.args['requestId'].toString();
          // console.log('randomWords:::', randomWords);
          // console.log('requestId:::', requestId);
          if (firstRequestId === requestId) {
            const isExist = this.mapContainer.get(requestId);
            if (isExist) {
              isExist.randomWords = randomWords;
              this.mapContainer.set(requestId, isExist);
              this.taskPublisher.emitTaskEvent({
                requestId,
                takerOrder: isExist.takerOrders,
                makerOrder: isExist.makerOrders,
                randomStrategy: isExist.randomStrategy,
                premiumOrder: [],
                randomWords: randomWords,
                modeOrderFulfillments: isExist.modeOrderFulfillments,
              });
            } else {
              this.mapContainer.set(requestId, {
                randomWords,
              });
            }
            this.mapContainer.delete(requestId);
          }
        }
      }
    }).catch(console.error)
  }

  // 每30秒从集合里拿对应的订单执行prepare交易
  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleTask() {
    console.log('this.taskContainer.size():::', this.taskContainer.size())
    if (this.taskContainer.size() === 0) return;
    const release = await this.mutexManager.acquireLock();
    const key = this.taskContainer.getFirstKey();

    const { makerOrders, takerOrders, randomNumberCount, randomStrategy, modeOrderFulfillments, orderHashes } = this.taskContainer.get(key);
    this.taskContainer.delete(key);
    const contract = this.seaportProvider.getContract();

    try {
      const result = await contract.prepare(
          [...makerOrders, ...takerOrders],
          // premiumOrder在前面数组的下标
          [],
          [],
          // 2个随机数
          randomNumberCount,
          { gasLimit: 1000000 },
      );

      console.log('result.hash:::', result.hash);

      let receipt = null;

      let retryCount = 0;

      while (result.hash && receipt === null && retryCount < 20) {
        console.log('123 retryCount: ', retryCount);
        retryCount++;
        receipt = await this.etherProvider
            .getProvider()
            .getTransactionReceipt(result.hash);
        await sleep(6000); // 等待6秒后继续检查交易确认
      }

      console.log('receipt:::', receipt);

      if (receipt && receipt.status) {
        for (const log of receipt.logs || []) {
          if (log.address != '0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625') {
            continue;
          }
          const event = this.seaportProvider
              .getTestContract()
              .interface.parseLog(log);
          if (event && event.name === 'RandomWordsRequested') {
            const requestId = event.args['requestId']?.toString();
            console.log('requestId:::', requestId);

            this.mapContainer.set(requestId, {
              makerOrders,
              takerOrders,
              randomStrategy,
              modeOrderFulfillments,
            });

            this.webSocketClient.sendPrepareMessage(
                JSON.stringify({
                  key,
                  value: {
                    status: true,
                    data: {
                      requestId,
                      orderHashes
                    }
                  }
                }),
            );
          }
        }
      } else {
        this.webSocketClient.sendPrepareMessage(
            JSON.stringify({
              key,
              value: {
                status: false,
                data: 'Send tx failed'
              }
            }),
        );
      }

    } catch (error) {
      console.error(error);
      this.webSocketClient.sendPrepareMessage(
          JSON.stringify({
            key,
            value: {
              status: false,
              data: error.message
            },
          }),
      );
    } finally {
      release();
    }
  }

}
