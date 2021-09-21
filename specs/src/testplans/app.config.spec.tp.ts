import * as platform from '../helpers/platform.base';
import { TS } from '../helpers/platform.base';
/* global __filename */
const test = platform.initialize(__filename);
const INSIGHTS_SERVICE_ID = 'svc-insights';
const INSIGHTS_SERVICE_BASE_PATH = `/${INSIGHTS_SERVICE_ID}`;

test.testplan(
  'App config tests',
  TS.meta().addRunTypeRegression().setTestStatusAutomated().setTestTypeUi().addComponent('appConfig'),
  () => {
    test.testcaseWithSteps('Verify different attribute in appConfig', platform.TS.meta(), async () => {
      const response = await platform.client.getAppConfig();
      await test.step('Validate Base domain is present in the response', async () => {
        test.assert('Check Base Domain added to app config.').expect(response.baseDomain).toBeTruthy();
      });
      await test.step('Validate use SSL is present in the response', async () => {
        test.assert('Check SSL option is added to app config.').expect(response.useSSL).toBeTruthy();
      });
      await test.step('Validate insights svc  object is present in the response', async () => {
        test
          .assert('Check insights svc object added to app config.')
          .expect(response.services.find((s) => s.id === INSIGHTS_SERVICE_ID))
          .not.toBeNull();
      });
      await test.step('Verify base api path is present as expected.', async () => {
        test
          .assert('Check base api path.')
          .expect(response.services.find((s) => s.id === INSIGHTS_SERVICE_ID).baseApiPath)
          .toEqual(INSIGHTS_SERVICE_BASE_PATH);
      });
    });
  }
);
