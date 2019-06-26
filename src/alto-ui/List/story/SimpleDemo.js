/* eslint-disable import/no-extraneous-dependencies, react/prop-types */
import React, { useState } from 'react';

import List from '../List';
import Cog from '../../Icons/Cog';
import Trash from '../../Icons/Trash';

import { people } from './data';

function SimpleDemo() {
  const [items, setItems] = useState(people);

  return (
    <List
      id="list"
      fields={[
        {
          key: 'name',
          type: 'media',
          primary: true,
          props: (name, user) => ({
            subtitle: user.job,
            src: user.img,
            description: user.bio,
          }),
        },
        {
          key: 'domain',
          type: 'badge',
          props: badge => ({
            yellow: badge === 'Human Ressources',
            indigo: badge === 'Finance',
            pink: badge === 'Product',
          }),
        },
        { key: 'config.active', type: 'switch' },
        {
          key: 'actions',
          type: 'actions',
          hidden: true,
          props: {
            items: [
              {
                key: 'actions.settings',
                icon: Cog,
                title: 'Settings',
              },
              {
                key: 'actions.delete',
                icon: Trash,
                title: 'Delete',
              },
            ],
          },
        },
      ]}
      items={items}
      onChange={xs => setItems(xs)}
      onClick={(field, item, setItem) => {
        switch (field.key) {
          case 'actions.settings':
            return setItem('config.active', !item.config.active);
          default:
            return null;
        }
      }}
    />
  );
}

export default SimpleDemo;
