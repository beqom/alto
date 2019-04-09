/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { action } from '@storybook/addon-actions';

import Sortable from './Sortable';
import DragHandleIcon from '../Icons/DragHandle';
import Card from '../Card';

const fruits = [
  { id: '1', name: 'Apple', icon: '🍎' },
  // { id: '2', name: 'Banana', icon: '🍌' },
  { id: '3', name: 'Watermelon', icon: '🍉' },
  // { id: '4', name: 'Orange', icon: '🍊' },
  // { id: '5', name: 'Pear', icon: '🍐' },
  { id: '6', name: 'Cherries', icon: '🍒' },
  { id: '7', name: 'Lemon', icon: '🍋' },
  // { id: '8', name: 'Strawberry', icon: '🍓' },
  { id: '9', name: 'Kiwi', icon: '🥝' },
  { id: '10', name: 'Coconut', icon: '🥥' },
];

function SortableDemo() {
  const [list, setList] = useState(fruits);

  return (
    <Sortable
      items={list}
      onChange={(newList, item, from, to) => {
        setList(newList);
        action(`move ${item.icon} ${item.name} from ${from} to ${to}. onChange params:`)(
          newList,
          item,
          from,
          to
        );
      }}
    >
      {({ name, icon }, handleProps) => (
        <div style={{ padding: '0.25rem' }}>
          <Card small>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <DragHandleIcon {...handleProps} />
              <span
                style={{
                  display: 'inlineBlock',
                  lineHeight: 1,
                  margin: '0 0.5em',
                  fontSize: '1.6em',
                }}
              >
                {icon}
              </span>
              {name}
            </div>
          </Card>
        </div>
      )}
    </Sortable>
  );
}

storiesOf('Sortable', module)
  .addDecorator(centered)
  .addWithJSX('playground', () => <SortableDemo />);
