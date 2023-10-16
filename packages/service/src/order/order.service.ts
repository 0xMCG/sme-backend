import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SeaportProvider } from '../lib/seaport.provider';
import { OrderQueryParams, OrderStatus } from './types';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly orderModel,
    private readonly seaportProvider: SeaportProvider,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    // const hash = this.seaportProvider.getProvider().getOrderHash(createOrderDto.entry.parameters as OrderComponents);
    // createOrderDto.hash = hash;

    // orderer & consideration check
    if (
      createOrderDto.entry.parameters.offer.length == 0 &&
      createOrderDto.entry.parameters.consideration.length == 0
    ) {
      throw new HttpException(
        'offer and consideration cannot be empty at the same time',
        HttpStatus.BAD_REQUEST,
      );
    }

    // hash check
    const ifExist = await this.orderModel
      .find({ hash: createOrderDto.hash })
      .limit(1)
      .exec();
    if (ifExist.length != 0)
      throw new HttpException('Order already exist', HttpStatus.BAD_REQUEST);
    const model = new this.orderModel(createOrderDto);
    return await model.save();
  }

  async findAll(query: OrderQueryParams) {
    const current_timestamp = new Date().getTime() / 1000;
    return await this.orderModel
      .find({
        'entry.parameters.endTime': {
          $gte: current_timestamp.toString(),
        },
        status: {
          $nin: [OrderStatus.CANCELLED, OrderStatus.MATCHED],
        },
        type: query.type
      })
      .exec();
  }

  async findOne(hash: string) {
    return await this.orderModel.find({ hash: hash }).limit(1).exec();
  }

  async deleteOne(hash: string) {
    return this.orderModel.deleteOne({ hash: hash }).exec();
  }

  async updateOrderStatus(hash: string, status: string) {
    return this.orderModel
      .updateOne(
        { hash },
        {
          $set: { status },
        },
      )
      .exec();
  }
}
