import * as path from 'path';
import { TS } from 'eagle-e2e-js';

export class EnvirResourceData {
  private pathToResource: string;
  private useConsul: boolean;
  public consulClient;

  constructor(pathToResource: string, useConsul: boolean) {
    this.consulClient = TS.ConsulClient.getInstance();
    this.useConsul = useConsul;

    if (this.useConsul) {
      if (pathToResource.split('.').pop() === 'json') {
        this.pathToResource = pathToResource.split('.').slice(0, -1).join('.');
      } else {
        this.pathToResource = pathToResource;
      }
    } else {
      this.pathToResource = path.join(__dirname, `../../../../consulClient/${pathToResource}`);
    }
  }
}
