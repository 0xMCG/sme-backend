export declare class BlockService {
    private readonly blockSchema;
    constructor(blockSchema: any);
    create(blockNumber: number): any;
    findOne(): any;
    update(id: string, block: number): any;
}
