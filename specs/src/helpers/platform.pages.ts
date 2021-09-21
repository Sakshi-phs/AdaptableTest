import { E2eTestPO } from '../pages/e2eTestPO';
import PlatformCore from './platform.core';

export enum PageNames {
  E2eTestPage
}

export class PlatformPages {
  private pages;
  public platformCore;

  constructor(platformCore: PlatformCore) {
    this.platformCore = platformCore;
    this.initPages(platformCore);
  }

  initPages(platformCore: PlatformCore) {
    this.pages = {
      [PageNames.E2eTestPage]: new E2eTestPO(platformCore)
    };
  }

  getPage<T>(key): T {
    return this.pages[key];
  }
}
