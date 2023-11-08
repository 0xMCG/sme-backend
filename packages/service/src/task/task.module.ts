import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { SmeWebsocketGateway } from '../websocket/sme.websocket.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './schema/task.shema';
import { TransactionSchema } from '../transaction/schema/transaction.schema';
import { TransactionModule } from '../transaction/transaction.module';
import { TransactionService } from '../transaction/transaction.service';
import { OrderSchema } from '../order/schema/order.schema';
import { OrderModule } from '../order/order.module';
import { OrderService } from '../order/order.service';
import { SeaportProvider } from '../lib/seaport.provider';

@Module({
  imports: [
    TransactionModule,
    OrderModule,
    MongooseModule.forFeature([
      { name: 'Task', schema: TaskSchema }, 
      { name: 'Order', schema: OrderSchema }, 
      { name: 'Transaction', schema: TransactionSchema }
    ]),
  ],
  controllers: [TaskController],
  providers: [TaskService, SmeWebsocketGateway,TransactionService,OrderService, SeaportProvider]
})
export class TaskModule {}
