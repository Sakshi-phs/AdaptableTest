import { LocalizedDataValueEnvir, TS } from 'eagle-e2e-js';

export const ENV = {
  dev: 'dev.az',
  backstage: 'backstage',
  stage: 'stage.az',
  prod: 'prod.az',
  localhost: 'localhost',
  rc: 'rc'
};

const externalDomain = 'eagleinvsys.com';
const internalDomain = 'eagleinvsys.com';
const envirSingleton = new LocalizedDataValueEnvir('ENVIR', ENV.dev);

/**
 * PlatformEnvirData provides data for use in tests that is sensitive to the environment the test runs on.
 * Required value is ENVIR which will be defaulted to dev, and is what jenkins will supply. All urls will be built
 * based on this value. By default, any lookup will return value which should always be the 1st in the hash.
 * If the environment needs specific data then an entry to the hash should be made for that environment. The keys should
 * always be lower case.
 */

// TODO - THIS SHOULD BE COMING FROM EAGLE-E2E-JS

export class PlatformEnvirData {
  static get envir() {
    return envirSingleton.getValue();
  }

  // Initialize class with default
  static buildUrl(appName: string = 'angular-basic', region: string = envirSingleton.getValue(), domain: string = internalDomain) {
    return `https://${appName}.${region}.${domain}`.replace(/\.\./g, '.');
  }

  static get appUrl() {
    return this.envPlatformUrl.appUrl;
  }

  static appApiUrl() {
    return this.envPlatformUrl.appApiUrl;
  }

  static apiUrl() {
    return this.envPlatformUrl.apiUrl;
  }

  static storybookUrl() {
    return this.envPlatformUrl.storybookUrl;
  }

  static dateWithKnownData() {
    return this.envPlatformUrl.dateWithKnownData;
  }

  private static get envPlatformUrl() {
    switch (PlatformEnvirData.envir) {
      case ENV.stage:
        return {
          appUrl: new TS.LocalizedDataValue({
            any: new LocalizedDataValueEnvir('INSIGHTS_URL', `${this.buildUrl('angular-basic', ENV.stage)}`)
          }),
          appApiUrl: new TS.LocalizedDataValue({
            any: new LocalizedDataValueEnvir('INSIGHTS_API_URL', `${this.buildUrl('api', ENV.stage)}/svc-angular-basic`)
          }),
          apiUrl: new TS.LocalizedDataValue({
            any: new LocalizedDataValueEnvir('API_URL', `${this.buildUrl('api', ENV.stage)}`)
          }),
          storybookUrl: new TS.LocalizedDataValue({
            any: new LocalizedDataValueEnvir('INSIGHTS_STORYBOOK_URL', `${this.buildUrl('angular-basic', ENV.stage)}/storybook`)
          }),
          dateWithKnownData: new TS.LocalizedDataValue({
            any: new LocalizedDataValueEnvir('KNOWN_DATE', '2018-08-28')
          })
        };
      case ENV.prod:
        return {
          appUrl: new TS.LocalizedDataValue({
            any: new LocalizedDataValueEnvir('INSIGHTS_URL', `${this.buildUrl('angular-basic', ENV.prod, externalDomain)}`)
          }),
          appApiUrl: new TS.LocalizedDataValue({
            any: new LocalizedDataValueEnvir('INSIGHTS_API_URL', `${this.buildUrl('api', ENV.prod, externalDomain)}/svc-angular-basic`)
          }),
          apiUrl: new TS.LocalizedDataValue({
            any: new LocalizedDataValueEnvir('API_URL', `${this.buildUrl('api', ENV.prod, externalDomain)}`)
          }),
          storybookUrl: new TS.LocalizedDataValue({
            any: new LocalizedDataValueEnvir(
              'INSIGHTS_STORYBOOK_URL',
              `${this.buildUrl('angular-basic', ENV.dev, externalDomain)}/storybook`
            )
          }),
          dateWithKnownData: new TS.LocalizedDataValue({
            any: new LocalizedDataValueEnvir('KNOWN_DATE', '2018-08-28')
          })
        };
      case ENV.localhost:
        return {
          appUrl: new TS.LocalizedDataValue({
            any: new LocalizedDataValueEnvir('INSIGHTS_URL', 'https://local.dev.az.eagleinvsys.com:4200')
          }),
          appApiUrl: new TS.LocalizedDataValue({
            any: new LocalizedDataValueEnvir('INSIGHTS_API_URL', 'https://local.dev.az.eagleinvsys.com:8080')
          }),
          apiUrl: new TS.LocalizedDataValue({
            any: new LocalizedDataValueEnvir('API_URL', 'https://local.dev.az.eagleinvsys.com:8080')
          }),
          storybookUrl: new TS.LocalizedDataValue({
            any: new LocalizedDataValueEnvir('INSIGHTS_STORYBOOK_URL', 'https://local.dev.az.eagleinvsys.com:9001')
          }),
          dateWithKnownData: new TS.LocalizedDataValue({
            any: new LocalizedDataValueEnvir('KNOWN_DATE', '2017-10-20')
          })
        };
      default:
        return {
          appUrl: new TS.LocalizedDataValue({
            any: new LocalizedDataValueEnvir('INSIGHTS_URL', `${this.buildUrl('angular-basic', ENV.dev)}`)
          }),
          appApiUrl: new TS.LocalizedDataValue({
            any: new LocalizedDataValueEnvir('INSIGHTS_API_URL', `${this.buildUrl('api')}/svc-angular-basic`)
          }),
          apiUrl: new TS.LocalizedDataValue({
            any: new LocalizedDataValueEnvir('API_URL', `${this.buildUrl('api')}`)
          }),
          storybookUrl: new TS.LocalizedDataValue({
            any: new LocalizedDataValueEnvir('INSIGHTS_STORYBOOK_URL', `${this.buildUrl('angular-basic', ENV.dev)}/storybook`)
          }),
          dateWithKnownData: new TS.LocalizedDataValue({
            any: new LocalizedDataValueEnvir('KNOWN_DATE', '2017-10-20')
          })
        };
    }
  }

  static getClientEnvir() {
    return [ENV.prod, ENV.stage];
  }
}
