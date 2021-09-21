import PlatformCore from './platform.core';
import * as dataProvider from '../data/dataProvider';
import { Client } from './client';
import { PlatformPages, PageNames } from './platform.pages';

const platformCore = new PlatformCore();
const TS = platformCore.TS;
const text = platformCore.text;
const elements = platformCore.elements;
const helper = platformCore.helper;
const envir = platformCore.envir;
const client = new Client();
const pages = new PlatformPages(platformCore);

const initialize = (testFile) => {
  return platformCore.initialize(testFile);
};

export { TS, elements, text, helper, platformCore, envir, initialize, dataProvider, client, pages, PageNames };
