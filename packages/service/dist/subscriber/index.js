"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const Seaport_vSME_1 = require("../abi/Seaport_vSME");
const provider = new ethers_1.ethers.providers.JsonRpcProvider('https://eth-sepolia.public.blastapi.io');
const smeSeaportAddress = '0x9c1687C953Fff856e244A152995B96e569C4762A';
const blockNumber = 4092331;
const contract = new ethers_1.ethers.Contract(smeSeaportAddress, Seaport_vSME_1.SeaportABIvSME, provider);
const eventName = 'OrdersMatched';
contract
    .on('OrderCancelled', (event) => {
    console.log('收到OrderCancelled事件数据:', event.args);
})
    .on('OrdersMatched', (event) => {
    console.log('收到OrdersMatched事件数据:', event.args);
});
provider
    .getBlockWithTransactions(blockNumber)
    .then((block) => {
    const transactions = block.transactions;
    transactions.forEach((tx) => {
        tx.wait()
            .then((receipt) => {
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
//# sourceMappingURL=index.js.map