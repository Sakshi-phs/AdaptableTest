import { version } from './version-todo';
import { EnvironmentConfigInterface } from '@ce/config-lib';
import { INSIGHTS_SERVICE_ID, ADMIN_SERVICE_ID, ADMIN_SERVICE_BASE_API_PATH } from './environment.local';

export const environment = {
  apiPrefix: 'apps',
  baseDomain: 'dev.az.eagleinvsys.com',
  version,
  useSSL: false,
  production: false,
  services: [
    {
      id: INSIGHTS_SERVICE_ID,
      apiPrefixOverride: '',
      baseDomainOverride: 'http://localhost:8081',
      baseApiPath: ''
    },
    {
      id: ADMIN_SERVICE_ID,
      apiPrefixOverride: null,
      baseDomainOverride: null,
      baseApiPath: ADMIN_SERVICE_BASE_API_PATH
    }
  ]
} as EnvironmentConfigInterface;
