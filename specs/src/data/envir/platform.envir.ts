import { AppEnvir, EnvirData, LocalizedDataValueEnvir } from 'eagle-e2e-js';
import { defaultBasePath, apps } from '../dataProvider';

export const ENV = {
  dev: 'dev.az',
  stage: 'stage.az',
  prod: 'prod.az',
  localhost: 'localhost'
};

const appEnvir = ENV.localhost;
export class PlatformEnvir extends AppEnvir {
  constructor() {
    super();

    const basePath = new LocalizedDataValueEnvir('BASE_PATH', defaultBasePath);
    const envir = new LocalizedDataValueEnvir('ENVIR', appEnvir);
    const apiUrlPrefix = new LocalizedDataValueEnvir('API_URL', apps);

    EnvirData.basePath = basePath.getValue();
    EnvirData.envir = envir.getValue();
    EnvirData.apiUrlPrefix = apiUrlPrefix.getValue();
  }
}
