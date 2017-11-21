import React from 'react';
import { configure, addDecorator, setAddon } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { setOptions } from '@storybook/addon-options';
import JSXAddon from 'storybook-addon-jsx';
import { withInfo, setDefaults } from '@storybook/addon-info';
import centered from '@storybook/addon-centered';
import { checkA11y } from '@storybook/addon-a11y';

import { ThemeProvider } from 'styled-components';

import fixAddonInfo from './fixAddonInfo';

import '../src/scss/index.scss';
import theme from '../src/theme';

setAddon(JSXAddon);

setOptions({
  name: 'Alto UI',
  url: 'https://github.com/beqom/alto-ui',
  downPanelInRight: true ,
  showLeftPanel: true,
});


setDefaults({
  header: false, // Toggles display of header with component name and description
  source: false, // Displays the source of story Component
  styles: s => Object.assign({}, s, {
    infoBody: {},
    infoContent: {},
    infoStory: {},
    jsxInfoContent: {},
    header: {
      h1: {},
      h2: {},
      body: {},
    },
    source: {
      h1: {},
    },
    propTableHead: {},
  })
});


addDecorator(checkA11y);

addDecorator((story, context) => withInfo('')(story)(context));

addDecorator(fixAddonInfo);

addDecorator(withKnobs);

addDecorator(centered);


addDecorator(story => (
  <ThemeProvider theme={theme}>
    {story()}
  </ThemeProvider>
));

function loadStories() {
  require('../src/Button/story');
  require('../src/Icons/story');
  require('../src/Input/story');
  require('../src/Pagination/story');
}

configure(loadStories, module);
