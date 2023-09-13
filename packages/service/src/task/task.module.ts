import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { SmeWebsocketGateway } from '../websocket/sme.websocket.gateway';

@Module({
  controllers: [TaskController],
  providers: [TaskService, SmeWebsocketGateway]
})
export class TaskModule {}
