import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { TaskService } from './task.service';
import { FillOrderDto } from './dto/fill-order.dto';
import { SmeWebsocketGateway } from 'src/websocket/sme.websocket.gateway';
import * as crypto from 'crypto';
import { MapContainer } from '../map.container';

function sleep(ms: any) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService, 
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
  async fillOrder(@Body() fillOrderDto: FillOrderDto): Promise<string> {
    // 假设请求参数是某个对象，将对象序列化成一个字符串key，重新将请求参数封装成key-value的形式发送给node
    let result = null;
    // const message = {
    //   // message: new Date().getTime()
    // };
    const message = fillOrderDto;
    const jsonString = JSON.stringify(message);
    const md5Hash = crypto.createHash('md5').update(jsonString).digest('hex');
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
    await this.taskService.create(result);

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
