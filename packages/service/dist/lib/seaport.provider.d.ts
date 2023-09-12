import { ConfigService } from '@nestjs/config';
import { Seaport } from '@opensea/seaport-js';
export declare class SeaportProvider {
    private readonly configService;
    constructor(configService: ConfigService);
    getProvider(): Seaport;
}
