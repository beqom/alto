/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';
import { colors } from './data.json';

import Typeahead from './Typeahead';

const colorList = Object.entries(colors).map(([name, hex]) => ({ name, hex }));

const fetchList = (page, pageSize, search) =>
  new Promise(res =>
    setTimeout(() => {
      const list = Object.keys(colors).filter(
        color => !search || color.toLowerCase().includes(search.toLowerCase())
      );
      return res({
        total: list.length,
        items: list.slice((page - 1) * pageSize, page * pageSize),
      });
    }, 2000)
  );

storiesOf('Form/Typeahead', module)
  .addDecorator(centered)
  .add('overview', () =>
    React.createElement(() => {
      const [value, setValue] = useState('');
      return (
        <div style={{ width: 300 }}>
          <Typeahead
            items={Object.keys(colors)}
            onChange={setValue}
            value={value}
            loading={boolean('loading', false)}
            clearable={boolean('clearable', true)}
          />
        </div>
      );
    })
  )
  .add('small result', () =>
    React.createElement(() => {
      const [value, setValue] = useState('true');
      return (
        <div style={{ width: 150 }}>
          <Typeahead items={['true', 'false']} onChange={setValue} value={value} />
        </div>
      );
    })
  )
  .add('paginated', () =>
    React.createElement(() => {
      const [{ list, total, fetching, page: currentPage }, setState] = useState({
        total: null,
        list: null,
        fetching: false,
      });
      const [value, setValue] = useState('');
      const pageSize = number('page size', 20, {
        range: true,
        min: 1,
        max: colorList.length,
        step: 1,
      });
      const fetchItems = (page = 1, search = '') => {
        setState(state => ({ ...state, page, search, fetching: true }));
        fetchList(page, pageSize, search).then(result => {
          setState(state =>
            state.page === page && state.search === search
              ? {
                  ...state,
                  total: result.total,
                  list: page === 1 ? result.items : [...state.list, ...result.items],
                  fetching: false,
                }
              : state
          );
        });
      };

      const handleOpen = loadFirstPage => {
        if (!list) loadFirstPage();
      };

      return (
        <div style={{ width: 300 }}>
          <Typeahead
            label="On demand and Pagination"
            items={currentPage === 1 && fetching ? [] : list}
            onChange={setValue}
            value={value}
            loading={fetching}
            onOpen={handleOpen}
            onChangePage={fetchItems}
            totalItems={total}
            pageSize={pageSize}
          />
        </div>
      );
    })
  );
