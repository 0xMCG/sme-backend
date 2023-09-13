import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as seaport from '@opensea/seaport-js';
import { Seaport } from '@opensea/seaport-js';
import { Contract, ethers, Wallet } from 'ethers';
import { SeaportABIvSME } from '../abi/Seaport_vSME_dual';
import type { Seaport as SMESeaport } from './typechain-types-dual/contracts/Seaport';

export const CONDUIT_KEYS_TO_CONDUIT = {
  '0x28c73a60ccf8c66c14eba8935984e616df2926e3aaaaaaaaaaaaaaaaaaaaaa00':
    '0x0681bc8f138ca32ed7725b91e8d11cfb6e10eb5f',
};

const smeSeaportAddress = '0xFBAf7DB4A17B0Ed9841cB8DeF69Eb0CFD52276aF';

@Injectable()
export class SeaportProvider {
  private signer: Wallet;

  private provider;

  constructor(private readonly configService: ConfigService) {
    const provider = new ethers.providers.JsonRpcProvider(
      'https://eth-sepolia.public.blastapi.io',
      // this.configService.get('PROVIDER'),
    );
    this.provider = provider;
    const privateKey = this.configService.get('MAKER') as string;
    const Signer = new ethers.Wallet(privateKey, provider);
    this.signer = Signer;
  }
  getProvider(): Seaport {
    return this.provider;
  }

  getContract(): SMESeaport {
    const smeContract = new Contract(
      smeSeaportAddress,
      SeaportABIvSME,
      this.signer,
    ) as SMESeaport;
    return smeContract;
  }
}
