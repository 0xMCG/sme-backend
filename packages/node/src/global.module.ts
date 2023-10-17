import { Module, Global } from '@nestjs/common';
import { MapContainer } from './map.container';

@Global()
@Module({
  providers: [MapContainer],
  exports: [MapContainer],
})
export class GlobalModule {}
