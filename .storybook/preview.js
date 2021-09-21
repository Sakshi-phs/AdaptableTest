import { setConsoleOptions } from '@storybook/addon-console';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../dist/docs/documentation.json';
import { addParameters } from '@storybook/angular';

setConsoleOptions({ panelExclude: [] });

// 60px is normally the default iFrame height per https://github.com/storybookjs/storybook/tree/201ae32/addons/docs/angular#iframe-height.
// We set this bigger to allow the majority of stories to have more than enough room to render.
// Individual stories can override this to increase or decrease the iFrame height.
addParameters({ docs: { iframeHeight: 400 } }); // in px

setCompodocJson(docJson);
