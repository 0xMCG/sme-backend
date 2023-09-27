import { Injectable } from '@nestjs/common';
import { io, Socket } from 'socket.io-client';
import { MapContainer } from '../map.container';
import { SeaportProvider } from '../lib/seaport.provider';
import { EtherProvider } from '../lib/ether.provider';

@Injectable()
export class WebSocketClient {
  public client: Socket;

  constructor(private readonly seaportProvider: SeaportProvider,
    private readonly etherProvider: EtherProvider,
    private readonly mapContainer: MapContainer) {
    this.client = io('ws://localhost:3000');

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

      const takerOrder = {
        parameters: {
          offerer: '0x53B3F192A56a9cdA260476974443634a96529c72',
          zone: '0x0000000000000000000000000000000000000000',
          zoneHash:
            '0x0000000000000000000000000000000000000000000000000000000000000000',
          startTime: '1695711230',
          endTime: '1695718430',
          orderType: 0,
          offer: [
            {
              itemType: 1,
              token: '0x8D4E2c8bc6b1E4Fa0ED829E6786E9096dd6DC265',
              identifierOrCriteria: '0',
              startAmount: '1000000000000000',
              endAmount: '1000000000000000',
            },
          ],
          consideration: [
            {
              itemType: 1,
              token: '0x6c877a0f432feaab6052d8cc4ae2cf3d686d589f',
              identifierOrCriteria: '0',
              startAmount: '150000000000000000',
              endAmount: '150000000000000000',
              recipient: '0x53B3F192A56a9cdA260476974443634a96529c72',
            },
          ],
          totalOriginalConsiderationItems: 1,
          salt: '0x000000000000000000000000000000000000000000000000dbb7ec780039a0dc',
          conduitKey:
            '0x28c73a60ccf8c66c14eba8935984e616df2926e3aaaaaaaaaaaaaaaaaaaaaa00',
          counter: '0',
        },
        signature:
          '0x5578c7e533d64ac8ab41afd949781c533cfe53af76b4b845d3fe5426006110f5bbcca2bd5370b736dd5fdaf15bc8465dc4e45f5f5ef35617abc2a0f3242937fd',
      };

      const makerOrder = {
        parameters: {
          offerer: '0x28c73A60ccF8c66c14EbA8935984e616Df2926e3',
          zone: '0x0000000000000000000000000000000000000000',
          zoneHash:
            '0x0000000000000000000000000000000000000000000000000000000000000000',
          startTime: '1695711572',
          endTime: '1695718772',
          orderType: 0,
          offer: [
            {
              itemType: 1,
              token: '0x6c877a0f432feaab6052d8cc4ae2cf3d686d589f',
              identifierOrCriteria: '0',
              startAmount: '100000000000000000',
              endAmount: '100000000000000000',
            },
          ],
          consideration: [
            {
              itemType: 1,
              token: '0x8D4E2c8bc6b1E4Fa0ED829E6786E9096dd6DC265',
              identifierOrCriteria: '0',
              startAmount: '20000000000000',
              endAmount: '40000000000000',
              recipient: '0x28c73A60ccF8c66c14EbA8935984e616Df2926e3',
            },
            {
              itemType: 1,
              token: '0x8D4E2c8bc6b1E4Fa0ED829E6786E9096dd6DC265',
              identifierOrCriteria: '0',
              startAmount: '10000000000000',
              endAmount: '30000000000000',
              recipient: '0xfcfC835903314e6a29751f6D57c08e8D01Cd246b',
            },
            {
              itemType: 1,
              token: '0x8D4E2c8bc6b1E4Fa0ED829E6786E9096dd6DC265',
              identifierOrCriteria: '0',
              startAmount: '10000000000000',
              endAmount: '30000000000000',
              recipient: '0xfcfC835903314e6a29751f6D57c08e8D01Cd246b',
            },
          ],
          totalOriginalConsiderationItems: 3,
          salt: '0x000000000000000000000000000000000000000000000000f48522058a21f181',
          conduitKey:
            '0x28c73a60ccf8c66c14eba8935984e616df2926e3aaaaaaaaaaaaaaaaaaaaaa00',
          counter: '0',
        },
        signature:
          '0xb0843d62df2dc5bf652f9a515d688a133748247cb30f1757c21bd7fdaabf0929cadd4ed727082a05ca6a7b28a506ca42e934373cd933c9032d268e30dcbe1701',
      };

      try {
        // const result = await contract
        //   .prepare(
        //     [makerOrder, takerOrder],
        //     // premiumOrder在前面数组的下标
        //     [],
        //     ['0x28c73A60ccF8c66c14EbA8935984e616Df2926e3'],
        //     // 2个随机数
        //     2,
        //     { gasLimit: 1000000 },
        //   )

          // console.log('result.hash:::', result.hash)

          this.etherProvider.getProvider()
          .getTransactionReceipt('0x33722ae86151c898b6c7e69e97389c8bc6fce7dcaa6d5bb58aeb9898bb935fa7')

          .then((receipt) => {
            console.log('receipt:::', receipt)

            for (const log of receipt.logs || []) {
              // if (log.address != this.etherProvider.getContract().address) {
              //   continue;
              // }
              const event = this.etherProvider
                .getContract()
                .interface.parseLog(log);
              console.log('event:::', event);
              

              if (event && event.name === 'ReturnedRandomness') {
                const randomWords = event.args['randomWords'] as [];
                this.sendMessage(
                  JSON.stringify({
                    key,
                    value: randomWords,
                  }),
                );
              }
            }
            // const transactions = block.transactions;
            // transactions.forEach((tx) => {
            //   tx.wait()
            //     .then((receipt) => {
            //       // parse log
                  
            //     })
            //     .catch((_) => {
            //       console.error("event error")
            //     });
            // });
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
  }

  sendMessage(message: string) {
    this.client.emit('task', message);
  }
}
