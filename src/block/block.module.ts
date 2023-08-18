import { Module } from '@nestjs/common';
import { BlockService } from './block.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlockSchema } from './schema/block.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Block', schema: BlockSchema },
    ]),
  ],
  providers: [BlockService]
})
export class BlockModule {}
