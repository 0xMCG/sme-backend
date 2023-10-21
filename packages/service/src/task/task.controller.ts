import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { TaskService } from './task.service';
import { FillOrderDto } from './dto/fill-order.dto';
import { SmeWebsocketGateway } from 'src/websocket/sme.websocket.gateway';
import * as crypto from 'crypto';
import { MapContainer } from '../map.container';
import { OrderService } from 'src/order/order.service';
import { OrderStatus } from 'src/order/types';

function sleep(ms: any) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService, 
    private readonly orderService: OrderService,
    @Inject(SmeWebsocketGateway) private readonly smeWebsocketGateway: SmeWebsocketGateway,
    private readonly mapContainer: MapContainer) {}

  @Get('/findAll')
  findAll() {
    return this.taskService.findAll();
  }

  @Get('/findByRequestId/:requestId')
  findOne(@Param('requestId') requestId: string) {
    return this.taskService.findOne(requestId);
  }

  @Post('/fillOrder')
  async fillOrder(@Body() fillOrderDto: FillOrderDto): Promise<any> {
    // 假设请求参数是某个对象，将对象序列化成一个字符串key，重新将请求参数封装成key-value的形式发送给node
    let result = null;
    // const message = {
    //   // message: new Date().getTime()
    // };
    if (!fillOrderDto.makerOrders || fillOrderDto.makerOrders.length === 0) {
      console.log('maker为空')
      // maker为空 从数据库中随机挑选一个初始化的marker
      const initialMaker = await this.orderService.findInitialMarkerOrder();
      console.log('initialMaker::', initialMaker)
      if (initialMaker) {
        await this.orderService.updateOrderStatus(initialMaker.hash, OrderStatus.PENDING);
        fillOrderDto.makerOrders = [initialMaker];
      } else {
        return {
          status: false,
          data: 'No nft remaining'
        }
      }
    }
    const message = fillOrderDto;
    const jsonString = JSON.stringify(message);
    const md5Hash = crypto.createHash('md5').update(jsonString + new Date().getTime()).digest('hex');
    this.smeWebsocketGateway.sendTask1ToAllClients(JSON.stringify({
      key: md5Hash,
      value: message
    }));

    for (let index = 0; index < 500; index++) {
      result = this.mapContainer.get(md5Hash);
      console.log('result::', result)
      if (result !== undefined) break;
      await sleep(6000);
    }
    if (result && result.status) {
      await this.taskService.create(result.data);
    }
    this.mapContainer.delete(md5Hash);
    return result;
  }

  @Get('/task2')
  async task2(): Promise<string> {
    // 假设请求参数是某个对象，将对象序列化成一个字符串key，重新将请求参数封装成key-value的形式发送给node
    let result = null;

    const message = {
      message: new Date().getTime()
    };
    const jsonString = JSON.stringify(message);
    const md5Hash = crypto.createHash('md5').update(jsonString).digest('hex');
    this.smeWebsocketGateway.sendTask1ToAllClients(JSON.stringify({
      key: md5Hash,
      value: message
    }));

    for (let index = 0; index < 500; index++) {
      result = this.mapContainer.get(md5Hash);
      if (result !== undefined) break;
      await sleep(6000);
    }
    await this.taskService.create(result);

    return result;
  }
}
