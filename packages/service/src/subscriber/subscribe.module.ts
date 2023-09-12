// my.module.ts
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ContractEventSubscribeService } from './contractEventSubscribe.service';
import { EtherProvider } from '../lib/ether.provider';
import { OrderService } from '../order/order.service';
import { OrderModule } from '../order/order.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from '../order/schema/order.schema';
import { SeaportProvider } from '../lib/seaport.provider';
import { BlockSchema } from '../block/schema/block.schema';
import { BlockService } from '../block/block.service';
import { MutexManager } from './MutexManager';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    OrderModule,
    MongooseModule.forFeature([
      { name: 'Order', schema: OrderSchema },
      { name: 'Block', schema: BlockSchema },
    ]),
  ],
  providers: [
    ContractEventSubscribeService,
    EtherProvider,
    OrderService,
    SeaportProvider,
    BlockService,
    MutexManager,
  ],
  exports: [ContractEventSubscribeService, MutexManager],
})
export class SubscribeModule {}
