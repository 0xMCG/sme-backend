// import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Command } from 'commander';
import { PythonService } from '../python/python.service';
import { AppModule } from '../app.module';
import { ethers } from 'ethers';
const CryptoJS = require('crypto-js');

@Injectable()
export class NodeCommand {
  private program: Command;

  private encryptionKey: any;

  constructor(
    private readonly configService: ConfigService,
    private readonly pythonService: PythonService,
  ) {
    // @ts-ignore
    this.program = new Command();
    this.encryptionKey = this.configService.get('KEY');
    // console.log("this.encryptionKey", this.encryptionKey)
    this.program
      .command('en [privateKey]')
      .description('encrypt private Key')
      .action((privateKey) => {
        this.handleEncryptedPrivateKey(privateKey);
      });

    this.program
      .command('de [encryptedPrivateKey]')
      .description('decrypt private key')
      .action((encryptedPrivateKey) => {
        this.handleDecryptedPrivateKey(encryptedPrivateKey);
      });

    this.program
      .command('start')
      .description('start app')
      .action(() => {
        this.startBackgroundProgram();
      });

    this.program
      .command('py')
      .description('py exec')
      .action(() => {
        this.pythonExec();
      });

    // this.program
    //   .command('ws')
    //   .description('py exec')
    //   .action(() => {
    //     this.wsExec();
    // });
  }

  private async handleEncryptedPrivateKey(privateKey: string) {
    const password = this.encryptionKey; // 加密密码
    const encryptedPrivateKey = CryptoJS.AES.encrypt(
      privateKey,
      password,
    ).toString();
    console.log('Encrypted Private Key:', encryptedPrivateKey);
  }

  private async handleDecryptedPrivateKey(encryptedPrivateKey: string) {
    const decryptedBytes = CryptoJS.AES.decrypt(
      encryptedPrivateKey,
      this.encryptionKey,
    );
    const decryptedPrivateKey = decryptedBytes.toString(CryptoJS.enc.Utf8);
    console.log('Decrypted Private Key:', decryptedPrivateKey);
  }

  public run(argv: string[]): void {
    this.program.parse(argv);
  }

  private async startBackgroundProgram(): Promise<void> {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    await app.listen(3001);
  }

  private async pythonExec(): Promise<void> {
    const bigNumber = ethers.BigNumber.from(
      '0x46d6ad4957e14d6dded30169ad258a84198c7c50a3f3f9dbaac4528f44a638bd',
    );
    const data = await this.pythonService.executeScript(
      './src/python/generate_beta_distribution.py',
      [bigNumber.toString()],
    );

    const result = JSON.parse(data);
    console.log('data', result);
    console.log('data0', result[0]);
    console.log('data1', result[1]);
  }
}
