/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { DateTime } from 'luxon';
import { boolean, text } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';
import Avatar from '../Avatar';

import StateProvider from '../StateProvider';

import Table from './Table';

import { simpson, calculatedFields } from './data.json';

const setInArray = (value, arr, keyField = 'id') => {
  const index = arr.findIndex(item => item[keyField] === value[keyField]);
  if (index > -1) {
    return [...arr.slice(0, index), value, ...arr.slice(index + 1)];
  }
  return arr;
};

const sort = (arr, col, direction) => {
  if (!col) return arr;
  return arr.slice().sort((a, b) => {
    if (a[col] < b[col]) return -direction;
    if (a[col] > b[col]) return direction;
    return 0;
  });
};

const DEFAULT_DATE_FORMAT = 'd/L/yyyy hh:mm:ss a';
const parsers = { date: x => DateTime.fromFormat(x, DEFAULT_DATE_FORMAT).toJSDate() };

storiesOf('Table', module)
  .addDecorator(centered)
  .addWithJSX('playground', () => (
    <StateProvider state={{ rows: simpson.rows }}>
      {(state, setState) => (
        <Table
          id="simpson"
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
          onChange={(value, col, row) => {
            const rows = setInArray({ ...row, [col.key]: value }, state.rows);
            setState({ rows });
          }}
          columnSorted={state.columnSorted}
          sortDirection={state.sortDirection}
          columns={simpson.columns}
          isFirstColumnFrozen={boolean('isFirstColumnFrozen', true)}
          rows={sort(state.rows, state.columnSorted, state.sortDirection)}
          parsers={parsers}
          locale="fr"
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
    const renderSummaryCell = state => (col, format) => {
      switch (col.key) {
        case 'agility':
          return format(
            state.rows.reduce((acc, hero) => acc + hero.agility, 0) / state.rows.length
          );
        case 'strength':
          return format(state.rows.reduce((acc, hero) => acc + hero.strength, 0));
        case 'speed':
          return format(state.rows.reduce((acc, hero) => acc + hero.speed, 0));
        case 'intelligence':
          return format(state.rows.reduce((acc, hero) => acc + hero.strength, 0));
        default:
          return null;
      }
    };
    return (
      <StateProvider state={{ rows: calculatedFields.rows }}>
        {(state, setState) => (
          <Table
            id="superheroes"
            columns={calculatedFields.columns.concat([calculatedField])}
            rows={state.rows}
            rowId="name"
            comfortable={boolean('comfortable', false)}
            compact={boolean('compact', false)}
            isFirstColumnFrozen={boolean('isFirstColumnFrozen', true)}
            renderSummaryCell={
              boolean('renderSummaryCell', true) ? renderSummaryCell(state) : undefined
            }
            onChange={(value, col, row) => {
              const rows = setInArray({ ...row, [col.key]: value }, state.rows, 'name');
              setState({ rows });
            }}
            renderers={{
              avatar: (name, col, row) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar src={row.picture} small alt="Picture" />
                  <span style={{ marginLeft: '0.5rem' }}>{name}</span>
                </div>
              ),
            }}
          />
        )}
      </StateProvider>
    );
  });
