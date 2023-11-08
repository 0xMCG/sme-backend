import { Injectable } from '@nestjs/common';
import { OrderProbilityStruct } from '../lib/typechain-types-dual/contracts/Seaport';
import { SeaportProvider } from '../lib/seaport.provider';
import { Task, TaskPublisher } from './task.publisher';
import { PythonService } from '../python/python.service';
import { MatchOrdersFulfillment } from '@opensea/seaport-js/lib/types';
import { WebSocketClient } from '../websocket/websocket.client';
import * as lodash from 'lodash';
import { ethers } from 'ethers';

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
      if (data.randomWords.length === 2) {
        // 只有一个随机数，计算出随机数对应的numerator和denominator并apply到所有的order（包括taker）
        for (let index = 0; index < data.randomWords.length; index++) {
          const bigNumber = data.randomWords[index];
          // const bigNumber = data.randomWords[0];
          const execResult = await this.pythonService.executeScript(
            './src/python/generate_beta_distribution.py',
            [bigNumber.toString(), data.randomStrategy],
          );
          const result = JSON.parse(execResult);
          console.log('execResult', result);
          console.log('data0', result[0]);
          console.log('data1', result[1]);
          const numerator = result[0];
          const denominator = result[1];

          let priceNumerator = 1;
          let priceDenominator = 1;

          // {
          //   "itemType":3,
          //   "token":"0x560B65205dEA9E14bB169c91650915503c41928C",
          //   "identifierOrCriteria":"0",
          //   "startAmount":"5",
          //   "endAmount":"5",
          //   "_id":"652e03cc1f1f4d453aa06cad"
          // }
          const order = data.makerOrder[index];
          const rate = lodash.round(lodash.divide(denominator, numerator), 2);

          const offer = order.parameters.offer;
          if (offer[0].itemType === 1) {
            const ethereumStartValue = ethers.BigNumber.from(offer[0].startAmount); // 以太坊的数值
            const ethereumEndValue = ethers.BigNumber.from(offer[0].endAmount); // 以太坊的数值

            // 将以太坊的数值转换为正常的 JavaScript number 类型
            const start = parseFloat(ethers.utils.formatEther(ethereumStartValue));
            const end = parseFloat(ethers.utils.formatEther(ethereumEndValue));
            priceNumerator = (end - start) * rate + start;
          } else {

            // 将以太坊的数值转换为正常的 JavaScript number 类型
            const start = parseFloat(offer[0].startAmount);
            const end = parseFloat(offer[0].endAmount);
            priceDenominator = (end - start) * rate + start;
          }
          
          const consideration = order.parameters.consideration;

          if (consideration[0].itemType === 1) {
            const ethereumStartValue = ethers.BigNumber.from(consideration[0].startAmount); // 以太坊的数值
            const ethereumEndValue = ethers.BigNumber.from(consideration[0].endAmount); // 以太坊的数值

            // 将以太坊的数值转换为正常的 JavaScript number 类型
            const start = parseFloat(ethers.utils.formatEther(ethereumStartValue));
            const end = parseFloat(ethers.utils.formatEther(ethereumEndValue));
            priceNumerator = (end - start) * rate + start;
          } else {

            // 将以太坊的数值转换为正常的 JavaScript number 类型
            const start = parseFloat(consideration[0].startAmount);
            const end = parseFloat(consideration[0].endAmount);
            priceDenominator = (end - start) * rate + start;
          }

          const price = lodash.round(lodash.divide(priceDenominator, priceNumerator), 2);
          
        
          const orderHash = this.seaportProvider
            .getSeaport()
            .getOrderHash(order.parameters);

            orderPrices.push({
              orderHash,
              price,
              numerator: numerator,
              denominator: denominator
            })

          orderProbility.push({
            orderHash,
            numerator: numerator,
            denominator: denominator,
          });
        }
      } else {
        const bigNumber = data.randomWords[0];
        // const bigNumber = data.randomWords[0];
        const execResult = await this.pythonService.executeScript(
          './src/python/generate_beta_distribution.py',
          [bigNumber.toString(), data.randomStrategy],
        );
        const result = JSON.parse(execResult);
        console.log('execResult', result);
        console.log('data0', result[0]);
        console.log('data1', result[1]);
        const numerator = result[0];
        const denominator = result[1];
        for (const makerOrder of data.makerOrder) {
          const orderHash = this.seaportProvider
            .getSeaport()
            .getOrderHash(makerOrder.parameters);
          orderProbility.push({
            orderHash,
            numerator: numerator,
            denominator: denominator,
          });

          // this.webSocketClient.sendProbabilityMessage(
          //   JSON.stringify({
          //     orderHash,
          //     numerator,
          //     denominator,
          //   }),
          // );

          let priceNumerator = 1;
          let priceDenominator = 1;

          // {
          //   "itemType":3,
          //   "token":"0x560B65205dEA9E14bB169c91650915503c41928C",
          //   "identifierOrCriteria":"0",
          //   "startAmount":"5",
          //   "endAmount":"5",
          //   "_id":"652e03cc1f1f4d453aa06cad"
          // }
          const rate = lodash.round(lodash.divide(denominator, numerator), 2);

          const offer = makerOrder.parameters.offer;
          if (offer[0].itemType === 1) {
            const ethereumStartValue = ethers.BigNumber.from(offer[0].startAmount); // 以太坊的数值
            const ethereumEndValue = ethers.BigNumber.from(offer[0].endAmount); // 以太坊的数值

            // 将以太坊的数值转换为正常的 JavaScript number 类型
            const start = parseFloat(ethers.utils.formatEther(ethereumStartValue));
            const end = parseFloat(ethers.utils.formatEther(ethereumEndValue));
            priceNumerator = (end - start) * rate + start;
          } else {

            // 将以太坊的数值转换为正常的 JavaScript number 类型
            const start = parseFloat(offer[0].startAmount);
            const end = parseFloat(offer[0].endAmount);
            priceDenominator = (end - start) * rate + start;
          }
          
          const consideration = makerOrder.parameters.consideration;

          if (consideration[0].itemType === 1) {
            const ethereumStartValue = ethers.BigNumber.from(consideration[0].startAmount); // 以太坊的数值
            const ethereumEndValue = ethers.BigNumber.from(consideration[0].endAmount); // 以太坊的数值

            // 将以太坊的数值转换为正常的 JavaScript number 类型
            const start = parseFloat(ethers.utils.formatEther(ethereumStartValue));
            const end = parseFloat(ethers.utils.formatEther(ethereumEndValue));
            priceNumerator = (end - start) * rate + start;
          } else {

            // 将以太坊的数值转换为正常的 JavaScript number 类型
            const start = parseFloat(consideration[0].startAmount);
            const end = parseFloat(consideration[0].endAmount);
            priceDenominator = (end - start) * rate + start;
          }

          const price = lodash.round(lodash.divide(priceDenominator, priceNumerator), 2);

            orderPrices.push({
              orderHash,
              price,
              numerator: numerator,
              denominator: denominator
            })
        }
        for (const takerOrder of data.takerOrder) {
          const orderHash = this.seaportProvider
            .getSeaport()
            .getOrderHash(takerOrder.parameters);
          orderProbility.push({
            orderHash,
            numerator: numerator,
            denominator: denominator,
          });

          let priceNumerator = 1;
          let priceDenominator = 1;

          // {
          //   "itemType":3,
          //   "token":"0x560B65205dEA9E14bB169c91650915503c41928C",
          //   "identifierOrCriteria":"0",
          //   "startAmount":"5",
          //   "endAmount":"5",
          //   "_id":"652e03cc1f1f4d453aa06cad"
          // }
          const rate = lodash.round(lodash.divide(denominator, numerator), 2);

          const offer = takerOrder.parameters.offer;
          if (offer[0].itemType === 1) {
            const ethereumStartValue = ethers.BigNumber.from(offer[0].startAmount); // 以太坊的数值
            const ethereumEndValue = ethers.BigNumber.from(offer[0].endAmount); // 以太坊的数值

            // 将以太坊的数值转换为正常的 JavaScript number 类型
            const start = parseFloat(ethers.utils.formatEther(ethereumStartValue));
            const end = parseFloat(ethers.utils.formatEther(ethereumEndValue));
            priceNumerator = (end - start) * rate + start;
          } else {

            // 将以太坊的数值转换为正常的 JavaScript number 类型
            const start = parseFloat(offer[0].startAmount);
            const end = parseFloat(offer[0].endAmount);
            priceDenominator = (end - start) * rate + start;
          }
          
          const consideration = takerOrder.parameters.consideration;

          if (consideration[0].itemType === 1) {
            const ethereumStartValue = ethers.BigNumber.from(consideration[0].startAmount); // 以太坊的数值
            const ethereumEndValue = ethers.BigNumber.from(consideration[0].endAmount); // 以太坊的数值

            // 将以太坊的数值转换为正常的 JavaScript number 类型
            const start = parseFloat(ethers.utils.formatEther(ethereumStartValue));
            const end = parseFloat(ethers.utils.formatEther(ethereumEndValue));
            priceNumerator = (end - start) * rate + start;
          } else {

            // 将以太坊的数值转换为正常的 JavaScript number 类型
            const start = parseFloat(consideration[0].startAmount);
            const end = parseFloat(consideration[0].endAmount);
            priceDenominator = (end - start) * rate + start;
          }

          const price = lodash.round(lodash.divide(priceDenominator, priceNumerator), 2);

            orderPrices.push({
              orderHash,
              price,
              numerator: numerator,
              denominator: denominator
            })

          
          // this.webSocketClient.sendProbabilityMessage(
          //   JSON.stringify({
          //     orderHash,
          //     numerator,
          //     denominator,
          //   }),
          // );
        }
      }

      this.webSocketClient.sendProbabilityMessage(
        JSON.stringify(orderPrices),
      );
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
          .then(console.log)
          .catch(console.error);
      } catch (error) {}
    });
  }
}
