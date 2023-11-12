import { Injectable } from '@nestjs/common';
import { OrderProbilityStruct } from '../lib/typechain-types-dual/contracts/Seaport';
import { SeaportProvider } from '../lib/seaport.provider';
import {OrderPrice, Task, TaskPublisher} from './task.publisher';
import { PythonService } from '../python/python.service';
import { MatchOrdersFulfillment } from '@opensea/seaport-js/lib/types';
import { WebSocketClient } from '../websocket/websocket.client';
import * as _ from 'lodash';
import {ContractTransaction, ethers} from 'ethers';
@Injectable()
export class TaskSubscriber {
  constructor(
      private readonly taskEventPublisher: TaskPublisher,
      private readonly pythonService: PythonService,
      private readonly seaportProvider: SeaportProvider,
      private readonly webSocketClient: WebSocketClient,
  ) {
    this.subscribeToEvents();
  }

  private subscribeToEvents() {
    this.taskEventPublisher.taskEvent$.subscribe(async (data: Task) => {
      console.log('Received event:', data);
      // 执行发送matchOrdersWithRandom交易
      // TODO: 计算modeOrderFulfillments和orderProbility
      const orderProbility: OrderProbilityStruct[] = [];
      const modeOrderFulfillments: MatchOrdersFulfillment[] =
          data.modeOrderFulfillments;

      const orderPrices = [];
      if (data.randomWords.length === 1) {
        // 只有一个随机数，计算出随机数对应的numerator和denominator并apply到所有的order（包括taker）
        for (let order of data.makerOrder) {
          const price = await this.calculateOrderPrice(data.randomWords[0].toString(), data.randomStrategy, order)
          orderProbility.push({
            orderHash: price.orderHash,
            numerator: price.numerator,
            denominator: price.denominator
          });
          orderPrices.push(price)
        }
      } else if (data.randomWords.length > 1) {
        // 多个随机数，randomWords下标和makerOrder下标对应，超出的忽略
        for (let i = 0; i < data.randomWords.length; i++) {
          if (i >= data.makerOrder.length) {
            break;
          }
          const price = await this.calculateOrderPrice(data.randomWords[i].toString(), data.randomStrategy, data.makerOrder[i]);
          orderProbility.push({
            orderHash: price.orderHash,
            numerator: price.numerator,
            denominator: price.denominator
          });
          orderPrices.push(price)
        }
      }


      // 调用合约执行订单成交
      try {
        this.seaportProvider
            .getContract()
            .matchOrdersWithRandom(
                [...data.makerOrder, ...data.takerOrder],
                modeOrderFulfillments,
                // 第一笔交易的requestId
                data.requestId,
                orderProbility,
                { gasLimit: 1500000 },
            )
            .then((r: ContractTransaction) => {
              // 返回每个order对应的价格及成交的txHash
              const txHash = r.hash;
              this.webSocketClient.sendProbabilityMessage(
                  JSON.stringify({ orderPrices, txHash }),
              );
            })
            .catch(console.error);
      } catch (error) {}
    });
  }

  /**
   * 基于vrf返回的随机数和随机策略调用python脚本计算分子分母
   * @param randomWord 随机数
   * @param randomStrategy 随机策略
   * @param order makerOrder
   * @private
   */
  private async calculateOrderPrice(randomWord: string, randomStrategy: any, order: any): Promise<OrderPrice> {
    const execResult = await this.pythonService.executeScript(
        './src/python/generate_beta_distribution.py',
        [randomWord, randomStrategy],
    );
    const result = JSON.parse(execResult);
    const numerator = result[0];
    const denominator = result[1];
    const rate = _.round(_.divide(numerator, denominator), 2);
    const offer = order.parameters.offer;
    const consideration = order.parameters.consideration;
    let price = 0;
    let itemSize = 1;
    // 查询order中包含erc20的item计算价格
    if (offer[0].itemType === 1) {
      const ethereumStartValue = ethers.BigNumber.from(offer[0].startAmount); // 以太坊的数值
      const ethereumEndValue = ethers.BigNumber.from(offer[0].endAmount); // 以太坊的数值

      // 将以太坊的数值转换为正常的 JavaScript number 类型
      const start = parseFloat(ethers.utils.formatEther(ethereumStartValue));
      const end = parseFloat(ethers.utils.formatEther(ethereumEndValue));
      price = (end - start) * rate + start;
    } else if (consideration[0].itemType === 1) {
      const ethereumStartValue = ethers.BigNumber.from(consideration[0].startAmount); // 以太坊的数值
      const ethereumEndValue = ethers.BigNumber.from(consideration[0].endAmount); // 以太坊的数值

      // 将以太坊的数值转换为正常的 JavaScript number 类型
      const start = parseFloat(ethers.utils.formatEther(ethereumStartValue));
      const end = parseFloat(ethers.utils.formatEther(ethereumEndValue));
      price = (end - start) * rate + start;
    }

    // 计算order该可以成交的erc1155数量(startAmount和endAmount均可应该相同,都表示订单成交总数量,需要乘以订单百分比计算实际成交数量)
    if (offer[0].itemType === 3) {
      itemSize = _.divide(_.multiply(offer[0].endAmount, order.numerator), order.denominator);
    } else if (consideration[0].itemType === 3) {
      itemSize = _.divide(_.multiply(offer[0].endAmount, order.numerator), order.denominator);
    }
    const orderHash = this.seaportProvider
        .getSeaport()
        .getOrderHash(order.parameters);
    return {
      orderHash,
      price,
      numerator,
      denominator,
      itemNumerator: order.numerator,
      itemDenominator: order.denominator,
      itemSize
    }
  }
}
