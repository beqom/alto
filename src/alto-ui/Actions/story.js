/* eslint-disable import/no-extraneous-dependencies, react/prop-types */
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { number } from '@storybook/addon-knobs';

import Pencil from '../Icons/Pencil';
import Duplicate from '../Icons/Duplicate';
import Trash from '../Icons/Trash';
import Cog from '../Icons/Cog';

import ActionsStateLess from './Actions';

function Actions(props) {
  const [selection, setSelection] = useState({});
  return (
    <ActionsStateLess
      {...props}
      items={props.items.map(elt => ({
        ...elt,
        active: selection[elt.key],
        onClick: () => setSelection({ [elt.key]: !selection[elt.key] }),
      }))}
    />
  );
}

const items = [
  {
    key: '1',
    icon: Pencil,
    title: 'Edit',
    onClick: () => {},
  },
  {
    key: '2',
    icon: Duplicate,
    title: 'Duplicate',
    onClick: () => {},
  },
  {
    key: '3',
    icon: Trash,
    title: 'Delete',
    onClick: () => {},
  },
  {
    key: '4',
    icon: Cog,
    title: 'Settings',
    onClick: () => {},
  },
];

storiesOf('Actions', module)
  .addDecorator(centered)
  .addWithJSX('overview', () => (
    <Actions
      id="actions"
      max={number('max', 3, { min: 0, max: 4, step: 1 })}
      items={items.slice(
        0,
        number('How many actions ?', 3, { range: true, min: 0, max: 4, step: 1 })
      )}
    />
  ));
