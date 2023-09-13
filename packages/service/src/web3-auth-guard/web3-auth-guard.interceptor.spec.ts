import { Web3AuthGuardInterceptor } from './web3-auth-guard.interceptor';

describe('Web3AuthGuardInterceptor', () => {
  it('should be defined', () => {
    expect(new Web3AuthGuardInterceptor()).toBeDefined();
  });
});
