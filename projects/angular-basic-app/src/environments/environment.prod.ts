import { version } from './version-todo';
import { EnvironmentConfigInterface } from '@ce/config-lib';
import { INSIGHTS_SERVICE_ID, INSIGHTS_SERVICE_BASE_API_PATH, ADMIN_SERVICE_ID, ADMIN_SERVICE_BASE_API_PATH } from './environment.local';

export const environment = {
  apiPrefix: 'apps',
  baseDomain: 'prod.az.eagleinvsys.com',
  version,
  production: true,
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
