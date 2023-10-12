import { Injectable } from '@nestjs/common';
import { io, Socket } from 'socket.io-client';
import { MapContainer } from '../map.container';
import { CONDUIT_KEYS_TO_CONDUIT, SeaportProvider } from '../lib/seaport.provider';
import { EtherProvider } from '../lib/ether.provider';
import { TaskPublisher } from '../task/task.publisher';
import { ethers } from 'ethers';
import { Seaport } from 'src/lib/typechain-types-dual';

const WebSocket = require('websocket').w3cwebsocket;


@Injectable()
export class WebSocketClient {
  public client: Socket;
  static instance: any;

  constructor(private readonly seaportProvider: SeaportProvider,
    private readonly etherProvider: EtherProvider,
    private readonly mapContainer: MapContainer,
    private readonly taskPublisher: TaskPublisher,
    
    ) {

      if (WebSocketClient.instance) {
        return WebSocketClient.instance;
      }
    this.client = io('ws://localhost:3000', {
      transports: ['polling']
    });
    // this.client  = new WebSocket('ws://localhost:3000');

    this.client.on('open', () => {
      console.log('Connected to WebSocket server');
    });

    this.client.on('task1', async (message) => {
      console.log('Received message:', message);
      const task = JSON.parse(message);
      const key = task?.key;
      const value = task?.value;
      this.mapContainer.set(key, value);

      const contract = this.seaportProvider.getContract();

      const [takerOrder, makerOrder, makerOrder2] =  await this.seaportProvider.build_bid_scenario();

      console.log('takerOrder:', JSON.stringify(takerOrder))
      console.log('makerOrder:', JSON.stringify(makerOrder))
      console.log('makerOrder2:', JSON.stringify(makerOrder2))

      try {
        const result = await contract
          .prepare(
            [makerOrder, makerOrder2, takerOrder],
            // premiumOrder在前面数组的下标
            [],
            [],
            // 2个随机数
            2,
            { gasLimit: 1000000 },
          )

          console.log('result:::', result)


          console.log('result.hash:::', result.hash)

          this.etherProvider.getProvider()
          .getTransactionReceipt(result.hash)

          .then((receipt) => {

          console.log('receipt::', receipt)

            for (const log of receipt.logs || []) {
              if (log.address != '0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625') {
                continue;
              }
              const event = this.seaportProvider
                .getTestContract()
                .interface.parseLog(log);              
              if (event && event.name === 'RandomWordsRequested') {
                const requestId = event.args['requestId'];
                console.log('requestId:::', requestId);
                console.log('Task publisher 推送消息')
                // this.taskPublisher.emitTaskEvent({
                //   requestId: "",
                //   takerOrder: [],
                //   makerOrder: [],
                //   premiumOrder: [],
                //   randomNumber: randomWords
                // })
                this.mapContainer.set(requestId, {
                  makerOrder: [makerOrder, makerOrder2],
                  takerOrder,
                })
                this.sendMessage(
                  JSON.stringify({
                    key,
                    value: requestId,
                  }),
                );
              }
            }
          })
          .catch((error) => {
            console.error("get transaction error::", error)
          });

          
      } catch (error) {
        console.error(error);
      } finally {

      }
    });

    this.client.on('task2', (message) => {
      console.log('Received message:', message);
      const task = JSON.parse(message);
      const key = task?.key;
      const value = task?.value;
      this.sendMessage(
        JSON.stringify({
          key,
          value,
        }),
      );
    });

    this.client.on('close', () => {
      console.log('Disconnected from WebSocket server');
    });

    WebSocketClient.instance = this;
  }

  sendMessage(message: string) {
    this.client.emit('task', message);
  }
}
