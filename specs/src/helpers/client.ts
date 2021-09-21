import * as platform from './platform.base';

export class Client {
  constructor() {}

  private async doGetRequest(url: string, headers?: any): Promise<any> {
    return platform.TS.http.doGet(url, headers).then((response) => response.getResponseAsObject());
  }

  public async getAppConfig() {
    return this.doGetRequest(`${platform.envir.appUrl()}/assets/data/appConfig.json`);
  }
}
