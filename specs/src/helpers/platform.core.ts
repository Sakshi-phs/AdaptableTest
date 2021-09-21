import { TS } from 'eagle-e2e-js';

import { PlatformText } from '../data/platform.text';
import { PlatformEnvir } from '../data/envir/platform.envir';
import { PlatformElements } from './platform.elements';
import { PlatformHelper } from './platform.helper';
import { ElementArrayFinder, ElementFinder } from 'protractor';
import { TestState } from 'testah-js/src/dto/test.state';

export default class PlatformCore {
  private test: TestState | null;
  public TS = TS;
  public text = new PlatformText();
  public envir = new PlatformEnvir();
  public elements = new PlatformElements(TS);
  public helper = new PlatformHelper(TS, this.elements, this.text, this.envir);
  public browser = TS.web.browser;

  public initialize(testFile = '') {
    this.test = TS.init(testFile);
    return this.test;
  }

  public getElement = async (cssLocator, isVisible?, isPresent?, msg?): Promise<ElementFinder> =>
    TS.web.getElement(cssLocator, isVisible, isPresent, msg);

  public getElements = async (cssLocator, isVisible?, isPresent?, msg?): Promise<ElementArrayFinder> =>
    TS.web.getElements(cssLocator, isVisible, isPresent, msg);

  public get getTest() {
    return this.test;
  }
}
