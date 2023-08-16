import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ReservoirApi {
    constructor(private readonly configService: ConfigService) {}

    async getCollectionsTopsellingV1() {
        const apiKey = this.configService.get("RESERVOIR_API_KEY");
        const sdk = require('api')('@reservoirprotocol/v3.0#2n2re32lkmyg6l7');
        sdk.auth(apiKey);
        const response = await sdk.getCollectionsTopsellingV1({accept: '*/*'});
        return response?.data?.collections;
    }

    async getCollectionsV6() {
        const apiKey = this.configService.get("RESERVOIR_API_KEY");
        const sdk = require('api')('@reservoirprotocol/v3.0#2n2re32lkmyg6l7');
        sdk.auth(apiKey);
        const response = await sdk.getCollectionsV6({accept: '*/*'});
        return response?.data?.collections;
    }
}
