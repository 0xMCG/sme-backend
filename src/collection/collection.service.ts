import { Injectable } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { ReservoirApi } from 'src/lib/reservoir.api';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CollectionService {

  constructor(private readonly reservoirApi: ReservoirApi, @InjectModel('HotTop') private readonly hotTopSchema){}

  create(createCollectionDto: CreateCollectionDto) {
    return 'This action adds a new collection';
  }

  sellingTop() {
    return this.reservoirApi.getCollectionsTopsellingV1();
  }

  hotTop() {
    const data = this.reservoirApi.getCollectionsV6();
    // this.hotTopSchema.saveMany(data)
    return data;
  }

  findAll() {
    return `This action returns all collection`;
  }

  findOne(id: number) {
    return `This action returns a #${id} collection`;
  }

  update(id: number, updateCollectionDto: UpdateCollectionDto) {
    return `This action updates a #${id} collection`;
  }

  remove(id: number) {
    return `This action removes a #${id} collection`;
  }
}
