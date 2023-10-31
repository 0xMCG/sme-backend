import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as seaport from '@opensea/seaport-js';
import { Seaport } from '@opensea/seaport-js';
import { balanceOf } from '@opensea/seaport-js/lib/utils/balance';
import { Item } from '@opensea/seaport-js/lib/types';
import { providers as multicallProviders } from "@0xsequence/multicall";
import { ethers } from 'ethers';

@Injectable()
export class SeaportProvider {
  multicallProvider: multicallProviders.MulticallProvider;
  provider: ethers.providers.JsonRpcProvider;
  constructor(private readonly configService: ConfigService) {
    this.provider = new ethers.providers.JsonRpcProvider(
      // "https://eth-sepolia.public.blastapi.io"
      this.configService.get('RPC_PROVIDER'),
    );
    this.multicallProvider = new multicallProviders.MulticallProvider(this.provider);
  }
  getProvider(): Seaport {
    const smeSeaport = new seaport.Seaport(this.provider);
    return smeSeaport;
  }

  async testBalanceOf(owner: string, item: Item) {
    console.log('owner::', owner)
    return await balanceOf(owner, item, this.multicallProvider);
  }
}
