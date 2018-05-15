import React from 'react';
import { configure, addDecorator, setAddon } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { setOptions } from '@storybook/addon-options';
import JSXAddon from 'storybook-addon-jsx';
//import { withInfo, setDefaults } from '@storybook/addon-info';
import { checkA11y } from '@storybook/addon-a11y';

//import fixAddonInfo from './fixAddonInfo';

import AltoUIRoot from '../src/alto-ui/AltoUIRoot';

setAddon(JSXAddon);

setOptions({
  name: 'Alto UI',
  url: 'https://github.com/beqom/alto-ui',
  downPanelInRight: true,
  showLeftPanel: true,
});

/*
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
*/

addDecorator(checkA11y);

// addDecorator((story, context) => withInfo('')(story)(context));

// addDecorator(fixAddonInfo);

addDecorator(withKnobs);

addDecorator(story => (
  <AltoUIRoot resetCSS>
    <div
      style={{
        backgroundColor: '#f8f9fb',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        overflow: 'auto',
      }}
    >
      {story()}
    </div>
  </AltoUIRoot>
));

function loadStories() {
  require('../src/alto-ui/Alert/story');
  require('../src/alto-ui/Avatar/story');
  require('../src/alto-ui/Breadcrumb/story');
  require('../src/alto-ui/Button/story');
  require('../src/alto-ui/Card/story');
  require('../src/alto-ui/CloseButton/story');
  require('../src/alto-ui/Dialog/story');
  require('../src/alto-ui/Icons/story');
  require('../src/alto-ui/Form/story');
  require('../src/alto-ui/List/story');
  require('../src/alto-ui/MediaObject/story');
  require('../src/alto-ui/Pagination/story');
  require('../src/alto-ui/ShowMore/story');
  require('../src/alto-ui/SideNav/story');
  require('../src/alto-ui/Spinner/story');
  require('../src/alto-ui/Table/story');
  require('../src/alto-ui/Tabs/story');
  require('../src/alto-ui/Tooltip/story');
  require('../src/alto-ui/Tree/story');
}

configure(loadStories, module);
