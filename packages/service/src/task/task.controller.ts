import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
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

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.taskService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }

  @Get('/task1')
  async task1(): Promise<string> {
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

    for (let index = 0; index < 50; index++) {
      result = this.mapContainer.get(md5Hash);
      console.log('result::', result)
      if (result !== undefined) break;
      await sleep(6000);
    }

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
    this.smeWebsocketGateway.sendTask2ToAllClients(JSON.stringify({
      key: md5Hash,
      value: message
    }));

    for (let index = 0; index < 50; index++) {
      result = this.mapContainer.get(md5Hash);
      if (result !== undefined) break;
      await sleep(6000);
    }

    return result;
  }
}
