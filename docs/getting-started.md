# Getting Started

## Perquisites

### Required Programs

**MAC**

| Program                                                                       | Version | Check                                 | Install                                                                                           |
| ----------------------------------------------------------------------------- | ------- | ------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm)                   | ^0.38.0 | `nvm --version`                       | `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh \| bash                 |
| [Node.js](https://nodejs.org/en/)                                             | 14.17.4 | `node -v`                             | `nvm install 14.17.4 && nvm alias default 14.17.4`                                                |
| [npm](https://www.npmjs.com/)                                                 | ^7.6.3  | `npm -v`                              | `npm install -g npm@7.6.3`                                                                        |
| [Homebrew](https://brew.sh/)                                                  | ^3.2.11 | `brew -v`                             | `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"` |
| [GraphicsMagick](http://www.graphicsmagick.org/)                              | ^1.3.34 | `brew list --versions graphicsmagick` | `brew install graphicsmagick`                                                                     |
| [Xcode Command Line Tools](https://mac.install.guide/commandlinetools/2.html) | ^12.0.5 | `clang --version`                     | `xcode-select –install`                                                                           |

**Linux**

| Program                                                     | Version | Check           | Install                                                                                    |
| ----------------------------------------------------------- | ------- | --------------- | ------------------------------------------------------------------------------------------ |
| [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm) | ^0.38.0 | `nvm --version` | `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh \| bash`         |
| [Node.js](https://nodejs.org/en/)                           | 14.17.4 | `node -v`       | `nvm install 14.17.4 && nvm alias default 14.17.4`                                         |
| [npm](https://www.npmjs.com/)                               | ^7.6.3  | `npm -v`        | `npm install -g npm@7.6.3`                                                                 |
| [GraphicsMagick](http://www.graphicsmagick.org/)            | ^1.3.34 | unknown         | Follow (Graphics Magic Download Instructions](http://www.graphicsmagick.org/download.html) |

**Windows**

| Program                                          | Version | Check     | Install                                                                                    |
| ------------------------------------------------ | ------- | --------- | ------------------------------------------------------------------------------------------ |
| [Node.js](https://nodejs.org/en/)                | 14.17.4 | `node -v` | Download from https://nodejs.org/download/release/v14.17.4/                                |
| [npm](https://www.npmjs.com/)                    | ^7.6.3  | `npm -v`  | `npm install -g npm@7.6.3`                                                                 |
| [GraphicsMagick](http://www.graphicsmagick.org/) | ^1.3.34 | unknown   | Follow (Graphics Magic Download Instructions](http://www.graphicsmagick.org/download.html) |

### Required npm packages

#### Global

Run `npm install -g @angular/cli`

#### Package

Run `npm install`

This command should be rerun each time dependencies are changes in the [package.json](../package.json)

## Contributing via a PR

See the [CONTRIBUTING.md](docs/CONTRIBUTING.md) for details.

## Now lets get the app started

Return to the [README.md](../README.md#running-a-local-server)
