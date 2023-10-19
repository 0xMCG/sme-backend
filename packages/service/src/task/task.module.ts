import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { SmeWebsocketGateway } from '../websocket/sme.websocket.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './schema/task.shema';
import { TransactionSchema } from '../transaction/schema/transaction.schema';
import { TransactionModule } from '../transaction/transaction.module';
import { TransactionService } from '../transaction/transaction.service';

@Module({
  imports: [
    TransactionModule,
    MongooseModule.forFeature([
      { name: 'Task', schema: TaskSchema }, 
      { name: 'Transaction', schema: TransactionSchema }
    ]),
  ],
  controllers: [TaskController],
  providers: [TaskService, SmeWebsocketGateway,TransactionService]
})
export class TaskModule {}
