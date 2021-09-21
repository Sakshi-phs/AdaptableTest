module.exports = {
  stories: ['../projects/**/*.stories.[tj]s'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],

  // Avoids "DeprecationWarning: Default PostCSS plugins are deprecated. When switching to '@storybook/addon-postcss'," warning
  // Can remove when Storybook 7.0 is released per https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-implicit-postcss-loader
  features: {
    postcss: false
  }
};
