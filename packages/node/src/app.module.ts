import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubscriberModule } from './subscriber/subscriber.module';
import { ConfigModule } from '@nestjs/config';
import { ContractEventSubscribeService } from './subscriber/contractEventSubscribe.service';
import { EtherProvider } from './lib/ether.provider';
import { ScheduleModule } from '@nestjs/schedule';
import { PythonService } from './python/python.service';
import { WebSocketClientModule } from './websocket/websocket.client.module';
import { WebSocketClient } from './websocket/websocket.client';
import { SeaportProvider } from './lib/seaport.provider';
import { GlobalModule } from './global.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true, // 设置为全局
      // envFilePath: [envConfig.path],
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
    }),
    SubscriberModule,
    WebSocketClientModule,
    GlobalModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ContractEventSubscribeService,
    EtherProvider,
    PythonService,
    WebSocketClient,
    SeaportProvider,
  ],
})
export class AppModule {}
