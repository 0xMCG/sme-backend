import { Module } from '@nestjs/common';
import { SystemService } from './system.service';
import { SystemController } from './system.controller';
import { EtherProvider } from 'src/lib/ether.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { RoyaltiesSchema } from './schema/royalties.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Royalties', schema: RoyaltiesSchema }]),
  ],
  controllers: [SystemController],
  providers: [SystemService, EtherProvider],
})
export class SystemModule {}
