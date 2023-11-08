import { Module } from '@nestjs/common';
import { PythonService } from '../python/python.service';
import { SeaportProvider } from '../lib/seaport.provider';
import { TaskPublisher } from '../task/task.publisher';
import { TaskSubscriber } from './task.subscriber';
import { WebSocketClient } from '../websocket/websocket.client';
import { EtherProvider } from '../lib/ether.provider';

@Module({
  providers: [
    TaskPublisher,
    TaskSubscriber,
    SeaportProvider,
    PythonService,
    WebSocketClient,
    EtherProvider,
  ],
  exports: [TaskPublisher, TaskSubscriber],
})
export class TaskModule {}
