import { BasePO } from './basePO';
import PlatformCore from '../helpers/platform.core';

export abstract class AppPO extends BasePO {
  abstract appLocator: string;
  readonly hasPanel = () => true;

  constructor(url, title: string, platformCore: PlatformCore) {
    super(url, title, platformCore);
  }
}
