/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';

import OptionsIcon from '../Icons/Options';
import Menu from './Menu';

const items = [
  {
    key: '1',
    title: 'Alert',
    // eslint-disable-next-line no-alert
    onClick: () => alert('hello world'),
  },
  {
    key: '2',
    title: 'Sub Menu',
    items: [
      { key: 'foo', title: 'Foo' },
      { key: 'bar', title: 'Bar' },
      {
        key: 'baz',
        title: 'Sub Sub Menu',
        items: [
          { key: 'foo', title: 'Foo' },
          { key: 'bar', title: 'Bar' },
          { key: 'baz', title: 'Baz' },
        ],
      },
    ],
  },
  {
    key: '3',
    title: 'Disabled',
    disabled: true,
  },
];

storiesOf('Menu', module)
  .addDecorator(centered)
  .addWithJSX('overview', () => (
    <Menu items={items}>{onClick => <OptionsIcon onClick={onClick} />}</Menu>
  ));
