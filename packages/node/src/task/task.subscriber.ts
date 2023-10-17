import { Injectable } from '@nestjs/common';
import { OrderProbilityStruct } from '../lib/typechain-types-dual/contracts/Seaport';
import { SeaportProvider } from '../lib/seaport.provider';
import { Task, TaskPublisher } from './task.publisher';
import { PythonService } from '../python/python.service';
import { MatchOrdersFulfillment } from '@opensea/seaport-js/lib/types';
import { WebSocketClient } from '../websocket/websocket.client';

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
          const orderHash = this.seaportProvider
            .getSeaport()
            .getOrderHash(data.makerOrder[index].parameters);

          orderProbility.push({
            orderHash,
            numerator: numerator,
            denominator: denominator,
          });

          this.webSocketClient.sendProbabilityMessage(
            JSON.stringify({
              orderHash,
              numerator,
              denominator,
            }),
          );
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

          this.webSocketClient.sendProbabilityMessage(
            JSON.stringify({
              orderHash,
              numerator,
              denominator,
            }),
          );
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
          this.webSocketClient.sendProbabilityMessage(
            JSON.stringify({
              orderHash,
              numerator,
              denominator,
            }),
          );
        }
      }
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
