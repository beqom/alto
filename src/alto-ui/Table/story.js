/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';
import Avatar from '../Avatar';

import StateProvider from '../StateProvider';

import Table from './Table';

import { simpson, calculatedFields } from './data.json';

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
          columns={simpson.columns}
          rows={sort(simpson.rows, state.columnSorted, state.sortDirection)}
        />
      )}
    </StateProvider>
  ))
  .addWithJSX('Calculated fields', () => {
    const calculatedField = {
      key: 'power',
      title: 'Power',
      formula: text('Power formula', '(([strength] + [speed]) * [agility]) * [intelligence] / 100'),
    };
    return (
      <Table
        columns={calculatedFields.columns.concat([calculatedField])}
        rows={calculatedFields.rows}
        rowId="name"
        renderers={{
          avatar: (name, col, row) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src={row.picture} small alt="Picture" />
              <span style={{ marginLeft: '0.5rem' }}>{name}</span>
            </div>
          ),
        }}
      />
    );
  });
