import { Injectable } from '@nestjs/common';
import { CreateBlockDto } from './dto/create-block.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BlockService {

  constructor(@InjectModel('Block') private readonly blockSchema) {}

  create(blockNumber: number) {
    const model = new this.blockSchema({
      last: blockNumber
    })
    return model.save();
  }

  findOne() {
    return this.blockSchema.findOne({}).exec();
  }

  update(id: string, block: number) {
    return this.blockSchema.updateOne({'_id': id}, {
      $set: { last: block }
    }).exec();
  }

}
