import { ethers } from 'ethers';
import { SeaportABIvSME } from '../abi/Seaport_vSME';

const provider = new ethers.providers.JsonRpcProvider(
  'https://eth-sepolia.public.blastapi.io',
);

const smeSeaportAddress = '0x9c1687C953Fff856e244A152995B96e569C4762A';

const blockNumber = 4092331;

const contract = new ethers.Contract(
  smeSeaportAddress,
  SeaportABIvSME,
  provider,
);

const eventName = 'OrdersMatched';

contract
  .on('OrderCancelled', (event) => {
    console.log('收到OrderCancelled事件数据:', event.args);
  })
  .on('OrdersMatched', (event) => {
    console.log('收到OrdersMatched事件数据:', event.args);
  });

// 获取块中的所有交易
provider
  .getBlockWithTransactions(blockNumber)
  .then((block) => {
    const transactions = block.transactions;

    // 遍历交易，获取事件日志
    transactions.forEach((tx) => {
      tx.wait()
        .then((receipt) => {
          // 解析日志
          for (const log of receipt.logs || []) {
            if (log.address != contract.address) {
              continue;
            }
            const event = contract.interface.parseLog(log);
            if (event && event.name === eventName) {
              console.log('event.args', event.args);
            }
          }
        })
        .catch((error) => {
          console.error('获取交易收据时出错:', error);
        });
    });
  })
  .catch((error) => {
    console.error('获取块时出错:', error);
  });
