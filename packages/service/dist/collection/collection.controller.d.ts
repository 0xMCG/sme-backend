import { CollectionService } from './collection.service';
export declare class CollectionController {
    private readonly collectionService;
    constructor(collectionService: CollectionService);
    findHotTop(): any;
    findOne(id: string): any;
}
