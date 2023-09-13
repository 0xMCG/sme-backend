import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MapContainer } from '../map.container';

@WebSocketGateway()
export class SmeWebsocketGateway {

  constructor(private readonly mapContainer: MapContainer) {}
  
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

  @SubscribeMessage('task')
  handleChatMessage(client: Socket, @MessageBody() payload: any) {
    console.log('Received task message:', payload);
    const receivedPayload = JSON.parse(payload);
    this.mapContainer.set(receivedPayload.key, receivedPayload.value);
    // this.server.emit('chat', payload); // 将消息广播给所有连接的客户端
    return payload;
  }

}