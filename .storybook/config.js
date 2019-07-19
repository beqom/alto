import React from 'react';
import { configure, addDecorator, setAddon, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import JSXAddon from 'storybook-addon-jsx';
//import { withInfo, setDefaults } from '@storybook/addon-info';
import { withA11y } from '@storybook/addon-a11y';

import Root from './Root';

setAddon(JSXAddon);

// Console error: The pseudo class ":first-child" is potentially unsafe when doing server-side rendering. Try changing it to ":first-of-type".
// https://github.com/storybookjs/storybook/issues/6998

addParameters({
  options: {
    showPanel: true,
    panelPosition: 'right',
    showNav: true,
    isToolshown: false,
  },
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

addDecorator(withA11y);

// addDecorator((story, context) => withInfo('')(story)(context));

// addDecorator(fixAddonInfo);
addDecorator(withKnobs);

addDecorator(story => <Root>{story()}</Root>);

function loadStories() {
  require('../src/alto-ui/Actions/story');
  require('../src/alto-ui/Alert/story');
  require('../src/alto-ui/Aside/story');
  require('../src/alto-ui/Avatar/story');
  require('../src/alto-ui/Badge/story');
  require('../src/alto-ui/Breadcrumb/story');
  require('../src/alto-ui/Button/story');
  require('../src/alto-ui/Card/story');
  require('../src/alto-ui/CloseButton/story');
  require('../src/alto-ui/ContentEditable/story');
  require('../src/alto-ui/CopyToClipboard/story');
  require('../src/alto-ui/Datagrid/story');
  require('../src/alto-ui/Dialog/story');
  require('../src/alto-ui/Dropdown/story');
  require('../src/alto-ui/Form/story');
  require('../src/alto-ui/Header/story');
  require('../src/alto-ui/HTMLBlock/story');
  require('../src/alto-ui/Icons/story');
  require('../src/alto-ui/Input/story');
  require('../src/alto-ui/Line/story');
  require('../src/alto-ui/List/story');
  require('../src/alto-ui/Media/story');
  require('../src/alto-ui/MenuList/story');
  require('../src/alto-ui/Pagination/story');
  require('../src/alto-ui/Popover/story');
  require('../src/alto-ui/ProgressBar/story');
  require('../src/alto-ui/ProgressCircle/story');
  require('../src/alto-ui/RelativeBox/story');
  require('../src/alto-ui/ShowMore/story');
  require('../src/alto-ui/SideNav/story');
  require('../src/alto-ui/Sortable/story');
  require('../src/alto-ui/Spinner/story');
  require('../src/alto-ui/Table/story');
  require('../src/alto-ui/Tabs/story');
  require('../src/alto-ui/Tag/story');
  require('../src/alto-ui/Tooltip/story');
  require('../src/alto-ui/Tree/story');
}

configure(loadStories, module);
