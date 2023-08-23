import { Module } from '@nestjs/common';
import { SystemService } from './system.service';
import { SystemController } from './system.controller';
import { EtherProvider } from 'src/lib/ether.provider';

@Module({
  controllers: [SystemController],
  providers: [SystemService, EtherProvider],
})
export class SystemModule {}
