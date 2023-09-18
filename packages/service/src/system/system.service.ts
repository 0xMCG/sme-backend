import { ForbiddenException, Injectable } from '@nestjs/common';
import { Royalties } from './dto/create-royalties.dto';
import { UpdateSystemDto } from './dto/update-system.dto';
import { EtherProvider } from 'src/lib/ether.provider';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SystemService {

  constructor(private readonly etherProvider: EtherProvider,
    @InjectModel('Royalties') private readonly royaltiesModel,
    ) {}

  async upsertNftRoyalties(data: Royalties) {
    const contract = this.etherProvider.getErc721Contract();
    const owner = await contract.ownerOf(data.tokenId);
    // if (owner === data.executor) {
    //   return owner;
    // } else {
    //   throw new ForbiddenException("Not owner")
    // }
    const alreadyExist = await this.royaltiesModel.findOne({ "tokenId": data.tokenId }).exec();
    if (alreadyExist) {
      return this.royaltiesModel.updateOne({ "_id": alreadyExist._id }, {
        $set: {
          'rate': data.rate
        }
      }).exec()
    } else {
      const dataToSave = new this.royaltiesModel(data);
      return await dataToSave.save();
    }
    // return owner;
  }

  findAll() {
    return `This action returns all system`;
  }

  findOne(id: number) {
    return `This action returns a #${id} system`;
  }

  update(id: number, updateSystemDto: UpdateSystemDto) {
    return `This action updates a #${id} system`;
  }

  remove(id: number) {
    return `This action removes a #${id} system`;
  }
}
