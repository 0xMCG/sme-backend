import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { SeaportABIvVRF } from '../abi/Seaport_VRF';
import { ERC721ABI } from '../abi/ERC721';
import { SeaportABIvSME } from '../abi/Seaport_vSME_dual';

@Injectable()
export class EtherProvider {
  private readonly provider;

  private readonly contract;

  private readonly vrfContract;

  private readonly erc721Contract;

  private readonly smeSeaportAddress;

  private readonly erc721Address;

  constructor(private readonly configService: ConfigService) {
    this.provider = new ethers.providers.JsonRpcProvider(
      this.configService.get('RPC_PROVIDER'),
    );

    this.smeSeaportAddress = '0xDe215cECCb5707Cad33a9500Cede0C585A42FDA2';
    this.erc721Address = '0xE4E39D40d1b9c70dcd115FEA8DaEF242194f2cC7';

    this.contract = new ethers.Contract(
      // this.smeSeaportAddress,
      '0xC619D985a88e341B618C23a543B8Efe2c55D1b37',
      SeaportABIvVRF,
      this.provider,
    );

    this.vrfContract = new ethers.Contract(
      // this.smeSeaportAddress,
      '0xC619D985a88e341B618C23a543B8Efe2c55D1b37',
      SeaportABIvVRF,
      this.provider,
    );

    this.erc721Contract = new ethers.Contract(
      this.erc721Address,
      ERC721ABI,
      this.provider,
    );
  }

  getProvider() {
    return this.provider;
  }

  getVrfContract() {
    return this.vrfContract;
  }

  getContract() {
    return this.contract;
  }

  getErc721Contract() {
    return this.erc721Contract;
  }

  getContractAddress() {
    return this.smeSeaportAddress;
  }
}
