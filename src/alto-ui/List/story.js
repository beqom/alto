/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, array } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import List from './List';

const items = [
  { id: 'one', title: 'One', url: '#one' },
  { id: 'two', title: 'Two', url: '#two' },
  { id: 'three', title: 'Three', url: '#three' },
];

storiesOf('List', module)
  .addDecorator(story => (
    <div style={{ width: 600, maxWidth: '100%' }}>
      {story()}
    </div>
  ))
  .addDecorator(centered)
  .addWithJSX('overview', () => (
    <List
      items={object('items', items)}
      selected={text('selected', '')}
    />
  ))
  .addWithJSX('simple', () => (
    <List
      items={array('items', ['Apple', 'Orange', 'Banana'])}
      selected={text('selected', '')}
    />
  ));
