import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as seaport from '@opensea/seaport-js';
import { Seaport } from '@opensea/seaport-js';
import { Contract, ethers, Wallet } from 'ethers';
import { SeaportABIvSME } from '../abi/Seaport_vSME_dual';
import { testAbi } from '../abi/test';
import type { Seaport as SMESeaport } from './typechain-types-dual/contracts/Seaport';

export const CONDUIT_KEYS_TO_CONDUIT = {
  '0x28c73a60ccf8c66c14eba8935984e616df2926e3aaaaaaaaaaaaaaaaaaaaaa00':
    '0x0681bc8f138ca32ed7725b91e8d11cfb6e10eb5f',
};

const smeSeaportAddress = '0xDe215cECCb5707Cad33a9500Cede0C585A42FDA2';

const testERC20Address2 = '0x6c877a0f432feaab6052d8cc4ae2cf3d686d589f';
const testERC20Address = '0x8D4E2c8bc6b1E4Fa0ED829E6786E9096dd6DC265';

@Injectable()
export class SeaportProvider {
  private signer: Wallet;

  private provider;

  private seaport;

  private testContract;

  private makerPrivateKey;
  private takerPrivateKey;

  constructor(private readonly configService: ConfigService) {
    const provider = new ethers.providers.JsonRpcProvider(
      'https://eth-sepolia.public.blastapi.io',
      // this.configService.get('PROVIDER'),
    );
    this.provider = provider;
    this.makerPrivateKey = this.configService.get('MAKER') as string;
    this.takerPrivateKey = this.configService.get('TAKER') as string;
    const Signer = new ethers.Wallet(this.makerPrivateKey, provider);
    this.signer = Signer;
    this.testContract = new Contract(
      '0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625',
      testAbi,
    );

    this.seaport = new Seaport(Signer, {
      overrides: { contractAddress: smeSeaportAddress },
      conduitKeyToConduit: CONDUIT_KEYS_TO_CONDUIT,
    });
  }
  getProvider(): Seaport {
    return this.provider;
  }

  getSeaport(): Seaport {
    return this.seaport;
  }

  getContract(): SMESeaport {
    const smeContract = new Contract(
      smeSeaportAddress,
      SeaportABIvSME,
      this.signer,
    ) as SMESeaport;
    return smeContract;
  }

  getTestContract(): SMESeaport {
    return this.testContract;
  }

  async build_bid_scenario() {
    const takerOrder = await this.build_taker_order_for_bid();
    const makerOrder = await this.build_maker_order_for_bid();
    const makerOrder2 = await this.build_maker_order2_for_bid();
    return [takerOrder, makerOrder, makerOrder2];
  }

  async build_taker_order_for_bid() {
    // const privateKey = process.env["TAKER"] as string;
    const Signer = new ethers.Wallet(this.takerPrivateKey, this.provider);

    const seaport = new Seaport(Signer, {
      overrides: { contractAddress: smeSeaportAddress },
      conduitKeyToConduit: CONDUIT_KEYS_TO_CONDUIT,
    });

    const offerer = '0x53B3F192A56a9cdA260476974443634a96529c72';
    const { executeAllActions } = await seaport.createOrder(
      {
        zone: '0x0000000000000000000000000000000000000000',
        conduitKey:
          '0x28c73a60ccf8c66c14eba8935984e616df2926e3aaaaaaaaaaaaaaaaaaaaaa00',
        startTime: Math.floor(new Date().getTime() / 1000 - 60 * 60).toString(),
        endTime: Math.floor(new Date().getTime() / 1000 + 60 * 60).toString(),
        consideration: [
          {
            amount: ethers.utils.parseEther('0.022').toString(),
            token: testERC20Address2,
            endAmount: ethers.utils.parseEther('0.054').toString(),
          },
        ],
        offer: [
          {
            amount: ethers.utils.parseEther('0.000020').toString(),
            token: testERC20Address,
            endAmount: ethers.utils.parseEther('0.000020').toString(),
          },
        ],
      },
      offerer,
    );

    const order = await executeAllActions();
    return order;
  }

  async build_maker_order_for_bid() {
    // const privateKey = process.env["MAKER"] as string;
    const Signer = new ethers.Wallet(this.makerPrivateKey, this.provider);

    const seaport = new Seaport(Signer, {
      overrides: { contractAddress: smeSeaportAddress },
      conduitKeyToConduit: CONDUIT_KEYS_TO_CONDUIT,
    });
    const offerer = '0x28c73A60ccF8c66c14EbA8935984e616Df2926e3';
    const { executeAllActions } = await seaport.createOrder(
      {
        zone: '0x0000000000000000000000000000000000000000',
        conduitKey:
          '0x28c73a60ccf8c66c14eba8935984e616df2926e3aaaaaaaaaaaaaaaaaaaaaa00',
        startTime: Math.floor(new Date().getTime() / 1000 - 60 * 60).toString(),
        endTime: Math.floor(new Date().getTime() / 1000 + 60 * 60).toString(),
        offer: [
          {
            amount: ethers.utils.parseEther('0.002').toString(),
            token: testERC20Address2,
            endAmount: ethers.utils.parseEther('0.004').toString(),
          },
        ],
        consideration: [
          {
            amount: ethers.utils.parseEther('0.00002').toString(),
            token: testERC20Address,
            endAmount: ethers.utils.parseEther('0.00002').toString(),
            recipient: offerer,
          },
        ],
      },
      offerer,
    );

    const order = await executeAllActions();
    return order;
  }

  async build_maker_order2_for_bid() {
    // const privateKey = process.env["MAKER"] as string;
    const Signer = new ethers.Wallet(this.makerPrivateKey, this.provider);

    const seaport = new Seaport(Signer, {
      overrides: { contractAddress: smeSeaportAddress },
      conduitKeyToConduit: CONDUIT_KEYS_TO_CONDUIT,
    });
    const offerer = '0x28c73A60ccF8c66c14EbA8935984e616Df2926e3';
    const { executeAllActions } = await seaport.createOrder(
      {
        zone: '0x0000000000000000000000000000000000000000',
        conduitKey:
          '0x28c73a60ccf8c66c14eba8935984e616df2926e3aaaaaaaaaaaaaaaaaaaaaa00',
        startTime: Math.floor(new Date().getTime() / 1000 - 60 * 60).toString(),
        endTime: Math.floor(new Date().getTime() / 1000 + 60 * 60).toString(),
        offer: [
          {
            amount: ethers.utils.parseEther('0.02').toString(),
            token: testERC20Address2,
            endAmount: ethers.utils.parseEther('0.05').toString(),
          },
        ],
        consideration: [
          {
            amount: ethers.utils.parseEther('0.00001').toString(),
            token: testERC20Address,
            endAmount: ethers.utils.parseEther('0.00001').toString(),
            recipient: offerer,
          },
        ],
      },
      offerer,
    );

    const order = await executeAllActions();
    return order;
  }
}
