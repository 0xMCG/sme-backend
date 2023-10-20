import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { EtherProvider } from '../lib/ether.provider';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OrderService } from '../order/order.service';
import { OrderEntry, OrderStatus, OrderType } from '../order/types';
import { BlockService } from '../block/block.service';
import { MutexManager } from './MutexManager';
import { TransactionService } from '../transaction/transaction.service';
import { ethers } from 'ethers';
import { Seaport } from '@opensea/seaport-js';
import { CreateOrderDto } from '../order/dto/create-order.dto';

const testERC20Address = "0x8D4E2c8bc6b1E4Fa0ED829E6786E9096dd6DC265"
const testERC20Address2 = "0x6c877a0f432feaab6052d8cc4ae2cf3d686d589f"

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
    private readonly transactionService: TransactionService,
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

  @Cron(CronExpression.EVERY_MINUTE) // Cron expression (e.g., every hour)
  async handleHistoryBlockCron() {
    const seaportContract = this.etherProvider.getSeaportContract();
    const provider = this.etherProvider.getProvider();

    let filter = seaportContract.filters.OrdersMatched();
    let filterLog = {
      fromBlock : 0,
      toBlock : 'latest',
      topics : filter.topics
    }
    provider.getLogs(filterLog).then((result) => {
      console.log('result:::', result.length);
      for (const res of result) {
        const event = seaportContract.interface.parseLog(res);
        if (event && event.name === this.eventOrdersMatched) {
          // console.log('event::', event)
          const hashes = event.args['orderHashes'] as [];
          for (const hash of hashes) {
            this.handleOrderMatched(hash);
          }
        }
      }
    }).catch(console.error)

    // let eventsWith = await seaportContract.queryFilter(filterLog);
    // console.log(eventsWith);
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

  // @Cron(CronExpression.EVERY_10_SECONDS)
  async handleLastBlockCron() {
    const release = await this.mutexManager.acquireLock();

    const markerOrder = await this.build_maker_order_for_bid();

    console.log('markerOrder::::', markerOrder);

    let entry2Save: CreateOrderDto = new CreateOrderDto();
    entry2Save.hash = markerOrder.hash;
    entry2Save.entry = markerOrder.order as unknown as OrderEntry;
    entry2Save.type = OrderType.INITIAL;

    this.orderService.create(entry2Save);

    release();
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
    this.transactionService.updateTransactionStatus(orderHash, OrderStatus.MATCHED);
    this.orderService.updateOrderStatus(orderHash, OrderStatus.MATCHED);
  }

  handleOrderCancelled(orderHash: string) {
    this.orderService.updateOrderStatus(orderHash, OrderStatus.CANCELLED);
  }

  async build_maker_order_for_bid() {

    const CONDUIT_KEYS_TO_CONDUIT = {
      '0x28c73a60ccf8c66c14eba8935984e616df2926e3aaaaaaaaaaaaaaaaaaaaaa00':
        '0x0681bc8f138ca32ed7725b91e8d11cfb6e10eb5f',
    };
    // const privateKey = process.env["MAKER"] as string;
    const Signer = new ethers.Wallet('f4ca61bd2d1de03ecc52eeba0d28fda8eccf990692254de9811d538e0bdb0bdb', this.etherProvider.getProvider());

    const seaport = new Seaport(Signer, {
      overrides: { contractAddress: '0xd3B2C0B21D63e8b9701c0daFFaADf3d05A642415' },
      conduitKeyToConduit: CONDUIT_KEYS_TO_CONDUIT,
    });
    const offerer = '0x28c73A60ccF8c66c14EbA8935984e616Df2926e3';
    const { executeAllActions } = await seaport.createOrder(
      {
        zone: '0x0000000000000000000000000000000000000000',
        conduitKey:
          '0x28c73a60ccf8c66c14eba8935984e616df2926e3aaaaaaaaaaaaaaaaaaaaaa00',
        startTime: Math.floor(new Date().getTime() / 1000 - 60 * 60).toString(),
        endTime: Math.floor(new Date().getTime() / 1000 + 60 * 60 * 24 * 7).toString(),
        offer: [
          {
            amount: ethers.utils.parseEther('0.002').toString(),
            token: testERC20Address2,
            endAmount: ethers.utils.parseEther('0.004').toString(),
          },
        ],
        consideration: [
          {
            amount: ethers.utils.parseEther('0.00002').toString(),
            token: testERC20Address,
            endAmount: ethers.utils.parseEther('0.00002').toString(),
            recipient: offerer,
          },
        ],
      },
      offerer,
    );

    const order = await executeAllActions();
    const hash = seaport.getOrderHash(order.parameters);
    return { order, hash };
  }
}
