import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import envConfig from './config/envConfig';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { OrderModule } from './order/order.module';
import { CollectionModule } from './collection/collection.module';

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
    OrderModule,
    CollectionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
