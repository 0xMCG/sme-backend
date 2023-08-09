import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SeaportProvider } from 'src/lib/seaport.provider';

@Injectable()
export class OrderService {

  constructor(@InjectModel('Order') private readonly orderModel, private readonly seaportProvider: SeaportProvider) { }

  async create(createOrderDto: CreateOrderDto) {
    // const hash = this.seaportProvider.getProvider().getOrderHash(createOrderDto.entry.parameters as OrderComponents);

    // console.log('hash::', hash);
    // createOrderDto.hash = hash;
    // hash check
    const ifExist = await this.orderModel.find({ 'hash': createOrderDto.hash }).limit(1).exec();
    if (ifExist.length != 0) throw new HttpException("Order already exist", HttpStatus.BAD_REQUEST);
    let model = new this.orderModel(createOrderDto);
    return await model.save();
  }

  async findAll() {
    return await this.orderModel.find().exec();
  }

  async findOne(hash: string) {
    return await this.orderModel.find({ 'hash': hash }).limit(1).exec();
  }

  async deleteOne(hash: string) {
    return this.orderModel.deleteOne({ 'hash': hash }).exec();
  }
}
