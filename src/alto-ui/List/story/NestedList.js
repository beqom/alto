/* eslint-disable import/no-extraneous-dependencies, react/prop-types */
import React, { useState } from 'react';
import { boolean } from '@storybook/addon-knobs';

import List from '../List';

import { people } from './data';

const hierarchy = [
  {
    ...people[0],
    children: people.slice(1, 4),
  },
  {
    ...people[4],
    children: people.slice(5, 9),
  },
];

function NestedList() {
  const [items, setItems] = useState(hierarchy);

  return (
    <List
      small
      id="list"
      sortable
      borderless={boolean('borderless', true)}
      fields={[
        {
          key: 'name',
          type: 'media',
          primary: true,
          props: (name, user) => ({
            src: user.img,
          }),
        },
        { key: 'config.active', type: 'switch', hidden: true },
      ]}
      nestedItemsKey="children"
      items={items}
      onChange={xs => setItems(xs)}
    />
  );
}

export default NestedList;
