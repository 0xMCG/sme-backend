import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrderService {

  constructor(@InjectModel('Order') private readonly orderModel) { }

  async create(createOrderDto: CreateOrderDto) {
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
