import { Module, Global } from '@nestjs/common';
import { MapContainer } from './map.container';
import { TaskContainer } from './task.container';

@Global()
@Module({
  providers: [MapContainer, TaskContainer],
  exports: [MapContainer, TaskContainer],
})
export class GlobalModule {}
