import { environment } from './environment';
import { environment as devEnv } from './environment.dev';
import { environment as localEnv } from './environment.local';
import { environment as dockerEnv } from './environment.docker';
import { environment as prodEnv } from './environment.prod';

describe('Environments', () => {
  it('environment', () => {
    expect(environment).toBeTruthy();
  });

  it('dev', () => {
    expect(devEnv).toBeTruthy();
  });

  it('localEnv', () => {
    expect(localEnv).toBeTruthy();
  });

  it('dockerEnv', () => {
    expect(dockerEnv).toBeTruthy();
  });

  it('prodEnv', () => {
    expect(prodEnv).toBeTruthy();
  });
});
