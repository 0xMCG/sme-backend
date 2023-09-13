import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { SeaportABIvSME } from '../abi/Seaport_vSME';

@Injectable()
export class EtherProvider {
  private readonly provider;

  private readonly contract;

  private readonly smeSeaportAddress;

  constructor(private readonly configService: ConfigService) {
    this.provider = new ethers.providers.JsonRpcProvider(
      this.configService.get('RPC_PROVIDER'),
    );

    this.smeSeaportAddress = '0x9c1687C953Fff856e244A152995B96e569C4762A';

    this.contract = new ethers.Contract(
      this.smeSeaportAddress,
      SeaportABIvSME,
      this.provider,
    );
  }

  getProvider() {
    return this.provider;
  }

  getContract() {
    return this.contract;
  }

  getContractAddress() {
    return this.smeSeaportAddress;
  }
}
