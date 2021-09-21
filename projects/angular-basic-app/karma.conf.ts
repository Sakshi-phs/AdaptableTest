// Karma configuration file, see link for more information
// https://karma-runner.github.io/5.0/config/configuration-file.html
const karmaBaseConfig = require('../../node_modules/@ce/tooling-lib/lib/karma/karma-base.conf.ts');

module.exports = function (config) {
  config.projectName = 'angular-basic-app';
  karmaBaseConfig(config);
};
