/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';
import withReadme from 'storybook-readme/with-readme';

import Tabs from './Tabs';
import README from './README.md';

const items = [
  { title: 'One', url: '#one' },
  { title: 'Two', url: '#two' },
  { title: 'Three', url: '#three' },
];

const urls = items
  .map(item => item.url);

storiesOf('Tabs', module)
  .addDecorator(withReadme(README))
  .addDecorator(centered)
  .addWithJSX('overview', () => (
    <Tabs
      panel={boolean('panel', false)}
      currentUrl={select('currentUrl', ['none'].concat(urls), '#one')}
      items={items}
    />
  ));
