import { Module } from '@nestjs/common';
import { TaskService } from '../task/task.service';
import { SmeWebsocketGateway } from '../websocket/sme.websocket.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from '../task/task.module';
import { TaskSchema } from '../task/schema/task.shema';
import { TransactionSchema } from '../transaction/schema/transaction.schema';
import { TransactionService } from '../transaction/transaction.service';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
    imports: [
        TaskModule,
        TransactionModule,
        MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }, { name: 'Transaction', schema: TransactionSchema }]),
    ],
    providers: [TaskService, SmeWebsocketGateway, TransactionService]
})
export class SmeWebsocketGatewayModule {}
