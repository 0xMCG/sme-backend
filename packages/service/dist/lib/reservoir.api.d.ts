import { ConfigService } from '@nestjs/config';
export declare class ReservoirApi {
    private readonly configService;
    constructor(configService: ConfigService);
    getCollectionsTopsellingV1(): Promise<any>;
    getCollectionsV6(): Promise<any>;
}
