import { Injectable } from '@nestjs/common';
import { EtherProvider } from '../lib/ether.provider';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MutexManager } from './MutexManager';
import { ConfigService } from '@nestjs/config';
import { SeaportProvider } from '../lib/seaport.provider';
import { TaskPublisher } from '../task/task.publisher';
import { MapContainer } from '../map.container';
import { ethers } from 'ethers';

@Injectable()
export class ContractEventSubscribeService {
  private blockNumber;
  private readonly eventOrdersMatched = 'OrdersMatched';
  private readonly eventOrdersCancelled = 'OrdersCancelled';
  static instance: any;

  constructor(
    private readonly etherProvider: EtherProvider,
    private readonly mutexManager: MutexManager,
    private configService: ConfigService,
    private readonly mapContainer: MapContainer,
    private readonly taskPublisher: TaskPublisher,
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
          // console.log('', this.mapContainer);
        }
      }
    }).catch(console.error)

    // const lastBlockNumber = await this.etherProvider
    //   .getProvider()
    //   .getBlockNumber();
    // console.log('Get last block cron, last block number', lastBlockNumber);
    // this.etherProvider
    //   .getProvider()
    //   .getBlockWithTransactions(lastBlockNumber)
    //   .then((block) => {
    //     release();
    //     const transactions = block.transactions;
    //     transactions.forEach((tx) => {
    //       tx.wait()
    //         .then((receipt) => {
    //           // parse log
    //           for (const log of receipt.logs || []) {
    //             if (
    //               log.address != '0xC619D985a88e341B618C23a543B8Efe2c55D1b37'
    //             ) {
    //               continue;
    //             }
    //             try {
    //               const event = this.etherProvider
    //                 .getContract()
    //                 .interface.parseLog(log);

    //               if (event && event.name === 'ReturnedRandomness') {
    //                 const randomWords = event.args['randomWords'].map((e) =>
    //                   ethers.BigNumber.from(e).toString(),
    //                 );
    //                 const requestId = event.args['requestId'].toString();
    //                 console.log('randomWords:::', randomWords);
    //                 console.log('requestId:::', requestId);

    //                 const isExist = this.mapContainer.get(requestId);
    //                 if (isExist) {
    //                   isExist.randomWords = randomWords;
    //                   this.mapContainer.set(requestId, isExist);
    //                   this.taskPublisher.emitTaskEvent({
    //                     requestId,
    //                     takerOrder: isExist.takerOrders,
    //                     makerOrder: isExist.makerOrders,
    //                     randomStrategy: isExist.randomStrategy,
    //                     premiumOrder: [],
    //                     randomWords: randomWords,
    //                     modeOrderFulfillments: isExist.modeOrderFulfillments,
    //                   });
    //                 } else {
    //                   this.mapContainer.set(requestId, {
    //                     randomWords,
    //                   });
    //                 }

    //                 this.mapContainer.delete(requestId);
    //                 console.log('', this.mapContainer);
    //                 // this.taskPublisher.emitTaskEvent({
    //                 //   requestId,
    //                 //   takerOrder: [],
    //                 //   makerOrder: [],
    //                 //   premiumOrder: [],
    //                 //   randomWords: randomWords
    //                 // })
    //               }
    //             } catch (error) {
    //               console.log('get receipt error ::::', error.message);
    //             }
    //           }
    //         })
    //         .catch((error) => {
    //           // console.error('Get transaction data error', error.message);
    //         });
    //     });
    //   })
    //   .catch((error) => {
    //     release();
    //     console.error(
    //       'Get last block cron, get block error:',
    //       this.blockNumber,
    //       error,
    //     );
    //   });
  }
}
