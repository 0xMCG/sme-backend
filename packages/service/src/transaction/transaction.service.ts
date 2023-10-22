import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionService {

  constructor(@InjectModel('Transaction') private readonly transactionModel) {
    
  }

  async create(createTransactionDto: CreateTransactionDto) {
    const model = new this.transactionModel(createTransactionDto);
    return await model.save();
  }

  async findAll() {
    const result = await this.transactionModel.find({}).exec();
    const uniqueArray = result && result.reduce((accumulator: CreateTransactionDto[], currentItem: CreateTransactionDto) => {
      const existingItem = accumulator.find(item => item.orderHash === currentItem.orderHash);
      if (!existingItem) {
        accumulator.push(currentItem);
      }
      return accumulator;
    }, []);
    return uniqueArray;
  }

  async topWinnings() {
    const result = await this.transactionModel.aggregate([
      { $group: { _id: '$orderHash', count: { $sum: 1 }, doc: { $first: '$$ROOT' } } },
      { $replaceRoot: { newRoot: '$doc' } },
      { $addFields: { priceNumber: { $convert: { input: '$price', to: 'double' } } } },
      { $sort: { priceNumber: -1 } },  // 根据 priceNumber 字段进行降序排序
      { $limit: 10 }  // 获取前十个记录
    ]);

    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }

  async updateTransactionStatus(hash: string, status: string) {
    return this.transactionModel
      .updateOne(
        { orderHash: hash },
        {
          $set: { status },
        },
      )
      .exec();
  }
}
