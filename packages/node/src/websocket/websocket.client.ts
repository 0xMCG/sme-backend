import { Injectable, Scope } from '@nestjs/common';
import { io, Socket } from 'socket.io-client';
import { MapContainer } from '../map.container';
import {
  CONDUIT_KEYS_TO_CONDUIT,
  SeaportProvider,
} from '../lib/seaport.provider';
import { EtherProvider } from '../lib/ether.provider';
import { TaskPublisher } from '../task/task.publisher';
import { MatchOrdersFulfillment } from '@opensea/seaport-js/lib/types';
import * as moment from 'moment';
import { TaskContainer } from '../task.container';

export function sleep(ms: any) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

@Injectable({ scope: Scope.DEFAULT })
export class WebSocketClient {
  public client: Socket;
  static instance: any;

  constructor(
    private readonly seaportProvider: SeaportProvider,
    private readonly etherProvider: EtherProvider,
    private readonly mapContainer: MapContainer,
    private readonly taskContainer: TaskContainer,
    private readonly taskPublisher: TaskPublisher,
  ) {
    if (WebSocketClient.instance) {
      return WebSocketClient.instance;
    }

    this.client = io('ws://localhost:3000');

    WebSocketClient.instance = this;
    // this.client  = new WebSocket('ws://localhost:3000');

    this.client.on('open', () => {
      console.log('Connected to WebSocket server');
    });

    this.client.on('task1', async (message) => {
      console.log('Received message:', moment().format('YYYY-MM-DD HH:mm:ss'), message);

      const task = JSON.parse(message);
      const key = task?.key;
      const value = task?.value;
      const contract = this.seaportProvider.getContract();

      const seaport = this.seaportProvider.getSeaport();

      const orderHashes = [];

      /**
       * 
       *
       * value的数据格式是:
          randomNumberCount: number
          randomStrategy: number
          takerOrders: OrderEntry[];
          makerOrders: OrderEntry[];
          modeOrderFulfillments: MatchOrdersFulfillment[];
          this.mapContainer.set(key, value);
       */

      // const takerOrders = value.takerOrders;
      // const makerOrders = value.makerOrders;
      // const randomStrategy = value.randomStrategy;
      // const modeOrderFulfillments = value.modeOrderFulfillments;
      // const randomNumberCount = value.randomNumberCount;

      const [takerOrder, makerOrder, makerOrder2] = await this.seaportProvider.build_bid_scenario();
      const takerOrders = [takerOrder];
      const makerOrders = [makerOrder, makerOrder2];
      const randomStrategy = 1;
      const randomNumberCount = 2;
      const modeOrderFulfillments: MatchOrdersFulfillment[] = [];
      modeOrderFulfillments.push({
        offerComponents: [
          {
            orderIndex: 0,
            itemIndex: 0,
          },
        ],
        considerationComponents: [
          {
            orderIndex: 2,
            itemIndex: 0,
          },
        ],
      });
      modeOrderFulfillments.push({
        offerComponents: [
          {
            orderIndex: 2,
            itemIndex: 0,
          },
        ],
        considerationComponents: [
          {
            orderIndex: 0,
            itemIndex: 0,
          },
        ],
      });

      modeOrderFulfillments.push({
        offerComponents: [
          {
            orderIndex: 1,
            itemIndex: 0,
          },
        ],
        considerationComponents: [
          {
            orderIndex: 2,
            itemIndex: 0,
          },
        ],
      });
      modeOrderFulfillments.push({
        offerComponents: [
          {
            orderIndex: 2,
            itemIndex: 0,
          },
        ],
        considerationComponents: [
          {
            orderIndex: 1,
            itemIndex: 0,
          },
        ],
      });

      console.log('takerOrder:', JSON.stringify(takerOrder))
      console.log('makerOrder:', JSON.stringify(makerOrder))
      console.log('makerOrder2:', JSON.stringify(makerOrder2))

      if (takerOrders && takerOrders.length) {
        for (const takerOrder of takerOrders) {
          orderHashes.push(seaport.getOrderHash(takerOrder.parameters))
        }
      }

      if (makerOrders && makerOrders.length) {
        for (const makerOrder of makerOrders) {
          orderHashes.push(seaport.getOrderHash(makerOrder.parameters))
        }
      }

      this.taskContainer.set(key, {
        makerOrders,
        takerOrders,
        randomNumberCount,
        modeOrderFulfillments,
        randomStrategy,
        orderHashes
      })

      // try {
      //   const result = await contract.prepare(
      //     [...makerOrders, ...takerOrders],
      //     // premiumOrder在前面数组的下标
      //     [],
      //     [],
      //     // 2个随机数
      //     randomNumberCount,
      //     { gasLimit: 1000000 },
      //   );

      //   console.log('result.hash:::', result.hash);

      //   let receipt = null;

      //   let retryCount = 0;

      //   while (result.hash && receipt === null && retryCount < 20) {
      //     console.log('123 retryCount: ', retryCount);
      //     retryCount++;
      //     receipt = await this.etherProvider
      //       .getProvider()
      //       .getTransactionReceipt(result.hash);
      //     await sleep(6000); // 等待6秒后继续检查交易确认
      //   }

      //   console.log('receipt:::', receipt);

      //   if (receipt && receipt.status) {
      //     for (const log of receipt.logs || []) {
      //       if (log.address != '0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625') {
      //         continue;
      //       }
      //       const event = this.seaportProvider
      //         .getTestContract()
      //         .interface.parseLog(log);
      //       if (event && event.name === 'RandomWordsRequested') {
      //         const requestId = event.args['requestId']?.toString();
      //         console.log('requestId:::', requestId);
      //         // this.taskPublisher.emitTaskEvent({
      //         //   requestId: "",
      //         //   takerOrder: [],
      //         //   makerOrder: [],
      //         //   premiumOrder: [],
      //         //   randomNumber: randomWords
      //         // })
      //         // this.mapContainer.set(requestId, {
      //         //   makerOrders: [makerOrder, makerOrder2],
      //         //   takerOrders: [takerOrder],
      //         //   randomWords: 2
      //         // })

      //         this.mapContainer.set(requestId, {
      //           makerOrders: makerOrders,
      //           takerOrders: takerOrders,
      //           randomStrategy,
      //           modeOrderFulfillments,
      //         });
      //         // this.mapContainer.set(requestId, value)
      //         this.sendPrepareMessage(
      //           JSON.stringify({
      //             key,
      //             value: {
      //               status: true,
      //               data: {
      //                 requestId,
      //                 orderHashes
      //               }
      //             }
      //           }),
      //         );
      //       }
      //     }
      //   } else {
      //     this.sendPrepareMessage(
      //       JSON.stringify({
      //         key,
      //         value: {
      //           status: false,
      //           data: 'Send tx failed'
      //         }
      //       }),
      //     );
      //   }

      //   // this.etherProvider.getProvider()
      //   //   .getTransactionReceipt(result.hash)

      //   //   .then((receipt) => {

      //   //     console.log('receipt::', receipt)

      //   //     for (const log of receipt.logs || []) {
      //   //       if (log.address != '0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625') {
      //   //         continue;
      //   //       }
      //   //       const event = this.seaportProvider
      //   //         .getTestContract()
      //   //         .interface.parseLog(log);
      //   //       if (event && event.name === 'RandomWordsRequested') {
      //   //         const requestId = event.args['requestId'];
      //   //         console.log('requestId:::', requestId);
      //   //         console.log('Task publisher 推送消息')
      //   //         // this.taskPublisher.emitTaskEvent({
      //   //         //   requestId: "",
      //   //         //   takerOrder: [],
      //   //         //   makerOrder: [],
      //   //         //   premiumOrder: [],
      //   //         //   randomNumber: randomWords
      //   //         // })
      //   //         this.mapContainer.set(requestId, {
      //   //           makerOrder: [makerOrder, makerOrder2],
      //   //           takerOrder,
      //   //         })
      //   //         this.sendMessage(
      //   //           JSON.stringify({
      //   //             key,
      //   //             value: requestId,
      //   //           }),
      //   //         );
      //   //       }
      //   //     }
      //   //   })
      //   //   .catch((error) => {
      //   //     console.error("get transaction error::", error)
      //   //   });
      // } catch (error) {
      //   console.error(error);
      //   this.sendPrepareMessage(
      //     JSON.stringify({
      //       key,
      //       value: {
      //         status: false,
      //         data: error.message
      //       },
      //     }),
      //   );
      // } finally {
      //   // this.sendPrepareMessage(
      //   //   JSON.stringify({
      //   //     key,
      //   //     value: 'Send tx failed',
      //   //   }),
      //   // );
      // }
    });

    this.client.on('task2', (message) => {
      console.log('Received message:', message);
      const task = JSON.parse(message);
      const key = task?.key;
      const value = task?.value;
      this.sendPrepareMessage(
        JSON.stringify({
          key,
          value,
        }),
      );
    });

    this.client.on('close', () => {
      console.log('Disconnected from WebSocket server');
    });
  }

  sendPrepareMessage(message: string) {
    this.client.emit('prepare', message);
  }

  sendProbabilityMessage(message: string) {
    this.client.emit('probability', message);
  }
}
