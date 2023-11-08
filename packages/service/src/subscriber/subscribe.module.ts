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
import { TransactionModule } from '../transaction/transaction.module';
import { TransactionSchema } from '../transaction/schema/transaction.schema';
import { TransactionService } from '../transaction/transaction.service';
import { TaskSchema } from '../task/schema/task.shema';
import { TaskModule } from '../task/task.module';
import { TaskService } from '../task/task.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    OrderModule,
    TransactionModule,
    TaskModule,
    MongooseModule.forFeature([
      { name: 'Order', schema: OrderSchema },
      { name: 'Block', schema: BlockSchema },
      { name: 'Task', schema: TaskSchema },
      { name: 'Transaction', schema: TransactionSchema },
    ]),
  ],
  providers: [
    ContractEventSubscribeService,
    EtherProvider,
    OrderService,
    SeaportProvider,
    BlockService,
    MutexManager,
    TransactionService,
    TaskService
  ],
  exports: [ContractEventSubscribeService, MutexManager],
})
export class SubscribeModule {}
