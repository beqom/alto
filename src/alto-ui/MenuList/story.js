/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';

import MenuList from './MenuList';
import PlusIcon from '../Icons/Plus';
import CopyIcon from '../Icons/Copy';
import TrashIcon from '../Icons/Trash';

const items = [
  {
    id: 1,
    title: 'Fruit',
    icons: [{ key: 1, Icon: PlusIcon, onClick: x => x }],
    items: [
      {
        id: 'sub_1',
        title: 'Banana',
        icons: [
          { key: 'item_1', Icon: CopyIcon, onClick: x => x, outline: true },
          { key: 'item_2', Icon: TrashIcon, onClick: x => x, outline: true },
        ],
      },
      {
        id: 'sub_2',
        title: 'Apple',
        icons: [
          { key: 'item_3', Icon: CopyIcon, onClick: x => x, outline: true },
          { key: 'item_4', Icon: TrashIcon, onClick: x => x, outline: true },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Vegetable',
    icons: [{ key: 1, Icon: PlusIcon, onClick: x => x }],
    items: [
      {
        id: 'sub_3',
        title: 'Potato',
        icons: [
          { key: 'item_5', Icon: CopyIcon, onClick: x => x, outline: true },
          { key: 'item_6', Icon: TrashIcon, onClick: x => x, outline: true },
        ],
      },
      {
        id: 'sub_4',
        title: 'Pizza',
        icons: [
          { key: 'item_7', Icon: CopyIcon, onClick: x => x, outline: true },
          { key: 'item_8', Icon: TrashIcon, onClick: x => x, outline: true },
        ],
      },
    ],
  },
];

storiesOf('MenuList', module)
  .addDecorator(story => <div style={{ width: 350, height: 600 }}>{story()}</div>)
  .addDecorator(centered)
  .addWithJSX('overview', () => <MenuList title="Menu List" items={items} collapsible />);
