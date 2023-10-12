import { Module } from '@nestjs/common';
import { PythonService } from '../python/python.service';
import { SeaportProvider } from '../lib/seaport.provider';
import { TaskPublisher } from '../task/task.publisher';
import { TaskSubscriber } from './task.subscriber';

@Module({
    providers:[TaskPublisher, TaskSubscriber, SeaportProvider, PythonService],
  exports: [TaskPublisher, TaskSubscriber],
})
export class TaskModule {}
