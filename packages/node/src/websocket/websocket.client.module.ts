import { Module } from '@nestjs/common';
import { TaskPublisher } from '../task/task.publisher';
import { EtherProvider } from '../lib/ether.provider';
import { SeaportProvider } from '../lib/seaport.provider';
import { WebSocketClient } from './websocket.client';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [TaskModule],
  providers: [WebSocketClient, SeaportProvider, EtherProvider, TaskPublisher],
  exports: [WebSocketClient],
})
export class WebSocketClientModule {}
