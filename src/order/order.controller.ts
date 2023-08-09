import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':hash')
  findOne(@Param('hash') hash: string) {
    return this.orderService.findOne(hash);
  }

  @Delete(':hash')
  delete(@Param('hash') hash: string) {
    return this.orderService.deleteOne(hash);
  }
}
