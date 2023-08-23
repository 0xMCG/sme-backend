import {
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { ethers } from 'ethers';

interface AuthData {
  address: string;
  signature: string;
  msg: string;
}

function addressesEquals(address: string, recoverAddress: string): boolean {
  return _.toLower(_.trim(recoverAddress)) === _.toLower(_.trim(address));
}

function authEth(data: AuthData): boolean {
  const { address, signature } = data;

  const signatureWithPrefix = _.startsWith(_.toLower(signature), '0x')
    ? signature
    : `0x${signature}`;

  // For some signing tools like mycrypto, we can directly verify the signature
  let recoveredAddress = ethers.utils.verifyMessage(
    address,
    signatureWithPrefix,
  );
  if (addressesEquals(address, recoveredAddress)) {
    return true;
  }
  // Some some signing tools like myetherwallet, we need hash the message before recover
  const hashBytes = ethers.utils.arrayify(address);
  const messageHash = ethers.utils.hashMessage(hashBytes);
  recoveredAddress = ethers.utils.recoverAddress(
    messageHash,
    signatureWithPrefix,
  );
  return addressesEquals(address, recoveredAddress);
}

const pkSigDelimiter = ':';
const chainTypeDelimiter = '-';

@Injectable()
export class Web3AuthGuardInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    // Get request header authorization
    const authToken = request.headers['authorization'];

    if (
      !authToken ||
      (!authToken.startsWith('Bearer ') && !authToken.startsWith('Basic '))
    ) {
      throw new ForbiddenException('Invalid authorization header');
    }

    try {
      // 2. Decode AuthToken
      const base64Credentials = _.split(_.trim(authToken), ' ')[1];
      const credentials = Buffer.from(base64Credentials, 'base64').toString(
        'ascii',
      );

      // 3. Parse AuthToken as `ChainType[crust/cru]-AccountAddress:SignedMsg`
      const [passedAddress, signature, signMsg] = _.split(
        credentials,
        pkSigDelimiter,
      );

      // 4. Extract chain type, default: 'cru' if not specified
      const gaugedAddress = _.includes(passedAddress, chainTypeDelimiter)
        ? passedAddress
        : `cru${chainTypeDelimiter}${passedAddress}`;

      const [_chainName, address] = _.split(gaugedAddress, chainTypeDelimiter);

      if (authEth({ address, signature, msg: signMsg ? signMsg : address })) {
        const data = request.body;
        data.executor = address
        return next.handle();
      } else {
        throw new ForbiddenException('Invalid authorization header');
      }
    } catch (error) {
      throw new ForbiddenException('Invalid authorization header');
    }
  }
}
