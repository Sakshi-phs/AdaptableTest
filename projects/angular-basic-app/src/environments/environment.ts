import 'zone.js/dist/zone-error';
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment-config.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular.json`.
import { version } from './version-todo';
import { EnvironmentConfigInterface } from '@ce/config-lib';
import { INSIGHTS_SERVICE_ID, ADMIN_SERVICE_ID, ADMIN_SERVICE_BASE_API_PATH, INSIGHTS_SERVICE_BASE_API_PATH } from './environment.local';

export const environment = {
  apiPrefix: 'api',
  baseDomain: 'dev.az.eagleinvsys.com',
  version,
  production: false,
  useSSL: false,
  services: [
    {
      id: INSIGHTS_SERVICE_ID,
      apiPrefixOverride: '',
      baseDomainOverride: 'http://localhost:8080',
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
