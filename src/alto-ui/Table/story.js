/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { DateTime } from 'luxon';
import { boolean, text } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';
import Avatar from '../Avatar';

import StateProvider from '../StateProvider';

import Table from './TableContainer';

import { simpson, calculatedFields, groupedColumn } from './data.json';

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

const avatarRenderer = {
  avatar: (name, col, row) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Avatar src={row.picture} small alt="Picture" />
      <span style={{ marginLeft: '0.5rem' }}>{name}</span>
    </div>
  ),
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
    const renderSummaryCell = state => (col, row, format) => {
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
            modifiers={(value, col) => {
              if (col.key !== 'power') return {};
              return {
                success: value && value > 400,
                warning: value && value < 400 && value > 200,
                danger: !value || value < 200,
              };
            }}
            renderSummaryCell={
              boolean('renderSummaryCell', true) ? renderSummaryCell(state) : undefined
            }
            onChange={(value, col, row) => {
              const rows = setInArray({ ...row, [col.key]: parseFloat(value) }, state.rows, 'name');
              setState({ rows });
            }}
            edited={(col, row, colIndex, rowIndex) =>
              state.rows[rowIndex][col.key] !== calculatedFields.rows[rowIndex][col.key]
            }
            renderers={avatarRenderer}
          />
        )}
      </StateProvider>
    );
  })
  .addWithJSX('Grouped column', () => {
    const renderSummaryGroupCell = (state, groupedByColumnId) => (col, row, format) => {
      const items = state.rows.filter(item => item[groupedByColumnId] === row[groupedByColumnId]);
      switch (col.key) {
        case 'agility':
          return format(items.reduce((acc, hero) => acc + hero.agility, 0) / items.length);
        case 'speed':
          return format(items.reduce((acc, hero) => acc + hero.speed, 0));
        default:
          return null;
      }
    };
    return (
      <StateProvider state={{ rows: groupedColumn.rows }}>
        {(state, setState) => (
          <Table
            id="groupedColumn"
            rowId="id"
            compact={boolean('compact', false)}
            comfortable={boolean('comfortable', false)}
            groupedByColumnId="name"
            onChange={(value, col, row) => {
              const rows = setInArray({ ...row, [col.key]: value }, state.rows);
              setState({ rows });
            }}
            columnSorted={state.columnSorted}
            sortDirection={state.sortDirection}
            columns={groupedColumn.columns}
            isFirstColumnFrozen={boolean('isFirstColumnFrozen', true)}
            rows={sort(state.rows, state.columnSorted, state.sortDirection)}
            renderers={avatarRenderer}
            renderSummaryGroupCell={
              boolean('renderSummaryGroupCell', true)
                ? renderSummaryGroupCell(state, 'name')
                : undefined
            }
          />
        )}
      </StateProvider>
    );
  });
