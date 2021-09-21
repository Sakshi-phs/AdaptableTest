// This file is required by karma.conf.ts and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
// Then we find all the tests.
const context = require.context('../', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);

// Custom code below
//
// Help test reliability and avoid the dreaded
// "Error: Timeout - Async function did not complete within 5000ms (set by jasmine.DEFAULT_TIMEOUT_INTERVAL)" which is common in IT tests.
// This happens more on the server due to the load created by build tasks running in parallel with karma tests.
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
