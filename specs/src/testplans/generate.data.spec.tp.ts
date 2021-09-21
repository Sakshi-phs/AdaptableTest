import * as platform from '../helpers/platform.base';
import { TS } from '../helpers/platform.base';
import { DATA_GRID_VIEW_TABLE, DATA_LIST_VIEW_TABLE, E2eTestPO } from '../pages/e2eTestPO';
import { SEARCH_RESULTS_ITEM, SEARCH_RESULTS_LABEL } from '../pages/components/search.bar.co';

const test = platform.initialize(__filename);
const e2eTestPO = platform.pages.getPage<E2eTestPO>(platform.PageNames.E2eTestPage);
const tableCo = e2eTestPO.getComponent(e2eTestPO.componentNames.Table);
const searchBarCo = e2eTestPO.getComponent(e2eTestPO.componentNames.SearchBar);

test.testplan(
  'Validate the top row - Generate Data Tests, Error & No Data',
  TS.meta().addRunTypeRegression().setTestStatusAutomated().setTestTypeUi().addComponent('appConfig'),
  () => {
    beforeAll(async () => {
      await platform.helper.goto();
      await e2eTestPO.assertPageIsLoaded();
    });

    test.testcaseWithSteps('Verify with correct credentials results in valid login and then logout.', platform.TS.meta(), async () => {
      // await test.step('Click the protected button and wait for login', async () => {
      //   await e2eTestPO.clickProtectedPageBtn();
      //   await platform.helper.waitForLoginLoad();
      // });
      // await test.step('Logging into platform app', async () => {
      //   await platform.login.setCredentials(
      //     platform.envir.e2eTester1Username().toUpperCase(),
      //     platform.envir.defaultPassword(),
      //     platform.envir.e2eTester1MFA()
      //   );
      //   await platform.helper.waitForLoad();
      //   await test
      //     .assert('Check that login was successful.')
      //     .expect(await platform.platformCore.browser.getCurrentUrl())
      //     .not.toContain('login');
      // });
    });

    test.testcaseWithSteps('Check that we click generate data and data is present', platform.TS.meta(), async () => {
      let initialGeneratedData, actualGeneratedData;
      await test.step('Validate the title text and get the initial data', async () => {
        test
          .assert('Validate the header title text')
          .expect((await e2eTestPO.getTitleHeader()).toUpperCase())
          .toEqual(await e2eTestPO.getTitle());
        initialGeneratedData = await e2eTestPO.getGeneratedDataLength();
      });
      await test.step('Click the Generate Data button, wait for the loading spinner, & validate that data is shown', async () => {
        await e2eTestPO.clickGenerateDataBtn();
        await e2eTestPO.waitForGridSpinnerLoading();
        actualGeneratedData = await e2eTestPO.getGeneratedDataLength();
        test.assert('Validate that data is now shown').expect(actualGeneratedData).toBeGreaterThan(initialGeneratedData);
      });
      await test.step('Scroll down to the last element, validate that the spinner is shown, and more data is generated', async () => {
        await tableCo.scrollToLastRowInTable();
        await e2eTestPO.waitForGridSpinnerLoading();
        test
          .assert('Validate that data generated is now larger')
          .expect(await e2eTestPO.getGeneratedDataLength())
          .toBeGreaterThan(actualGeneratedData);
      });
      await test.step('After clicking on the Generate Error button, verify the error text', async () => {
        await e2eTestPO.clickGenerateErrorBtn();
        await e2eTestPO.waitForGridSpinnerLoading();
        test.assert('Verify error message result').expect(tableCo.errorMessageResultText()).toEqual(platform.text.generatedErrorMessage);
      });
      await test.step('No Data should show after clicking Generate No Data button', async () => {
        await e2eTestPO.clickGenerateNoDataBtn();
        await e2eTestPO.waitForGridSpinnerLoading();
        test
          .assert('Verify error message is showing no data')
          .expect(tableCo.errorMessageResultText())
          .toEqual(platform.text.generatedNoDataMessage);
      });
    });

    test.testcaseWithSteps('Validate List View and Grid View', platform.TS.meta(), async () => {
      await test.step('Validate that the List View is preselected', async () => {
        await e2eTestPO.clickGenerateDataBtn();
        await e2eTestPO.waitForGridSpinnerLoading();
        test
          .assert('List View should already be preselected')
          .expect(await e2eTestPO.whichViewIsSelected())
          .toBe('listView');
        test
          .assert('List View table should be present')
          .expect(await (await platform.TS.web.$(DATA_LIST_VIEW_TABLE)).isPresent())
          .toBe(true);
      });
      await test.step('Validate the Grid View after selection', async () => {
        await e2eTestPO.clickGridView();
        test
          .assert('Grid view should be selected')
          .expect(await e2eTestPO.whichViewIsSelected())
          .toEqual('gridView');
        test
          .assert('Grid View table should be present')
          .expect(await (await platform.TS.web.$(DATA_GRID_VIEW_TABLE)).isPresent())
          .toBeTruthy();
      });
    });

    test.testcaseWithSteps('The search libraries should show the selected values', platform.TS.meta(), async () => {
      const expectedResultsArray = ['@ce/config-lib', '@ce/auth-lib', '@ce/platform-lib', '@ce/danda-angular-lib'];
      await test.step('Validate each item we select and search label updates', async () => {
        await searchBarCo.clickSearchLibraries();
        await expectedResultsArray.map(async (results, index) => {
          await searchBarCo.clickElementByText(SEARCH_RESULTS_ITEM, results);
        });
        await searchBarCo.clickSearchLibrariesArrowDropdown();
        test
          .assert(`Verify that 4 (for the tag) is still present`)
          .expect(await searchBarCo.getElementText(SEARCH_RESULTS_LABEL))
          .toEqual('4');
      });
      await test.step('Check that generate data does not affect the search results label', async () => {
        await e2eTestPO.clickGenerateDataBtn();
        await e2eTestPO.waitForGridSpinnerLoading();
        await searchBarCo.clickSearchLibraries();
        await searchBarCo.clickSearchLibrariesArrowDropdown();
        test
          .assert(`Verify that 4 (for the tag) is still present`)
          .expect(await searchBarCo.getElementText(SEARCH_RESULTS_LABEL))
          .toEqual('4');
      });
      await test.step('Click search libraries and unselected the results', async () => {
        await searchBarCo.clickSearchLibrariesArrowDropdown();
        await expectedResultsArray.map(async (results) => {
          await searchBarCo.clickElementByText(SEARCH_RESULTS_ITEM, results);
        });
      });
      await test.step('Search for an unavailable result and verify no result shown', async () => {
        await searchBarCo.setInputSearch('@ce/config-lib');
        await searchBarCo.getSearchResults(true);
        await searchBarCo.setInputSearch('fake lib');
        await searchBarCo.getSearchResults(false);
      });
    });
  }
);
