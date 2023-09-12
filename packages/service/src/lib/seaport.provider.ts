import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as seaport from '@opensea/seaport-js';
import { Seaport } from '@opensea/seaport-js';
import { ethers } from 'ethers';

@Injectable()
export class SeaportProvider {
  constructor(private readonly configService: ConfigService) {}
  getProvider(): Seaport {
    const provider = new ethers.providers.JsonRpcProvider(
      // "https://eth-sepolia.public.blastapi.io"
      this.configService.get('PROVIDER'),
    );
    const smeSeaport = new seaport.Seaport(provider);
    return smeSeaport;
  }
}
