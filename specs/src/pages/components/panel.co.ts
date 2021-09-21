import PlatformCore from '../../helpers/platform.core';
import { BaseCo } from './base.co';
import { ElementFinder } from 'protractor';

const ERROR_LOCATOR = '.error-message';
const PANEL_DROPDOWN = '.ui-dropdown';
const TITLE_PANEL_LOCATOR = '.ui-panel-title';
const PANEL_COMPONENT = '.ui-panel-content';

const LOCATORS = {
  ERROR_LOCATOR: `${ERROR_LOCATOR}`,
  // Widget list
  PANEL_DROPDOWN: `${PANEL_DROPDOWN}`,
  PANEL_DROPDOWN_LABEL: `${PANEL_DROPDOWN} label`
};

export class PanelCo extends BaseCo {
  public url: string;
  public fullUrl: string;
  public panelTitle: string;

  constructor(url, panelTitle, platformCore: PlatformCore, componentLocator) {
    super(platformCore, componentLocator);
    this.url = url;
    this.fullUrl = `${platformCore.envir.appUrl()}${url}`;
    this.panelTitle = panelTitle;
  }

  public get locators() {
    return LOCATORS;
  }

  getPanelLocator() {
    return `${this.componentLocator}`;
  }

  async getPanelElement() {
    const panelElement = await this.getPanelLocator();
    return this.platformCore.getElement(panelElement);
  }

  async getPanel() {
    const panelLocator = this.getPanelLocator();
    const panelElement = await this.platformCore.getElement(panelLocator);
    await this.web.ec.visibilityOf(panelElement);
    return panelElement;
  }

  getExpectedPanelTitle(): string {
    return this.panelTitle;
  }

  async getTitleElement() {
    return this.web.by.css(TITLE_PANEL_LOCATOR);
  }

  async getPanelElements(selectSamePanels = false, customLocator = '') {
    return selectSamePanels
      ? this.platformCore.getElements(`${this.componentLocator} ${customLocator}`)
      : this.platformCore.getElements(PANEL_COMPONENT);
  }

  async getUpdatePanelTitle(name): Promise<string> {
    const panelTitleText = await this.platformCore.getElement(`[data-title="${name}"] .ui-panel-title`);
    return panelTitleText.getText();
  }

  async getActualPanelTitle(waitTillTextAppear?): Promise<string> {
    const panelElement = await this.getPanel();
    if (waitTillTextAppear) {
      await this.platformCore.helper.waitTillConditionWithSmallTimeout(
        async () => (await (await panelElement.element(await this.getTitleElement())).getText()) !== '',
        'Wait for text to appear in widget`s title field'
      );
    }
    return (await panelElement.element(await this.getTitleElement())).getText();
  }

  // DROPDOWN
  getDropdownLocator(locator = ''): string {
    return `${this.componentLocator} ${locator} ${this.locators.PANEL_DROPDOWN}`;
  }

  getDropdownListLocator(): string {
    return `${this.componentLocator} ${this.locators.PANEL_DROPDOWN} li`;
  }

  async getDropdownElement(locator?: any) {
    return this.getElement(this.getDropdownLocator(locator));
  }

  async getDropdownLabel(locator = ''): Promise<string> {
    return !locator ? this.getComponentElementText(`${this.locators.PANEL_DROPDOWN_LABEL}`) : this.getComponentElementText(locator);
  }

  async getDropdownListElement(index = 0) {
    return (await this.getDropdownListElementsWithWait())[index];
  }

  async getDropdownListElementsWithWait(): Promise<ElementFinder[]> {
    return this.web.getElements(this.getDropdownListLocator(), true, true, 'Every drop-down option should be visible.');
  }
}
