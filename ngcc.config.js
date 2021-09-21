module.exports = {
  packages: {
    '@ce/auth-lib': {
      ignorableDeepImportMatchers: [/node_modules\/lodash-es\//]
    },
    '@ce/config-lib': {
      ignorableDeepImportMatchers: [/node_modules\/lodash-es\//]
    },
    '@ce/platform-lib': {
      ignorableDeepImportMatchers: [/node_modules\/lodash-es\//]
    }
  }
};
