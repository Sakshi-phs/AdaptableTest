import { version } from './version-todo';
import { EnvironmentConfigInterface } from '@ce/config-lib';
import { INSIGHTS_SERVICE_ID, ADMIN_SERVICE_ID, ADMIN_SERVICE_BASE_API_PATH, INSIGHTS_SERVICE_BASE_API_PATH } from './environment.local';

export const environment = {
  apiPrefix: 'apps',
  baseDomain: 'dev.az.eagleinvsys.com',
  version,
  production: false,
  useSSL: true,
  services: [
    {
      id: INSIGHTS_SERVICE_ID,
      apiPrefixOverride: null,
      baseDomainOverride: null,
      baseApiPath: INSIGHTS_SERVICE_BASE_API_PATH
    },
    {
      id: ADMIN_SERVICE_ID,
      apiPrefixOverride: null,
      baseDomainOverride: null,
      baseApiPath: ADMIN_SERVICE_BASE_API_PATH
    }
  ]
} as EnvironmentConfigInterface;
