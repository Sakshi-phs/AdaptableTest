import { IHelper } from 'eagle-e2e-js';
import * as platform from './platform.base';
import { DEFAULT_WAIT_TIMEOUT, MEDIUM_WAIT_TIMEOUT, SMALL_WAIT_TIMEOUT } from '../data/dataProvider';
import * as lodash from 'lodash';

export class PlatformHelper implements IHelper {
  public ts: any;
  public elements: any;
  public text: string;
  public envir: any;
  public _: any;

  constructor(TS, elements, text, envir) {
    this.ts = TS;
    this.elements = elements;
    this.text = text;
    this.envir = envir;
    this._ = lodash;
  }

  async goto(url = this.envir.appUrl()) {
    if (!url.startsWith('http')) {
      if (!url.startsWith('/')) {
        url = `/${url}`;
      }
      url = `${this.envir.appUrl()}${url}`;
    }
    await this.ts.web.goto(url);
    return this;
  }

  async waitForLoad() {
    const getHeader = await this.elements.getHeader();
    await this.ts.web.toAppear(getHeader);
    return this;
  }

  async waitForLoginLoad() {
    const loginForm = await this.elements.loginPageDiv();
    await this.ts.web.toAppear(loginForm);
    return this;
  }

  public async clickElementWithJS(locator: string) {
    const elementForClick = await this.ts.web.getElement(locator);
    await this.ts.web.toAppear(elementForClick);
    await this.ts.web.browser.executeScript('arguments[0].click()', elementForClick);
  }

  private async waitTillCondition(predicate: () => Promise<boolean>, message: string, timeout: number) {
    platform.TS.log.debug(`Waiting for condition: [${message}] with ${timeout} timeout.`);
    return platform.TS.web.browser.wait(predicate, timeout, message);
  }

  async waitTillConditionWithSmallTimeout(predicate: () => Promise<boolean>, message: string) {
    return this.waitTillCondition(predicate, message, SMALL_WAIT_TIMEOUT);
  }

  async softWaitTillConditionWithTimeout(predicate: () => Promise<boolean>, message: string, timeout: number = SMALL_WAIT_TIMEOUT) {
    try {
      return await this.waitTillCondition(predicate, message, timeout);
    } catch (e) {
      if (e.name === 'TimeoutError') {
        return false;
      } else {
        throw Error(`${message}: ${e}`);
      }
    }
  }

  async waitTillConditionWithMediumTimeout(predicate: () => Promise<boolean>, message: string) {
    return this.waitTillCondition(predicate, message, MEDIUM_WAIT_TIMEOUT);
  }

  async waitTillConditionWithDefaultTimeout(predicate: () => Promise<boolean>, message: string) {
    return this.waitTillCondition(predicate, message, DEFAULT_WAIT_TIMEOUT);
  }

  // As "elementToBeClickable" doesn't work properly sometimes, use click with retry
  async clickElementWithRetry(element, maxRetryCount = 10) {
    do {
      try {
        return await element.click();
      } catch (e) {
        if (e.message.includes('is not clickable at point')) {
          platform.TS.web.log.debug(`Clicking with retry has failed. ${--maxRetryCount} tries left`);
        } else {
          throw Error(`Element: ${element.locator().value} can't be clicked due to error: ${e}`);
        }
      }
    } while (maxRetryCount >= 1);
    throw Error(`Element: ${element.locator().value} isn't clickable at some point after 10 retries`);
  }

  public async isElementDisplayed(locator: string, waitToAppear = false): Promise<boolean> {
    return (await (await platform.TS.web.getElement(locator, waitToAppear)).isPresent())
      ? (await platform.TS.web.getElement(locator)).isDisplayed()
      : false;
  }

  public async clickElement(locator: string, timeout: number = SMALL_WAIT_TIMEOUT) {
    const elementForClick = await this.ts.web.getElement(locator);
    await this.ts.web.browser.wait(await this.ts.web.ec.elementToBeClickable(elementForClick), timeout);
    return elementForClick.click();
  }

  async scrollToLastElement(locator) {
    const rowElements = await platform.TS.web.$$(locator);
    await platform.TS.web.browser
      .actions()
      .mouseMove(rowElements[rowElements.length - 1])
      .perform();
  }

  async scrollToLastElementAndWait(locator, timeout) {
    const elementsCountBeforeScroll = (await platform.TS.web.$$(locator)).length;
    await this.scrollToLastElement(locator);
    await this.softWaitTillConditionWithTimeout(
      async () => (await platform.TS.web.$$(locator)).length > elementsCountBeforeScroll,
      'Unexpected error occurred',
      timeout
    );
  }
}
