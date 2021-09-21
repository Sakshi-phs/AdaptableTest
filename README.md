# Angular Basic Template

Super-powered template to get your angular apps up and running fast.

## Showcase

[App](https://angular-basic.dev.az.eagleinvsys.com) |
[Storybook](https://angular-basic.dev.az.eagleinvsys.com/storybook) |
[Docs](https://angular-basic.dev.az.eagleinvsys.com/docs)

First time here or want to check your dependencies: Check out [Getting Started](docs/getting-started.md).

## Running a local server

All local server commands host the app at https://local.dev.az.eagleinvsys.com:4200/ and automatically reload on source file changes.

`npm run start` - Run locally on port 8080

Note - If you are getting a 'Your Connection is not Private', you will need to copy over the local-ssl generated folder. (If you have never done this follow the [steps here](https://github.com/eagleinvsys/ce-ui-insights#1-adding-localdevazeagleinvsyscom-to-hosts-file)

## Local Ports

| Port | Process          |
| ---- | ---------------- |
| 4200 | Angular Basic UI |
| 9001 | Storybook        |
| 9002 | Compodoc         |

## New app setup

Create a Jira COPS issue to have a repo created using this the template. This will include getting appropriate permissions, a [service config](https://github.com/eagleinvsys/ce-configs-deployment/tree/develop/configs/services), and additional support as needed.

## Running with certs

If you want to leverage oauth by using the `@ce/auth-lib` authentication library, you will need to make some changes to the hosts file and certs as described in [ce-ui-insight documentation](https://github.com/eagleinvsys/ce-ui-insights#1-adding-localdevazeagleinvsyscom-to-hosts-file).

## Documentation

Documentaton is created via [compodoc](https://compodoc.app/).

These are available via [`/docs`](https://insights.dev.az.eagleinvsys.com/docs) in hosted environments.

### Locally

There are 2 main ways to generate and run the docs:

1. Generate the docs via `npm run docs:generate`.
   Once your [local sever](#local-server) is running, they can be accessed at https://local.dev.az.eagleinvsys.com:4200/dist/docs.
1. Generate and run the docs via `npm run docs:serve`.
   This uses a dedicated Compodoc server to host the docs at http://127.0.0.1:9002.

**Note:** The docs are ONLY generated when the `:generate` command (above) is run and are NOT auto-generated on change.
Please keep this in mind if the docs appear to be out of date.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build` to build the project using the `production` profile, as this is used in ALL hosted environments (including dev and stage).
The build artifacts will be stored in the `dist/` directory.

_Environments_:

- _dev_ points ajax calls to dev eagle environment
- _local_ points ajax calls to port 8080 which is the default IDE debugger (expects a service instance running at port 8080).
- _prod_ points ajax calls to prod eagle environment
- _docker_ points ajax calls to port 8081 which is what docker-compose when run from insights-svc root directory sets the port to

## Running unit tests

Unit and Integration tests use [Karma](https://karma-runner.github.io).

#### To keeping window open for debugging:

`npm run test:app:debug`

#### To run your tests and generate a report window:

`npm run test:app:report`

## Running end-to-end tests

Run `npm run test:e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

**Note**: Run all commands in project's root directory

### Run E2E tests on local environment

- Ensure the app sever is running locally (`npm run start`)
- In `specs/src/data/envir/platform.envir.data.ts`, change

`const envirSingleton = new LocalizedDataValueEnvir('ENVIR', ENV.dev);`

to

`const envirSingleton = new LocalizedDataValueEnvir('ENVIR', ENV.localhost);`

or

- Export the url (INSIGHTS_URL) and execute the tests

```shell
export INSIGHTS_URL=localhost:4200
npm run test:e2e:local
```

### Run/Debug single E2E test

- [OPTIONAL] Specify the spec you'd like to test via right clicking on the `protractor.config.js` and clicking "Run ..."

```javascript
const projectConfig = {
  specs: ['./src/**/currency.barchart.spec.tp.ts']
};
```

### Run E2E tests on Canary environment

- In `specs/src/data/envir/platform.envir.data.ts`, change the default case to

```js
appUrl: new TS.LocalizedDataValue({
  any: new LocalizedDataValueEnvir('INSIGHTS_URL', this.buildUrl('insights', 'CANARY_URL'))
}),
```

### Run UI pointing to a local version of Query Service

This allow you to test changes in the Query Service locally to see how they affect the UI

#### Required local services

- A local Query Service on port 8090
- A local Insights Service running on port 8080 (required because of certain OAuth limitations)

**Note:** If your set up uses different ports, change the [`proxy-config/local-qs-proxy.conf.json`](proxy-config/local-qs-proxy.conf.json) accordingly.

#### Start

`npm run start:local-qs`

### Run E2E tests against a canary

When making service changes, you want to ensure you do not break the UI E2Es.
We have the ability to run the UI E2Es against canary builds by setting the `SVC_OVERRIDES` in your shell. Please view examples below.

#### Run against Canary Insights Service

The Insights Service Canaries are constructed this way: `https://api-pr-<PR-NUMBER>.dev.az.eagleinvsys.com/svc-insights`
For Example if you want to run against PR 123 of Insights Service:

```shell
export SVC_OVERRIDES='{"svc-insights":"https://api-pr-123.dev.az.eagleinvsys.com/svc-insights"}' && npm run test:e2e:local
```

### Verification

While an E2E is running, searching for SERVICE OVERRIDE VALUE will show the current value of the URL.
You can also verify that this is working locally by checking that the cookie is set, while it is running:
Name = Eagle-Svc-Overrides, Value = {"svc-insights":"YOUR_CANARY_URL"}

#### Run E2E tests with Credentials

For running E2Es locally refer to env_local.json file. Credentials should be saved in local file.

1. Run the command: `git update-index --skip-worktree specs/env_local.json`
2. Update localRun property to 'True'
3. Insert User name and password

```json
{
  "localRun": true,
  "envVar": {
    "UD_USER_NAME_INDEX": "",
    "USER_E2E_PWD": ""
  }
}
```

4. UD_USER_NAME_INDEX - INDEX will be removed by user index (i.e. 1,2,3,4, etc). This cleans up
   many entries in vault DB as well as env_local.json.
   `DO NOT check in env_local.json`

To help avoid this unwanted check in, you can ignore any changes to env_local.json file by changing the git index

`git update-index --assume-unchanged specs/env_local.json`

#### Run E2E tests from WebStorm IDE

![alt text](specs/Asset Images/Run E2E from IDE.png)

### Developer Run E2E locally using CI Selenoid gird with concurrency

This is run the E2E tests from your local repo on your machine but push browsers in the ci selenoid grid.
To do this you need to run your app on --host 0.0.0.0

#### Run app locally using

```shell
ng serve --host 0.0.0.0 --port 4200
```

#### Run Tests

```shell
npm run test:e2e:ci:dev
```

#### Run UI E2E on multi nodes

```shell
npm run test:e2e:local:multi
```

#### Mocking inProduction

The UI app uses AppConfigService inProduction property to enable/disable certain functionality, as an example `/admin/environment-settings` which is only enabled on dev environment and redirects to `not-permitted` in stage and prod.
In order to be able to test this in non-prod environments you can add a cookie with the key of `inProductionMock` and a value of `true`.

## Upgrading the Chrome Version on Jenkins for E2Es

This allows us to test on Jenkins using the latest version of Chrome, used by the vast majority of Chrome users because auto-updates is enabled by default.

1. Create a new PR in [ce-configs-eagle-pipeline](https://github.com/eagleinvsys/ce-configs-eagle-pipeline).
   Include a new JSON block for the desired version in [`configs/selenoidBrowsers.json`](https://github.com/eagleinvsys/ce-configs-eagle-pipeline/blob/develop/configs/selenoidBrowsers.json) based on this [example PR](https://github.com/eagleinvsys/ce-configs-eagle-pipeline/pull/11/files).
   Ensure the PR is merged before proceeding
1. Verify that the desired chrome version is upgraded in [selenoidBrowsers](https://consul.engops.az.eagleinvsys.com/ui/az-engops/kv/pipeline/selenoidBrowsers/edit) within Consul
1. Create a PR in [ce-ui-insights](https://github.com/eagleinvsys/ce-ui-insights) to update the `browserVersion` in the [`JenkinsFile`](JenkinsFile) (ex Chrome version 79.0 -> 80.0).
1. Verify the desired version is used in the "Browser" field of the E2E "Test Results" section of a given spec in the PR build
1. Ensure the ui-insights PR is merged

## Lint

Run `npm run lint` to execute [ESLint](https://eslint.org/) to uphold coding standards and best practices.

For more targeted linting, you can run `npm run lint:app`, `npm run lint:config-lib`, `npm run lint:e2e`, `npm run lint:scripts`, etc.

You can also append `:fix` to any lint command (i.e. `npm run lint:app:fix` and `npm run lint:fix`) to automatically fix any supported rules.

## [Stylelint](https://stylelint.io/)

Run `npm run stylelint` to execute Sass linting to uphold coding standards and best practices.
You can also append `:fix` (`npm run stylelint:fix`) to automatically fix any supported rules.

### IDE Integrations

#### WebStorm and IntelliJ

Enable Stylelint in `Preferences | Languages & Frameworks | Style Sheets | Stylelint`

**Recommended configuration:**
![image](https://user-images.githubusercontent.com/43790368/64395683-15d49280-d029-11e9-9013-01e4810b3634.png)

#### VSCode

Install the [Stylelint](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint) plugin.
It should work with the default plugin settings.

### Troubleshooting

Run `npm run stylelint:config` to print out the Stylelint config.

## Storybook

[Storybook](https://storybook.js.org/) enables the development of UI components in isolation.
You can run this with `npm run storybook`.

These are available via [`/storybook`](https://insights.dev.az.eagleinvsys.com/storybook) in hosted environments.

## Prettier

We use [`prettier`](https://prettier.io/) to format our code nicely and avoid comments in PR reviews related to style.
Prettier should be applied on save using an IDE integration for the best results.

### IDE Integration

Prettier comes with nice integrations for a bunch of IDEs.
We have found the most success with on save usage.

#### [WebStorm](https://prettier.io/docs/en/webstorm.html) and IntelliJ

Also works for IntelliJ once the [File Watchers](https://plugins.jetbrains.com/plugin/7177-file-watchers/) Plugin is installed.

Here are the recommended File Watchers:

**TypeScript File Watcher**
![TypeScript](https://user-images.githubusercontent.com/43790368/62960418-9b697780-bdc8-11e9-99df-abdee622c119.png)
Repeat this for JSON, SCSS Style Sheet, Markdown and HTML

Ensure "Optimize imports" is UNSELECTED if using the IDE for commiting changes to git
![image](https://user-images.githubusercontent.com/43790368/64372408-5cf26180-cff0-11e9-98df-57abe5b9ce17.png)

For additional compatibility, SELECT ES6 import/export braces
![image](https://user-images.githubusercontent.com/43790368/64373165-8dd29680-cff0-11e9-92b0-c4c8d626bbdc.png)

#### [Visual Studio Code](https://prettier.io/docs/en/editors.html#visual-studio-code)

The following `settings.json` should be used

```json
{
  "java.configuration.updateBuildConfiguration": "automatic",
  "typescript.tsdk": "node_modules/typescript/lib",
  "editor.formatOnSave": true
}
```

#### [Other editors](https://prettier.io/docs/en/editors.html)

## Sonarqube support

### Running Sonarqube locally

- Run just sonarqube, will assume task for coverage already run \* Run `./gradlew sonarqube`
- Run both coverage and sonarqube and open report in default browser \* Run `./gradlew sonarqubeWithCoverage`
- Open sonarqube for current local branch project \* Run `./gradlew sonarOpen`

## Common issues

### Local environmental issues which cannot be reproduced on another machine

Errors commonly around dependencies, `pacakge-lock.json` changes, or `karma` and cannot be reproduced on another machine.

```shell
npm run npm:refresh
```
