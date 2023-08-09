import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { ReservoirApi } from 'src/lib/reservoir.api';
import { MongooseModule } from '@nestjs/mongoose';
import { HotTopSchema } from './schema/hot.top.schema';
import { SellingTop } from './schema/selling.top.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'HotTop', schema: HotTopSchema }, { name: 'SellingTop', schema: SellingTop }])],
  controllers: [CollectionController],
  providers: [CollectionService, ReservoirApi]
})
export class CollectionModule {}
