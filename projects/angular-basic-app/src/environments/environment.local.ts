import { version } from './version-todo';
import { EnvironmentConfigInterface } from '@ce/config-lib';

export const INSIGHTS_SERVICE_ID = 'svc-insights';
export const INSIGHTS_SERVICE_BASE_API_PATH = '/api/vault/insights';
export const ADMIN_SERVICE_ID = 'svc-admin';
export const ADMIN_SERVICE_BASE_API_PATH = '/api/vault/admin';

export const environment = {
  apiPrefix: 'apps',
  baseDomain: 'dev.az.eagleinvsys.com',
  version,
  production: false,
  useSSL: true,
  services: [
    {
      id: INSIGHTS_SERVICE_ID,
      apiPrefixOverride: '',
      baseDomainOverride: 'local.dev.az.eagleinvsys.com:8080',
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
