/* eslint-disable import/no-extraneous-dependencies, react/prop-types */
import React, { useState } from 'react';
import { boolean } from '@storybook/addon-knobs';

import List from '../List';

import { people } from './data';
import Dropdown from '../../Dropdown';

const defaultFields = [
  {
    key: 'img',
    name: 'Avatar',
    type: 'avatar',
    visible: false,
  },
  {
    key: 'name',
    name: 'Name',
    visible: false,
  },
  {
    key: 'job',
    name: 'Job',
    visible: false,
  },
  {
    key: 'bio',
    name: 'Bio',
    visible: false,
    primary: true,
  },
  {
    key: 'media',
    type: 'media',
    name: 'Media',
    primary: true,
    visible: true,
    props: (name, user) => ({
      title: user.name,
      subtitle: user.job,
      src: user.img,
      description: user.bio,
    }),
  },
  {
    key: 'domain',
    type: 'badge',
    name: 'Domain',
    visible: true,
    props: badge => ({
      yellow: badge === 'Human Ressources',
      indigo: badge === 'Finance',
      pink: badge === 'Product',
    }),
  },
  { key: 'config.active', type: 'switch', name: 'Active', visible: true },
];

function Full() {
  const [fields, setFields] = useState(defaultFields);
  const [items, setItems] = useState(people);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <Dropdown label="Fields" end id="fields-dropdown">
          <List
            id="fields"
            sortable
            borderless
            small
            itemKey="key"
            onChange={xs => setFields(xs)}
            items={fields}
            fields={[
              {
                key: 'name',
                primary: true,
              },
              { key: 'visible', type: 'switch' },
            ]}
          />
        </Dropdown>
      </div>

      <List
        id="list"
        sortable={boolean('sortable', false)}
        borderless={boolean('borderless', false)}
        small={boolean('small', false)}
        fields={fields.filter(({ visible }) => visible)}
        active={user => user.config.active}
        items={items}
        onChange={xs => setItems(xs)}
      />
    </div>
  );
}

export default Full;
