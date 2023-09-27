import { Module } from '@nestjs/common';
import { SeaportProvider } from '../lib/seaport.provider';
import { TaskPublisher } from '../task/task.publisher';
import { TaskSubscriber } from './task.subscriber';

@Module({
    providers:[TaskPublisher, TaskSubscriber, SeaportProvider],
  exports: [TaskPublisher, TaskSubscriber],
})
export class TaskModule {}
