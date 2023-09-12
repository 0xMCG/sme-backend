import { ConfigService } from '@nestjs/config';
export declare class EtherProvider {
    private readonly configService;
    private readonly provider;
    private readonly contract;
    private readonly smeSeaportAddress;
    constructor(configService: ConfigService);
    getProvider(): any;
    getContract(): any;
    getContractAddress(): any;
}
