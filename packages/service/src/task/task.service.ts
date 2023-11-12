import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TaskStatus } from '../order/types';

@Injectable()
export class TaskService {

  constructor(@InjectModel('Task') private readonly taskModel) {}

  findAll() {
    return this.taskModel.find().exec();
  }

  findOne(requestId: string) {
    return this.taskModel.findOne({requestId}).exec();;
  }

  async create(data: { requestId: string, orderHashes: string[] }) {
    const model = new this.taskModel({
      requestId: data.requestId,
      orderHashes: data.orderHashes,
      status: TaskStatus.REQUESTED
    });

    await model.save()
  }

  update(requestId: string, status: string) {
    return this.taskModel
      .updateOne(
        { requestId },
        {
          $set: { status },
        },
      )
      .exec();
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
