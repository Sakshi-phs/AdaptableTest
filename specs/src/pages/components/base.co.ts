import PlatformCore from '../../helpers/platform.core';
import { Web } from 'testah-js/src/util/web';

export class BaseCo {
  public platformCore: PlatformCore;
  readonly web: Web;
  public test: any;
  public componentLocator: string;
  public panelTitle: string;

  constructor(platformCore, componentLocator: string = '') {
    this.platformCore = platformCore;
    this.test = platformCore.getTest;
    this.web = platformCore.TS.web;
    this.componentLocator = componentLocator;
    platformCore.TS.injectLogger.injectLoggingIntoObjectsFunctions(this, false, `@@ BaseCo[${this.constructor.name}]`);
  }

  public async clickElement(locator: string) {
    return this.platformCore.helper.clickElement(locator);
  }

  public async setElementText(locator: string, text: string | number) {
    return (await this.getElement(locator)).sendKeys(text);
  }

  public async getElement(locator: string, waitForVisible: boolean = true) {
    return this.platformCore.getElement(locator, waitForVisible);
  }

  public async getComponentElement(locator: string, waitForVisible: boolean = true) {
    return this.getElement(`${this.componentLocator} ${locator}`, waitForVisible);
  }

  public async getElements(locator: string, waitForVisible: boolean = true) {
    return this.platformCore.getElements(locator, waitForVisible);
  }

  public async getComponentElements(locator: string, waitForVisible: boolean = true) {
    return this.getElements(`${this.componentLocator} ${locator}`, waitForVisible);
  }

  public async getElementCssValue(locator: string, value: string) {
    const element = await this.getElement(locator);
    return element.getCssValue(value);
  }

  public async getElementText(locator: string): Promise<string> {
    const element = await this.getElement(locator);
    return element.getText();
  }

  public async getElementsText(locator: string, waitForVisible?): Promise<Array<string>> {
    const list = await this.getElements(locator, waitForVisible);
    return this.web.getElementsText(list);
  }

  public async getComponentElementText(locator: string): Promise<string> {
    return this.getElementText(`${this.componentLocator} ${locator}`);
  }

  public async getComponentElementsText(locator: string): Promise<Array<string>> {
    return this.getElementsText(`${this.componentLocator} ${locator}`);
  }

  public async clickElementByText(locator: string, text: string) {
    return (await this.web.getElementByText(locator, text)).click();
  }

  async getElementColor(locator: string) {
    return this.getElementCssValue(locator, 'color');
  }
}
