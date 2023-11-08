import { Injectable } from '@nestjs/common';

@Injectable()
export class MapContainer {
  private globalMap: Map<string, any> = new Map<string, any>();

  set(key: string, value: any): void {
    this.globalMap.set(key, value);
  }

  get(key: string): any {
    return this.globalMap.get(key);
  }

  has(key: string): boolean {
    return this.globalMap.has(key);
  }

  delete(key: string): boolean {
    return this.globalMap.delete(key);
  }

  size(): number {
    return this.globalMap.size;
  }

  getFirstKey() {
    return [...this.globalMap.keys()][0];
  }
}
