import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {

  constructor(@InjectModel('Order') private readonly orderModel: Model<Order>) {}

  create(createOrderDto: CreateOrderDto) {
    // TODO: db insert
    return 'This action adds a new order';
  }

  findAll() {
    // TODO: db query
    return `This action returns all order`;
  }

  findOne(id: number) {
    // TODO: db query
    return `This action returns a #${id} order`;
  }

  // update(id: number, updateOrderDto: UpdateOrderDto) {
  //   return `This action updates a #${id} order`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
}
