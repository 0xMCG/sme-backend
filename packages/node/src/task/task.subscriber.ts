import { Injectable } from '@nestjs/common';
import { OrderProbilityStruct } from '../lib/typechain-types-dual/contracts/Seaport';
import { SeaportProvider } from '../lib/seaport.provider';
import { Task, TaskPublisher } from './task.publisher';
import { PythonService } from '../python/python.service';
import { MatchOrdersFulfillment } from '@opensea/seaport-js/lib/types';

@Injectable()
export class TaskSubscriber {
  constructor(private readonly taskEventPublisher: TaskPublisher,
    private readonly pythonService: PythonService,
    private readonly seaportProvider: SeaportProvider,) {
    this.subscribeToEvents();
  }

  private subscribeToEvents() {
    this.taskEventPublisher.taskEvent$.subscribe(async (data: Task) => {
      console.log('Received event:', data);
      // 执行发送matchOrdersWithRandom交易
      // TODO: 计算modeOrderFulfillments和orderProbility
      const orderProbility: OrderProbilityStruct[] = [];

      const modeOrderFulfillments: MatchOrdersFulfillment[] = data.modeOrderFulfillments;
      // modeOrderFulfillments.push({
      //   offerComponents: [
      //     {
      //       orderIndex: 0,
      //       itemIndex: 0,
      //     },
      //   ],
      //   considerationComponents: [
      //     {
      //       orderIndex: 2,
      //       itemIndex: 0,
      //     },
      //   ],
      // });
      // modeOrderFulfillments.push({
      //   offerComponents: [
      //     {
      //       orderIndex: 2,
      //       itemIndex: 0,
      //     },
      //   ],
      //   considerationComponents: [
      //     {
      //       orderIndex: 0,
      //       itemIndex: 0,
      //     },
      //   ],
      // });
      // modeOrderFulfillments.push({
      //   offerComponents: [
      //     {
      //       orderIndex: 1,
      //       itemIndex: 0,
      //     },
      //   ],
      //   considerationComponents: [
      //     {
      //       orderIndex: 2,
      //       itemIndex: 0,
      //     },
      //   ],
      // });
      // modeOrderFulfillments.push({
      //   offerComponents: [
      //     {
      //       orderIndex: 2,
      //       itemIndex: 0,
      //     },
      //   ],
      //   considerationComponents: [
      //     {
      //       orderIndex: 1,
      //       itemIndex: 0,
      //     },
      //   ],
      // });
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
          orderProbility.push({
            orderHash: this.seaportProvider.getSeaport().getOrderHash(data.makerOrder[index].parameters),
            numerator: numerator,
            denominator: denominator
          })
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
            orderProbility.push({
              orderHash: this.seaportProvider.getSeaport().getOrderHash(makerOrder.parameters),
              numerator: numerator,
              denominator: denominator
            })
          }
          for (const takerOrder of data.takerOrder) {
            orderProbility.push({
              orderHash: this.seaportProvider.getSeaport().getOrderHash(takerOrder.parameters),
              numerator: numerator,
              denominator: denominator
            })
          }
          
      }
      try {
        this.seaportProvider.getContract().matchOrdersWithRandom([...data.makerOrder,...data.takerOrder],
            modeOrderFulfillments, 
            // 第一笔交易的requestId
            data.requestId, 
            orderProbility, 
            {gasLimit: 1500000})
           .then(console.log).catch(console.error)
      } catch (error) {
        
      }
      
    });
  }
}