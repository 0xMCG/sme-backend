// my.module.ts
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ContractEventSubscribeService } from './contractEventSubscribe.service';
import { EtherProvider } from 'src/lib/ether.provider';
import { OrderService } from 'src/order/order.service';
import { OrderModule } from 'src/order/order.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from 'src/order/schema/order.schema';
import { SeaportProvider } from 'src/lib/seaport.provider';
import { BlockSchema } from 'src/block/schema/block.schema';
import { BlockService } from 'src/block/block.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    OrderModule,
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }, { name: 'Block', schema: BlockSchema }]),
  ],
  providers: [
    ContractEventSubscribeService,
    EtherProvider,
    OrderService,
    SeaportProvider,
    BlockService
  ],
  exports: [ContractEventSubscribeService]
})
export class SubscribeModule {}
