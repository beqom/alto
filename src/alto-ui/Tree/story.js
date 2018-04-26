/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { action } from '@storybook/addon-actions';

import StateProvider from '../StateProvider';
import ObjectsIcon from '../Icons/Objects';
import ImageIcon from '../Icons/Image';

import Tree from './Tree';

import { items } from './data.json';

const delay = (ms, cb) => new Promise(res => setTimeout(() => res(cb()), ms));

storiesOf('Tree', module)
  .addDecorator(story => (
    <div style={{ minHeight: 400, minWidth: 400, overflow: 'auto' }}>{story()}</div>
  ))
  .addDecorator(centered)
  .addWithJSX('playground', () => (
    <StateProvider state={{ selected: '5aabf8b8965960c3349c4c80' }}>
      {(state, setState) => (
        <Tree
          onClick={item => setState({ selected: item.id })}
          items={items}
          selected={state.selected}
          renderIcon={item => (item.children.length ? ObjectsIcon : ImageIcon)}
          onToggle={action('onToggle')}
        />
      )}
    </StateProvider>
  ))
  .addWithJSX('async', () => (
    <StateProvider state={{ selected: null }}>
      {(state, setState) => (
        <Tree
          onClick={item => setState({ selected: item.title })}
          items={[{ title: '1' }, { title: '2' }, { title: '3' }]}
          selected={state.selected}
          keyField="title"
          hasChildren={item => !item.last}
          getChildren={item =>
            item.last
              ? null
              : delay(1000, () =>
                  [...Array(Math.round(Math.random() * 2) + 1).keys()].map(i => ({
                    title: `${item.title}-${i + 1}`,
                    last: !!(Math.round(Math.random() + 1) % 2),
                  }))
                )
          }
          renderIcon={item => (!item.last ? ObjectsIcon : ImageIcon)}
          onToggle={action('onToggle')}
        />
      )}
    </StateProvider>
  ))
  .addWithJSX('using links', () => (
    <Tree
      href={item => `/item/${item.id}`}
      items={items}
      selected="5aabf8b8965960c3349c4c80"
      renderIcon={item => (item.children.length ? ObjectsIcon : ImageIcon)}
      onToggle={action('onToggle')}
    />
  ));
