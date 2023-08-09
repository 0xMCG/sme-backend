import { Injectable } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { ReservoirApi } from 'src/lib/reservoir.api';

@Injectable()
export class CollectionService {

  constructor(private readonly reservoirApi: ReservoirApi){}

  create(createCollectionDto: CreateCollectionDto) {
    return 'This action adds a new collection';
  }

  sellingTop() {
    return this.reservoirApi.getCollectionsTopsellingV1();
  }

  hotTop() {
    return this.reservoirApi.getCollectionsV6();
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
