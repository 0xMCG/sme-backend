import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { ReservoirApi } from 'src/lib/reservoir.api';

@Module({
  controllers: [CollectionController],
  providers: [CollectionService, ReservoirApi]
})
export class CollectionModule {}
