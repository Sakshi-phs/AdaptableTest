export const DEFAULT_PAUSE = 250;
export const DEFAULT_WAIT_TIMEOUT = 30000;
export const MEDIUM_WAIT_TIMEOUT = 10000;
export const SMALL_WAIT_TIMEOUT = 3000;

export const colors = {
  tabsFontColor: 'rgba(255, 255, 255, 1)',
  queryBuilderItemsColor: 'rgba(119, 103, 55, 1)',
  dataUnavailableMessage: 'rgba(208, 2, 27, 1)',
  noDataText: 'rgba(119, 103, 55, 1)',
  darkGrey: 'rgba(0, 0, 0, 0.5)',
  barColorValue: 'rgba(34, 34, 34, 1)',
  statGreen: 'rgba(25, 125, 58, 1)',
  statRed: 'rgba(124, 10, 7, 1)',
  statGrey: 'rgba(158, 158, 158, 1)',
  lightGrey: 'rgb(189, 190, 194)',
  veryLightGrey: 'rgb(204, 204, 204)',
  errorRed: 'rgb(207, 41, 11)',
  white: 'rgb(255, 255, 255)',
  black: 'rgb(34, 34, 34)',
  pitchBlack: 'rgb(0, 0, 0)',
  darkBlue: 'rgb(0, 56, 126)',
  labelTextDefault: 'rgba(34, 34, 34, 1)',
  labelTextHighlighted: 'rgba(0, 56, 126, 1)',
  dropdownElementBackgroundHighlighted: 'rgba(238, 238, 238, 1)',
  transparent: 'rgba(0, 0, 0, 0)'
};

export const styles = {
  inlineErrorMessageStyle: {
    'background-color': colors.errorRed,
    color: colors.white,
    'font-size': '12px',
    height: '36px',
    'font-weight': '500',
    'vertical-align': 'baseline'
  },
  inputFieldWithErrorStyle: {
    'border-bottom-color': colors.errorRed,
    'border-left-color': colors.errorRed,
    'border-right-color': colors.errorRed,
    'border-top-color': colors.errorRed
  },
  inputFieldNormalStyle: {
    'border-bottom-color': colors.lightGrey,
    'border-left-color': colors.lightGrey,
    'border-right-color': colors.lightGrey,
    'border-top-color': colors.lightGrey
  },
  inputFieldDateNormalStyle: {
    'border-top-color': colors.veryLightGrey,
    'border-top-width': '1px',
    'border-bottom-color': colors.veryLightGrey,
    'border-bottom-width': '1px',
    'border-left-color': colors.veryLightGrey,
    'border-left-width': '1px',
    'border-right-width': '0px'
  },
  inputFieldFocusedStyle: {
    'border-bottom-color': colors.darkBlue,
    'border-left-color': colors.darkBlue,
    'border-right-color': colors.darkBlue,
    'border-top-color': colors.darkBlue
  },
  globalFiltersBoldStyle: {
    'font-size': '14px',
    'font-weight': '700',
    color: colors.black,
    'font-family': 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif'
  },
  globalFiltersMediumTextStyle: {
    'font-size': '14px',
    'font-weight': '500',
    color: colors.black,
    'font-family': 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif'
  },
  globalFiltersRegularTextStyle: {
    'font-size': '14px',
    'font-weight': '400',
    color: colors.black,
    'font-family': 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif'
  },
  hoveredOverTextStyle: {
    color: colors.darkBlue
  },
  hoveredOverCalendarDateStyle: {
    color: colors.darkBlue,
    'border-bottom-color': colors.darkBlue,
    'border-left-color': colors.darkBlue,
    'border-right-color': colors.darkBlue,
    'border-top-color': colors.darkBlue
  },
  hoveredOverDisabledCalendarDateStyle: {
    color: colors.black,
    'border-bottom-color': colors.black
  }
};

export const defaultBasePath = 'angular-basic';
export const apps = 'apps';
