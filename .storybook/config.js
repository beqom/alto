import React from 'react';
import { configure, addDecorator, setAddon } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { setOptions } from '@storybook/addon-options';
import JSXAddon from 'storybook-addon-jsx';
import { withInfo, setDefaults } from '@storybook/addon-info';
import { checkA11y } from '@storybook/addon-a11y';

import fixAddonInfo from './fixAddonInfo';

import AltoUIRoot from '../src/AltoUIRoot';

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

addDecorator(story => (
  <AltoUIRoot resetCSS>
    {story()}
  </AltoUIRoot>
));

function loadStories() {
  require('../src/Button/story');
  require('../src/Icons/story');
  require('../src/Form/story');
  require('../src/Pagination/story');
  require('../src/SideNav/story');
}

configure(loadStories, module);
