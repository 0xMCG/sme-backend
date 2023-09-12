import { CreateCollectionDto } from './dto/create-collection.dto';
import { ReservoirApi } from '../lib/reservoir.api';
export declare class CollectionService {
    private readonly reservoirApi;
    private readonly hotTopSchema;
    private readonly sellingTopSchema;
    constructor(reservoirApi: ReservoirApi, hotTopSchema: any, sellingTopSchema: any);
    create(createCollectionDto: CreateCollectionDto): string;
    sellingTop(): any;
    hotTop(): any;
    findAll(): string;
    findOne(id: string): any;
}
