import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';
import { EtherProvider } from 'src/lib/ether.provider';

@Injectable()
export class SystemService {

  constructor(private readonly etherProvider: EtherProvider) {}

  async create(data: any) {
    const contract = this.etherProvider.getErc721Contract();
    const owner = await contract.ownerOf(data.tokenId);
    // if (owner === data.executor) {
    //   return owner;
    // } else {
    //   throw new ForbiddenException("Not owner")
    // }
    return owner;
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
