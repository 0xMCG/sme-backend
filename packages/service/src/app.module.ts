import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { OrderModule } from './order/order.module';
import { CollectionModule } from './collection/collection.module';
import { SubscribeModule } from './subscriber/subscribe.module';
import { BlockModule } from './block/block.module';
import { ContractEventSubscribeService } from './subscriber/contractEventSubscribe.service';
import { EtherProvider } from './lib/ether.provider';
import { BlockService } from './block/block.service';
import { SeaportProvider } from './lib/seaport.provider';
import { OrderService } from './order/order.service';
import { OrderSchema } from './order/schema/order.schema';
import { BlockSchema } from './block/schema/block.schema';
import { SystemModule } from './system/system.module';
import { SmeWebsocketGateway } from './websocket/sme.websocket.gateway';
import { TaskModule } from './task/task.module';
import { GlobalModule } from './global.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 设置为全局
      // envFilePath: [envConfig.path],
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get('DB_HOST', 'localhost'), // 主机，默认为localhost
          user: configService.get('DB_USER', 'admin'), // 用户名
          pass: configService.get('DB_PASS', 'admin'), // 密码
          dbName: configService.get('DB_NAME', 'admin'), //数据库名
        };
      },
    }),
    MongooseModule.forFeature([
      { name: 'Order', schema: OrderSchema },
      { name: 'Block', schema: BlockSchema },
    ]),

    OrderModule,
    CollectionModule,
    SubscribeModule,
    BlockModule,
    SystemModule,
    TaskModule,
    GlobalModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ContractEventSubscribeService,
    EtherProvider,
    BlockService,
    SmeWebsocketGateway
  ],
})
export class AppModule {}
