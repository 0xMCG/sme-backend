import { Injectable } from '@nestjs/common';
import { SeaportProvider } from '../lib/seaport.provider';
import { Task, TaskPublisher } from './task.publisher';

@Injectable()
export class TaskSubscriber {
  constructor(private readonly taskEventPublisher: TaskPublisher,
    private readonly seaportProvider: SeaportProvider,) {
    this.subscribeToEvents();
  }

  private subscribeToEvents() {
    this.taskEventPublisher.taskEvent$.subscribe((data: Task) => {
      console.log('Received event:', data);
      // 执行发送matchOrdersWithRandom交易
      // TODO: 计算modeOrderFulfillments和orderProbility
      const modeOrderFulfillments = [];
      const orderProbility = [];
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