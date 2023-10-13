import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { SmeWebsocketGateway } from '../websocket/sme.websocket.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './schema/task.shema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),
  ],
  controllers: [TaskController],
  providers: [TaskService, SmeWebsocketGateway]
})
export class TaskModule {}
