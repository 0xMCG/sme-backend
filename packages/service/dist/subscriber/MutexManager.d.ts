export declare class MutexManager {
    private mutex;
    constructor();
    acquireLock(): Promise<() => void>;
}
