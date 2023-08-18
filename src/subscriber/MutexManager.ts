import { Injectable } from '@nestjs/common';
import { Mutex } from 'async-mutex';

@Injectable()
export class MutexManager {
  private mutex: Mutex;

  constructor() {
    this.mutex = new Mutex();
  }

  async acquireLock(): Promise<() => void> {
    const release = await this.mutex.acquire();
    return release;
  }
}
