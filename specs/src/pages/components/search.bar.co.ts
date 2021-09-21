import { PanelCo } from './panel.co';
import PlatformCore from '../../helpers/platform.core';
import * as platform from '../../helpers/platform.base';

const SEARCH_BAR_DROPDOWN = '[data-e2e-id="search-libraries"] .danda-multi-select';
const SEARCH_ARROW_DROPDOWN = '.danda-dropdown__arrow-icon';
export const SEARCH_RESULTS_ITEM = '.danda-list-item__left-section div:not(.danda-checkbox)';
export const SEARCH_RESULTS_LABEL = '.danda-multi-select__selections-tag .danda-tag';
const SEARCH_INPUT = '[data-e2e-id="danda-dropdown__search-input"]';

export class SearchBarCo extends PanelCo {
  public searchBarLocator: string;

  constructor(platformCore: PlatformCore, title, componentLocator = title) {
    super('', title, platformCore, componentLocator);
    this.searchBarLocator = componentLocator;
  }

  async clickSearchLibraries() {
    await this.platformCore.helper.clickElement(SEARCH_BAR_DROPDOWN);
    await this.platformCore.getElement(SEARCH_RESULTS_ITEM, true);
  }

  async clickSearchLibrariesArrowDropdown() {
    await platform.helper.clickElement(SEARCH_ARROW_DROPDOWN);
  }

  async setInputSearch(input) {
    await this.setElementText(SEARCH_INPUT, input);
  }

  async getSearchResults(isVisible: boolean) {
    await this.platformCore.getElement(SEARCH_RESULTS_ITEM, isVisible);
  }
}
