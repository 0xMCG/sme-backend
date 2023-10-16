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

  @Get(':hash')
  findOne(@Param('hash') hash: string) {
    return this.orderService.findOne(hash);
  }

  @Delete(':hash')
  delete(@Param('hash') hash: string) {
    return this.orderService.deleteOne(hash);
  }
}
