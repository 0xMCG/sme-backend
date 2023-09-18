import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubscriberModule } from './subscriber/subscriber.module';
import { ConfigModule } from '@nestjs/config';
import { ContractEventSubscribeService } from './subscriber/contractEventSubscribe.service';
import { EtherProvider } from './lib/ether.provider';
import { ScheduleModule } from '@nestjs/schedule';
import { PythonService } from './python/python.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true, // 设置为全局
      // envFilePath: [envConfig.path],
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
    }),
    SubscriberModule,
  ],
  controllers: [AppController],
  providers: [AppService, ContractEventSubscribeService, EtherProvider, PythonService],
})
export class AppModule {}
