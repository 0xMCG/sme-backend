import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TaskService } from '../task/task.service';
import { MapContainer } from '../map.container';
import { Injectable } from '@nestjs/common';
import { TransactionService } from '../transaction/transaction.service';
import { OrderStatus } from '../order/types';

@WebSocketGateway()
@Injectable()
export class SmeWebsocketGateway {

  constructor(private readonly mapContainer: MapContainer,
    private readonly taskService: TaskService,
    private readonly transactionService: TransactionService,
    ) {}
  
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  sendTask1ToAllClients(message: any) {
    this.server.emit('task1', message);
  }

  sendTask2ToAllClients(message: any) {
    this.server.emit('task2', message);
  }

  @SubscribeMessage('prepare')
  handlePrepareMessage(client: Socket, @MessageBody() payload: any) {
    console.log('Received prepare message:', payload);
    const receivedPayload = JSON.parse(payload);
    this.mapContainer.set(receivedPayload.key, receivedPayload.value);
    // this.taskService.create(receivedPayload.value)
    // this.server.emit('chat', payload); // 将消息广播给所有连接的客户端
    return payload;
  }

  @SubscribeMessage('matched')
  handleMatchedMessage(client: Socket, @MessageBody() payload: any) {
    console.log('Received matched message:', payload);
    const receivedPayload = JSON.parse(payload);
    this.mapContainer.set(receivedPayload.key, receivedPayload.value);
    // this.server.emit('chat', payload); // 将消息广播给所有连接的客户端
    return payload;
  }

  @SubscribeMessage('probability')
  handleProbabilityMessage(client: Socket, @MessageBody() payload: any) {
    console.log('Received matched message:', payload);
    const receivedPayload = JSON.parse(payload);
    // 将收到的信息保存到数据库
    for (const iterator of receivedPayload) {
      iterator.status = OrderStatus.PENDING;
      this.transactionService.create(iterator)
    }
    return payload;
  }
}