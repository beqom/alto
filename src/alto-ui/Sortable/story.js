/* eslint-disable import/no-extraneous-dependencies, react/prop-types */
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { action } from '@storybook/addon-actions';

import Sortable from './Sortable';
import CardWithoutMargin from '../Card';

const fruits = [
  { id: '1', name: 'Apple', icon: '🍎', color: 'red' },
  { id: '9', name: 'Kiwi', icon: '🥝', color: 'green' },
  { id: '3', name: 'Watermelon', icon: '🍉', color: 'red' },
  { id: '10', name: 'Coconut', icon: '🥥', color: 'white' },
  { id: '8', name: 'Strawberry', icon: '🍓', color: 'red' },
  { id: '7', name: 'Lemon', icon: '🍋', color: 'yellow' },
  { id: '4', name: 'Orange', icon: '🍊', color: 'orange' },
  { id: '6', name: 'Cherries', icon: '🍒', color: 'red' },
  { id: '2', name: 'Banana', icon: '🍌', color: 'yellow' },
  { id: '5', name: 'Pear', icon: '🍐', color: 'green' },
];

function Card(props) {
  return (
    <div style={{ padding: '0.25rem' }}>
      <CardWithoutMargin {...props} />
    </div>
  );
}

function Fruit({ icon, name }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span
        style={{
          display: 'inlineBlock',
          lineHeight: 1,
          marginRight: '0.5em',
          fontSize: '1.6em',
        }}
      >
        {icon}
      </span>
      {name}
    </div>
  );
}

function SortableDemo() {
  const [list, setList] = useState(fruits.slice(0, 6));

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
        <Card dragHandleProps={handleProps}>
          <Fruit name={name} icon={icon} />
        </Card>
      )}
    </Sortable>
  );
}

const boxes = [
  {
    id: 'red',
    fruits: fruits.filter(({ color }) => color === 'red'),
  },
  {
    id: 'yellow',
    fruits: fruits.filter(({ color }) => color === 'yellow'),
  },
  {
    id: 'green',
    fruits: fruits.filter(({ color }) => color === 'green'),
  },
];

function NestedSortable() {
  const [list, setList] = useState(boxes);

  return (
    <Sortable onChange={setList} items={list}>
      {(box, handleProps) => (
        <Card dragHandleProps={handleProps} {...{ [box.id]: true }}>
          <Sortable
            onChange={xs => setList(list.map(x => (x.id === box.id ? { ...x, fruits: xs } : x)))}
            items={box.fruits}
          >
            {(fruit, fruitHandleProps) => (
              <Card dragHandleProps={fruitHandleProps}>
                <Fruit {...fruit} />
              </Card>
            )}
          </Sortable>
        </Card>
      )}
    </Sortable>
  );
}

storiesOf('Sortable', module)
  .addDecorator(centered)
  .addWithJSX('playground', () => <SortableDemo />)
  .addWithJSX('nested', () => <NestedSortable />);
