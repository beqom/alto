/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';

import OptionsIcon from '../Icons/Options';
import Dropdown from './Dropdown';

const items = [
  {
    key: '1',
    title: 'Alert',
    // eslint-disable-next-line no-alert
    onClick: () => alert('hello world'),
  },
  {
    key: '2',
    title: 'Sub Dropdown',
    items: [
      { key: 'foo', title: 'Foo' },
      { key: 'bar', title: 'Bar' },
      {
        key: 'baz',
        title: 'Sub Sub Dropdown',
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

storiesOf('Dropdown', module)
  .addDecorator(centered)
  .addWithJSX('overview', () => (
    <Dropdown items={items}>{onClick => <OptionsIcon onClick={onClick} />}</Dropdown>
  ));
