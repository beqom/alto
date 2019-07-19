/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { number } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';

import Breadcrumb from './Breadcrumb';

const items = [
  { title: 'First page', url: '#1' },
  { title: 'List', url: '#2' },
  { title: 'List details', url: '#3' },
  { title: 'More details', url: '#4' },
  { title: '???', url: '#5' },
  { title: 'Nothing to see here', url: '#6' },
];

storiesOf('Breadcrumb', module)
  .addDecorator(centered)
  .addWithJSX('playground', () => (
    <Breadcrumb
      id="MyBreadcrumb"
      items={items.slice(
        0,
        number('items', 3, { range: true, step: 1, min: 0, max: items.length })
      )}
    />
  ));
