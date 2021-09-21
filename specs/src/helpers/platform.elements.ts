import { IElements } from 'eagle-e2e-js';

const LOGOUT = '#nav_logout';
const SUBMIT_BUTTON_LOCATOR = 'button[type="submit"]';
const APP_LOGOUT = `button${LOGOUT}`;
const LOGIN_FORM = '.login__form';
export const HEADER_CLASS = '.header';
const SWAGGER_UI = '#swagger-ui';

export class PlatformElements implements IElements {
  public TS;

  constructor(TS) {
    this.TS = TS;
    this.TS.injectLogger.injectLoggingIntoObjectsFunctions(this, false, 'InsightsElements');
  }

  async getSubmitButton() {
    return this.TS.web.getElement(SUBMIT_BUTTON_LOCATOR);
  }

  async footer() {
    return this.TS.web.getElement(APP_LOGOUT);
  }

  async getHeader() {
    return this.TS.web.getElement(HEADER_CLASS);
  }

  async loginPageDiv() {
    return this.TS.web.getElement(LOGIN_FORM);
  }

  async swaggerPageDiv() {
    return this.TS.web.getElement(SWAGGER_UI);
  }
}
