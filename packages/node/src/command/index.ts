// import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Command } from 'commander';
import { AppModule } from '../app.module';
const CryptoJS = require('crypto-js');

@Injectable()
export class NodeCommand {
  private program: Command;
  
  private encryptionKey: any;

  constructor(private readonly configService: ConfigService) {
    // @ts-ignore
    this.program = new Command();
    this.encryptionKey = this.configService.get('KEY');

    console.log("this.encryptionKey", this.encryptionKey)

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
  }

  private async handleEncryptedPrivateKey(privateKey: string) {
    const password = this.encryptionKey; // 加密密码
    const encryptedPrivateKey = CryptoJS.AES.encrypt(privateKey, password).toString();
    console.log('Encrypted Private Key:', encryptedPrivateKey);
  }

  private async handleDecryptedPrivateKey(encryptedPrivateKey: string) {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedPrivateKey, this.encryptionKey);
    const decryptedPrivateKey = decryptedBytes.toString(CryptoJS.enc.Utf8);
    console.log('Decrypted Private Key:', decryptedPrivateKey);
  }

  public run(argv: string[]): void {
    this.program.parse(argv);
  }

  private async startBackgroundProgram(): Promise<void> {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    await app.listen(3000);
  }
}
