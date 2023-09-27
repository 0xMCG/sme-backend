import { Module } from '@nestjs/common';
import { TaskPublisher } from '../task/task.publisher';
import { EtherProvider } from '../lib/ether.provider';
import { SeaportProvider } from '../lib/seaport.provider';
import { ContractEventSubscribeService } from './contractEventSubscribe.service';
import { MutexManager } from './MutexManager';

@Module({
  providers: [
    ContractEventSubscribeService,
    EtherProvider,
    SeaportProvider,
    MutexManager,
    TaskPublisher
  ],
  exports: [ContractEventSubscribeService, MutexManager],
})
export class SubscriberModule {}
