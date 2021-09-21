import * as e2eBase from 'eagle-e2e-js';
import { BaseText } from 'eagle-e2e-js';

export class PlatformText extends BaseText {
  constructor() {
    super();
  }

  private getLocalizedDataValue(values: { en: string }): string {
    return new e2eBase.TS.LocalizedDataValue(values).getValue(this.key);
  }

  get generatedErrorMessage() {
    return this.getLocalizedDataValue({
      en: 'Bwah bwah. Error getting data!'
    });
  }

  get generatedNoDataMessage() {
    return this.getLocalizedDataValue({
      en: 'No data'
    });
  }
}
