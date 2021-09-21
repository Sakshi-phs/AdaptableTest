const TS = require('eagle-e2e-js').TS;
const fs = require('fs');

require('ts-node').register({
  extends: '../tsconfig.json',
  compilerOptions: {
    module: 'commonjs'
  }
});

/* global __dirname, exports */

const projectConfig = {
  specs: ['../out-tsc/spec/**/*.spec.tp.js'],
  exclude: ['../out-tsc/spec/**/acceptance.spec.tp.js']
};

const customJsonConfig = {
  consulUrl: 'https://consul.engops.az.eagleinvsys.com',
  useProxy: false,
  proxyHost: 'http://10.80.14.11:3128'
};

const localFilePath = __dirname + '/env_local.json';

if (!fs.existsSync(localFilePath)) {
  fs.writeFileSync(
    localFilePath,
    `{
  "localRun": false,
  "envVar": {
    "UD_USER_NAME_INDEX": "",
    "USER_E2E_PWD": "",
    "UD_USER_NAME_1_MFA": "",
    "UD_USER_NAME_1_MFA_PROD": ""
  }
}`
  );
}
const envLocal = require(localFilePath);

if (envLocal.localRun) {
  Object.entries(envLocal.envVar).forEach((entry) => {
    TS.EnvVar.setEnvVar(entry[0], entry[1], true);
  });
}

// TS.EnvVar.setEnvVar('screenWidth', 800, true); // TEMP: remove before merge

const config = TS.getMergedConfig(__dirname, projectConfig, customJsonConfig);

TS.getUserConfig().consulUrl = 'https://consul.engops.az.eagleinvsys.com/v1/kv/';

config.jasmineNodeOpts.defaultTimeoutInterval = 240000;
exports.config = config;
