import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskContainer {
  private taskContainer: Map<string, any> = new Map<string, any>();

  set(key: string, value: any): void {
    this.taskContainer.set(key, value);
  }

  get(key: string): any {
    return this.taskContainer.get(key);
  }

  has(key: string): boolean {
    return this.taskContainer.has(key);
  }

  delete(key: string): boolean {
    return this.taskContainer.delete(key);
  }

  size(): number {
    return this.taskContainer.size;
  }

  getFirstKey() {
    return [...this.taskContainer.keys()][0];
  }
}
