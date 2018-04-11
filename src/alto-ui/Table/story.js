/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import centered from '@storybook/addon-centered';

import StateProvider from '../StateProvider';

import Table from './Table';
import README from './README.md';

const rows = [
  {
    id: 1,
    name: 'Bart Simpson',
    age: 12,
    birth_date: '2000-05-17',
    speak: true,
    picture:
      'http://icons.iconarchive.com/icons/jonathan-rey/simpsons/256/Bart-Simpson-01-icon.png',
  },
  {
    id: 2,
    name: 'Lisa Simpson',
    age: 10,
    birth_date: '2002-01-06',
    speak: true,
    picture: 'http://icons.iconarchive.com/icons/jonathan-rey/simpsons/256/Lisa-Simpson-icon.png',
  },
  {
    id: 3,
    name: 'Maggie Simpson',
    age: 3,
    birth_date: '2009-09-27',
    speak: false,
    picture: 'http://icons.iconarchive.com/icons/jonathan-rey/simpsons/256/Maggie-Simpson-icon.png',
  },
];

const sort = (arr, col, direction) => {
  if (!col) return arr;
  return arr.slice().sort((a, b) => {
    if (a[col] < b[col]) return -direction;
    if (a[col] > b[col]) return direction;
    return 0;
  });
};

storiesOf('Table', module)
  .addDecorator(centered)
  .addDecorator(withReadme(README))
  .addWithJSX('playground', () => (
    <StateProvider state={{}}>
      {(state, setState) => (
        <Table
          comfortable={boolean('comfortable', false)}
          compact={boolean('compact', false)}
          onSort={col => {
            if (col.key === state.columnSorted) {
              if (state.sortDirection === -1) {
                setState({ columnSorted: null });
              } else {
                setState({ sortDirection: -1 });
              }
            } else {
              setState({ columnSorted: col.key, sortDirection: 1 });
            }
          }}
          columnSorted={state.columnSorted}
          sortDirection={state.sortDirection}
          columns={[
            { key: 'picture', title: 'Picture', type: 'image' },
            { key: 'name', title: 'Name' },
            { key: 'speak', title: 'Talks?' },
            { key: 'birth_date', title: 'Birth Date', type: 'date' },
            { key: 'age', title: 'Age' },
          ]}
          rows={sort(rows, state.columnSorted, state.sortDirection)}
        />
      )}
    </StateProvider>
  ));
