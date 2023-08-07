import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { OrderComponents } from '@opensea/seaport-js/lib/types';
import { SeaportProvider } from 'src/provider/seaport.provider';

@Injectable()
export class OrderService {

  constructor(@InjectModel('Order') private readonly orderModel, private readonly seaportProvider: SeaportProvider) { }

  async create(createOrderDto: CreateOrderDto) {
    const hash = this.seaportProvider.getProvider().getOrderHash(createOrderDto.entry.parameters as OrderComponents);

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
