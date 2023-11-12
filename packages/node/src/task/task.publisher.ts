import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import {PromiseOrValue} from "../lib/typechain-types-dual/common";
import {BigNumberish, BytesLike} from "ethers";

export interface Task {
  requestId: string;
  randomStrategy: any;
  randomWords: any[];
  makerOrder?: any[];
  takerOrder?: any[];
  premiumOrder?: any[];
  modeOrderFulfillments: any[];
}

export type OrderPrice = {
  orderHash: PromiseOrValue<BytesLike>;
  numerator: PromiseOrValue<BigNumberish>;
  denominator: PromiseOrValue<BigNumberish>;
  itemNumerator: PromiseOrValue<BigNumberish>;
  itemDenominator: PromiseOrValue<BigNumberish>;
  price: PromiseOrValue<BigNumberish>;
  itemSize: number;
}

@Injectable()
export class TaskPublisher {
  private readonly taskEventSubject = new Subject<Task>();

  public taskEvent$ = this.taskEventSubject.asObservable();

  emitTaskEvent(data: Task) {
    this.taskEventSubject.next(data);
  }
}
