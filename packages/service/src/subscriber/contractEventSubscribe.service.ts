import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { EtherProvider } from '../lib/ether.provider';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OrderService } from '../order/order.service';
import { OrderEntry, OrderStatus, OrderType, TaskStatus } from '../order/types';
import { BlockService } from '../block/block.service';
import { MutexManager } from './MutexManager';
import { TransactionService } from '../transaction/transaction.service';
import {BigNumber, ethers} from 'ethers';
import { Seaport } from '@opensea/seaport-js';
import { CreateOrderDto } from '../order/dto/create-order.dto';
import { TaskService } from '../task/task.service';
import { SeaportProvider } from '../lib/seaport.provider';
import * as _ from 'lodash';

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
      private readonly seaportProvider: SeaportProvider,
      private readonly orderService: OrderService,
      private readonly transactionService: TransactionService,
      private readonly mutexManager: MutexManager,
      private readonly blockService: BlockService,
      private readonly taskService: TaskService,
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
    // const block = await this.blockService.findOne();
    // if (!block) {
    //   const result = await this.blockService.create(4092331);
    //   this._blockDBId = result._id;
    //   this.blockNumber = result.last;
    // } else {
    //   this.blockNumber = block.last;
    //   this._blockDBId = block._id;
    // }
    // this.etherProvider
    //   .getContract()
    //   .on('OrderCancelled', (event) => {
    //     console.log('Get OrderCancelled event data:', event.args);
    //   })
    //   .on('OrdersMatched', (event) => {
    //     console.log('Get OrdersMatched event data:', event.args);
    //   });
  }

  @Cron(CronExpression.EVERY_10_MINUTES) // Cron expression (e.g., every hour)
  async handleHistoryBlockCron() {
    const release = await this.mutexManager.acquireLock();

    const seaportContract = this.etherProvider.getSeaportContract();
    const provider = this.etherProvider.getProvider();

    let filterOrderMatched = seaportContract.filters.OrdersMatched();
    let filterMatchSuccessOrNot = seaportContract.filters.MatchSuccessOrNot();
    let filterOrderMatchedLog = {
      fromBlock : 0,
      toBlock : 'latest',
      topics : filterOrderMatched.topics
    }

    provider.getLogs(filterOrderMatchedLog).then((result) => {
      console.log('Order Matched result:::', result.length);
      for (const res of result) {
        const event = seaportContract.interface.parseLog(res);
        if (event && event.name === this.eventOrdersMatched) {
          // console.log('event::', event)
          const hashes = event.args['orderHashes'] as [];
          for (const hash of hashes) {
            this.handleOrderMatched(hash, event.transactionHash);
          }
        }
      }
    }).catch(console.error)

    let filterMatchSuccessOrNotLog = {
      fromBlock : 0,
      toBlock : 'latest',
      topics : filterMatchSuccessOrNot.topics
    }
    provider.getLogs(filterMatchSuccessOrNotLog).then((result) => {
      // console.log('result:::', result);
      for (const res of result) {
        const event = seaportContract.interface.parseLog(res);
        if (event && event.name === 'MatchSuccessOrNot') {
          const txHash = event.transactionHash;
          // console.log('event::', event)
          const requestId = event.args['requestId']?.toString();
          const isSuccess = event.args['isSuccess'];
          console.log('requestId:::', requestId);
          console.log('isSuccess:::', isSuccess);
          this.handleMatchSuccessOrNot(requestId, isSuccess, txHash);
        }
      }
    }).catch(console.error)
    release();
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleLastBlockCron() {
    const release = await this.mutexManager.acquireLock();
    // const markerOrder = await this.build_maker_order_for_bid();
    // console.log('markerOrder::::', markerOrder);
    // let entry2Save: CreateOrderDto = new CreateOrderDto();
    // entry2Save.hash = markerOrder.hash;
    // entry2Save.entry = markerOrder.order as unknown as OrderEntry;
    // entry2Save.type = OrderType.INITIAL;

    // console.log("````````````````````````",JSON.stringify(entry2Save))
    // this.orderService.create(entry2Save);
    await this.markerOrderAssetCheck('0x5fa5db05fc216552ba7d677781330913e11c4ec3de32c6b058421e05b9dd5de0')

    release();
  }

  async handleOrderMatched(orderHash: string, txHash: string) {
    await this.transactionService.updateTransactionStatus(orderHash, txHash, OrderStatus.MATCHED);
    const matchedTxHashList = await this.transactionService.findByOrderHash(orderHash, OrderStatus.MATCHED);
    if (matchedTxHashList.length > 0) {
      // 查询所有已match transaction, 计算分子与分母是否等于1,如果等于1说明该订单match
      if (this.calculateOrderFinished(matchedTxHashList)) {
        await this.orderService.updateOrderStatus(orderHash, OrderStatus.MATCHED);
      }
    }
  }

  calculateOrderFinished(txList: any[]): boolean {
    const length = txList.length
    if (length <= 0) {
      return false;
    } else if (length === 1) {
      return (txList[0].itemNumerator as number) === (txList[0].itemDenominator as number);
    } else {
      // TODO: 将所有的多个分子分母求结果
      let multiplyAll = 1;
      txList.forEach(i => {
        multiplyAll = multiplyAll * i.itemDenominator;
      })
      const numeratorSum = _(txList).map(i => i.itemNumerator * _.divide(multiplyAll, i.itemDenominator)).sum();
      return numeratorSum === multiplyAll;
    }
  }

  async markerOrderAssetCheck(orderHash: string) {
    const order = await this.orderService.findOne(orderHash);
    console.log("order::", order)
    const owner = order.entry.parameters.offerer;
    const item = order.entry.parameters.offer[0];
    const balance = await this.seaportProvider.testBalanceOf(owner, item);
    // 将剩余的offerer为owner的状态不为matched的订单,
    // 并且offer中的nft资产大于剩余的balance的订单设置为invalid的状态
    console.log('balance:::', balance?.toNumber())

    const res = await this.orderService
        .findInvalidOrder('0x89FC72d955C608dD412Fe65c5977c3c2872A6a81', '0x6E6267A4D7196Cf98c8094723772c755eb4dC108', 1);

    console.log('res:::', res)
  }

  handleOrderCancelled(orderHash: string) {
    this.orderService.updateOrderStatus(orderHash, OrderStatus.CANCELLED);
  }

  handleOrderFailed(orderHash: string) {
    this.orderService.updateOrderStatus(orderHash, OrderStatus.FAILED);
  }

  async handleMatchSuccessOrNot(requestId: string, isSuccess: boolean, txHash: string) {
    const ifExited = await this.taskService.findOne(requestId);
    console.log('ifExited:::', ifExited)
    if (ifExited) {
      if (isSuccess) {
        if (ifExited.status === TaskStatus.MATCHED) {
          // pass it
          if (ifExited.orderHashes && ifExited.orderHashes.length) {
            // for (const hash of ifExited.orderHashes) {
            //   this.handleOrderMatched(hash)
            // }
            for (let index = 0; index < ifExited.orderHashes.length; index++) {
              const hash = ifExited.orderHashes[index];

              // const hash = '0xbfdc09f3ccc50b0aa3b067ae4c586088fc6879c2667f8549c81750b00a2281ce'
              if (index !== ifExited.orderHashes.length -1) {
                // 最后一个hash为taker订单，不需要做offer的校验
                // const order = await this.orderService.findOne(hash);
                // const owner = order.entry.parameters.offer;
                // const item = order.entry.parameters.offerer[0];
                // const balance = await this.seaportProvider.testBalanceOf(owner, item)

              }
              await this.handleOrderMatched(hash, txHash)
            }
          }
        } else {
          // 1. 将requestId对应的task更新为成功
          this.taskService.update(ifExited.requestId, TaskStatus.MATCHED);
          // 2. 从task中找到requestId对应的hashes更新为成功状态
          if (ifExited.orderHashes && ifExited.orderHashes.length) {
            // for (const hash of ifExited.orderHashes) {
            //   this.handleOrderMatched(hash)
            // }
            for (let index = 0; index < ifExited.orderHashes.length; index++) {
              const hash = ifExited.orderHashes[index];
              if (index !== ifExited.orderHashes.length -1) {
                // 最后一个hash为taker订单，不需要做offer的校验
              }
              await this.handleOrderMatched(hash, txHash)
            }
          }
        }
      } else {
        // 3. 将requestId对应的task更新为失败
        this.taskService.update(ifExited.requestId, TaskStatus.FAILED);
        // 4. 从task中找到requestId对应的hashes更新为失败状态
        if (ifExited.orderHashes && ifExited.orderHashes.length) {
          // orderHashes中最后一个为takerOrder,只将takerOrder标记为无效,makerOrder可以继续成交
          await this.handleOrderFailed(ifExited.orderHashes[ifExited.orderHashes.length - 1])
        }
      }
    }
  }

  async build_maker_order_for_bid() {

    const CONDUIT_KEYS_TO_CONDUIT = {
      '0x28c73a60ccf8c66c14eba8935984e616df2926e3aaaaaaaaaaaaaaaaaaaaaa00':
          '0x0681bc8f138ca32ed7725b91e8d11cfb6e10eb5f',
    };
    // const privateKey = process.env["MAKER"] as string;
    const Signer = new ethers.Wallet('f4ca61bd2d1de03ecc52eeba0d28fda8eccf990692254de9811d538e0bdb0bdb', this.etherProvider.getProvider());

    const seaport = new Seaport(Signer, {
      overrides: { contractAddress: '0xDe215cECCb5707Cad33a9500Cede0C585A42FDA2' },
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
          consideration: [
            {
              itemType: 3,
              amount: '1',
              token: "0x6E6267A4D7196Cf98c8094723772c755eb4dC108",
              endAmount: '1',
              identifier: '0',
              recipient: offerer,
            },
          ],
          offer: [
            {
              amount: ethers.utils.parseEther('1').toString(),
              token: "0x8D4E2c8bc6b1E4Fa0ED829E6786E9096dd6DC265",
              endAmount: ethers.utils.parseEther('100').toString()
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
