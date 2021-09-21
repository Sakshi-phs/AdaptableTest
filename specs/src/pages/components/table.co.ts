import { PanelCo } from './panel.co';
import { DATA_VIEW_LOCATORS } from '../basePO';
import PlatformCore from '../../helpers/platform.core';
import * as platform from '../../helpers/platform.base';

// export const COLUMN_HEADERS = 'th[class*="column-header"]';

/* Locators */
const LAST_ROW_IN_TABLE = `${DATA_VIEW_LOCATORS.DATA_LIST} > div:last-child`;
const ERROR_MESSAGE = '.no-results-message';
const WAIT_TIMEOUT = 5000;

const LOCATORS = (tableLocator) => {
  return {
    table: tableLocator,
    tableHeader: `${tableLocator} th`,
    tableRow: 'tbody tr',
    tableCell: 'td'
  };
};

export class TableCo extends PanelCo {
  public tableLocator: string;

  constructor(platformCore: PlatformCore, title, componentLocator = title) {
    super('', title, platformCore, componentLocator);
    this.tableLocator = componentLocator;
  }

  tableLocators(tableLocator = this.tableLocator) {
    return LOCATORS(tableLocator);
  }

  async scrollToLastRowInTable() {
    await platform.helper.scrollToLastElementAndWait(LAST_ROW_IN_TABLE, WAIT_TIMEOUT);
  }

  async errorMessageResultText(): Promise<string> {
    await this.platformCore.TS.web.waitForElementPresent(ERROR_MESSAGE);
    const getErrorMsgText = (await this.platformCore.TS.web.getElement(ERROR_MESSAGE)).getText();
    return getErrorMsgText;
  }
  // Here is where you build out common table components
}
