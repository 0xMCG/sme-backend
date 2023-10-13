import { Module } from '@nestjs/common';
import { TaskService } from '../task/task.service';
import { SmeWebsocketGateway } from '../websocket/sme.websocket.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from '../task/task.module';
import { TaskSchema } from '../task/schema/task.shema';

@Module({
    imports: [
        TaskModule,
        MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),
    ],
    providers: [TaskService, SmeWebsocketGateway]
})
export class SmeWebsocketGatewayModule {}
