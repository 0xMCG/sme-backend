import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderQueryParams } from './types';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll(@Query() query: OrderQueryParams) {
    return this.orderService.findAll(query);
  }

  @Get('/getOrderByHash/:hash')
  findOne(@Param('hash') hash: string) {
    return this.orderService.findOne(hash);
  }

  @Get('/remainingNft')
  remainingNft() {
    return this.orderService.findRemainingNft();
  }

  @Delete(':hash')
  delete(@Param('hash') hash: string) {
    return this.orderService.deleteOne(hash);
  }

  @Get('/orderDistribution')
  orderDistribution(@Query('precision')precision: number = 0.1) {
    return this.orderService.orderDistribution(precision);
  }
}
