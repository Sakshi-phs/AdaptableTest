import { BasePO, DATA_VIEW_LOCATORS } from './basePO';
import PlatformCore from '../helpers/platform.core';
import { TableCo } from './components/table.co';
import { SearchBarCo } from './components/search.bar.co';
import * as platform from '../helpers/platform.base';
import { ElementFinder } from 'protractor';

export const DATA_LIST_VIEW_TABLE = '[data-e2e-id="dataListView"]';
export const DATA_GRID_VIEW_TABLE = '[data-e2e-id="dataGridView"]';

const GENERATE_ERROR_BUTTON = '[data-e2e-id="generate-error"]';
const GENERATE_NO_DATA_BUTTON = '[data-e2e-id="generate-no-data"]';
const NAVIGATE_PROTECTED_BUTTON = '[data-e2e-id="navigate-protected"]';
const PAGE_TITLE_HEADER = 'e2e-test h1';

enum COMPONENTS {
  Table,
  SearchBar
}

export class E2eTestPO extends BasePO {
  private components;

  constructor(platformCore: PlatformCore) {
    super('', 'Angular Basic Template: e2e Test Page', platformCore);
    this.initComponents(platformCore);
  }

  getComponent(key) {
    return this.components[key];
  }

  get componentNames() {
    return COMPONENTS;
  }

  initComponents(platformCore: PlatformCore) {
    this.components = {
      [this.componentNames.Table]: new TableCo(platformCore, ''),

      [this.componentNames.SearchBar]: new SearchBarCo(platformCore, '')
    };
  }

  async getTitleHeader(): Promise<string> {
    return (await this.web.getElement(PAGE_TITLE_HEADER)).getText();
  }

  // Note - It is always good to take note of the functions you will be creating in these page objects. Not everything should be here.
  // For functions that you know will be reused or to give more context, it definitely makes sense for them to live here.
  // But using a helper.clickElement() inside your spec for one instance would be just as good.

  async clickGenerateDataBtn() {
    await platform.helper.clickElement(DATA_VIEW_LOCATORS.GENERATED_DATA);
  }

  async clickProtectedPageBtn() {
    await platform.helper.clickElement(NAVIGATE_PROTECTED_BUTTON);
  }

  async clickGenerateErrorBtn() {
    await platform.helper.clickElement(GENERATE_ERROR_BUTTON);
  }

  async clickGenerateNoDataBtn() {
    await platform.helper.clickElement(GENERATE_NO_DATA_BUTTON);
  }

  async clickGridView(): Promise<ElementFinder> {
    return platform.helper.clickElement(DATA_VIEW_LOCATORS.GRID_LIST_VIEW);
  }

  async whichViewIsSelected(): Promise<string> {
    const selectedElement = await platform.TS.web.$('.button-wrapper .selected');
    const getAttribute = await selectedElement.getAttribute('data-e2e-id');
    return getAttribute;
  }

  async getGeneratedDataLength(): Promise<number> {
    const getDataList = await this.web.$(DATA_VIEW_LOCATORS.DATA_LIST);
    return (await getDataList.isPresent()) ? (await this.getRowData()).map((w) => w.length)[0] : 0;
  }

  async getRowData(): Promise<string[]> {
    const list = await this.web.getElements(DATA_VIEW_LOCATORS.DATA_LIST, true);
    return this.web.getElementsText(list);
  }
}
