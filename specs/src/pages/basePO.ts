import { IBasePo } from 'eagle-e2e-js';
import { dataProvider, platformCore } from '../helpers/platform.base';
import PlatformCore from '../helpers/platform.core';
import { PlatformText } from '../data/platform.text';
import { Web } from 'testah-js/src/util/web';

export const DATA_VIEW_LOCATORS = {
  DATA_LIST: '[data-e2e-id="dataListView"]',
  GENERATED_DATA: '[data-e2e-id="generate-data"]',
  GRID_LIST_VIEW: '[data-e2e-id="gridView"]'
};

// LOADING LOCATORS
const INSIGHTS_SPINNER = 'insights-spinner';
const GRID_LOADING_SPINNER = `${INSIGHTS_SPINNER} > div`;

export abstract class BasePO implements IBasePo {
  readonly url: string;
  public title: string;
  public platformCore: PlatformCore;
  public text: PlatformText;
  readonly web: Web;
  public test;
  public spinner: string;

  constructor(url, pageTitle, platformCoreV) {
    this.url = url;
    this.title = pageTitle.toUpperCase();
    this.platformCore = platformCoreV;
    this.web = platformCoreV.TS.web;
    this.text = platformCore.text;
    this.test = this.platformCore.getTest;
    this.spinner = GRID_LOADING_SPINNER;
    this.platformCore.TS.injectLogger.injectLoggingIntoObjectsFunctions(this, false, `@@ BasePo[${this.constructor.name}]`);
  }

  getSpinnerLocator() {
    return this.spinner;
  }

  getUrl() {
    return this.url;
  }

  getTitle() {
    return this.title;
  }

  async goto(assertPageIsLoaded = false) {
    await this.platformCore.helper.goto(this.getUrl());
    if (assertPageIsLoaded) {
      await this.assertPageIsLoaded(dataProvider.DEFAULT_PAUSE);
    }
    return this;
  }

  async getSpinner() {
    return this.web.$(this.getSpinnerLocator());
  }

  async waitForGridSpinnerLoading() {
    await this.web.browser.waitForAngular();
    await this.web.waitTillGone(GRID_LOADING_SPINNER, 5);
  }

  async isLoaded(waitTimeout) {
    await this.web.browser.waitForAngular();
    return this.web.waitForElementByTextPresent(DATA_VIEW_LOCATORS.GENERATED_DATA, 'Generate Data', true, waitTimeout);
  }

  async assertPageIsLoaded(waitTimeout = dataProvider.DEFAULT_WAIT_TIMEOUT): Promise<BasePO> {
    await expect(await this.isLoaded(waitTimeout)).toBeTruthy();
    return this;
  }

  getTest() {
    return this.test;
  }
}
