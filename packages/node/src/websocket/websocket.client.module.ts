import { Module } from '@nestjs/common';
import { EtherProvider } from '../lib/ether.provider';
import { SeaportProvider } from '../lib/seaport.provider';
import { WebSocketClient } from './websocket.client';

@Module({
  providers: [WebSocketClient, SeaportProvider, EtherProvider],
  exports: [WebSocketClient],
})
export class WebSocketClientModule {}
