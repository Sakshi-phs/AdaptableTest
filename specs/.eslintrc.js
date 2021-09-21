module.exports = {
  extends: '../.eslintrc.js',
  rules: {
    'no-duplicate-imports': 'off' // Turned off because "* as" imports in the specs are problematic for this rule
  }
};
