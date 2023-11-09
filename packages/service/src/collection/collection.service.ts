import { Injectable } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { ReservoirApi } from '../lib/reservoir.api';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CollectionService {
  constructor(
    private readonly reservoirApi: ReservoirApi,
    @InjectModel('HotTop') private readonly hotTopSchema,
    @InjectModel('SellingTop') private readonly sellingTopSchema,
  ) { }

  create(createCollectionDto: CreateCollectionDto) {
    return 'This action adds a new collection';
  }

  sellingTop() {
    return this.sellingTopSchema.find({}).limit(20).exec();
  }

  hotTop() {
    return this.hotTopSchema.find({}).limit(20).exec();
  }

  findAll() {
    return `This action returns all collection`;
  }

  findOne(id: string) {
    return this.hotTopSchema.findOne({ id }).exec();
  }

  // update(id: number, updateCollectionDto: UpdateCollectionDto) {
  //   return `This action updates a #${id} collection`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} collection`;
  // }
}
