import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './schema/order.schema';
import { SeaportProvider } from '../lib/seaport.provider';
import {TransactionService} from "../transaction/transaction.service";
import {TransactionSchema} from "../transaction/schema/transaction.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: 'Order', schema: OrderSchema },
        { name: 'Transaction', schema: TransactionSchema },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, SeaportProvider],
  exports: [OrderService],
})
export class OrderModule {}
