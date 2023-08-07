import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as seaport from '@opensea/seaport-js';
import { ethers } from 'ethers';
import { OrderComponents } from '@opensea/seaport-js/lib/types';

@Injectable()
export class OrderService {

  constructor(@InjectModel('Order') private readonly orderModel) { }

  async create(createOrderDto: CreateOrderDto) {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://eth-sepolia.public.blastapi.io"
    );
    const smeSeaport = new seaport.Seaport(provider);
    const hash = smeSeaport.getOrderHash(createOrderDto.entry.parameters as OrderComponents);

    console.log('hash::', hash);
    createOrderDto.hash = hash;
    let model = new this.orderModel(createOrderDto);
    return await model.save();
  }

  async findAll() {
    return await this.orderModel.find({}).exec();
  }

  async findOne(hash: string) {
    return await this.orderModel.find({ 'hash': hash }).exec();
  }
}
