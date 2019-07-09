/* eslint-disable import/no-extraneous-dependencies, react/prop-types */
import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';

import SimpleDemo from './SimpleDemo';
import Simple from './Simple';
import Backlog from './Backlog';
import NestedList from './NestedList';
import Full from './Full';
import List from '../List';
import Button from '../../Button';

storiesOf('List', module)
  .addDecorator(story => <div style={{ width: 800, maxWidth: '100%' }}>{story()}</div>)
  .addDecorator(centered)
  .addWithJSX('Standard', () => <SimpleDemo />)
  .addWithJSX('Simple', () => <Simple />)
  .addWithJSX('Backlog', () => <Backlog />)
  .addWithJSX('Nested Auto', () => <NestedList />)
  .addWithJSX('Full', () => <Full />)
  .addWithJSX('Nested Custom', () => (
    <List borderless items={['apple', 'orange', 'banana']}>
      {item => (
        <div style={{ padding: '5px 10px 20px 30px' }}>
          <List
            items={[...Array(3).keys()].map(n => `${item} ${n + 1}`)}
            fields={child => [
              { key: 'title', render: () => child, primary: true },
              {
                key: 'add',
                render: () => (
                  <Button small on>
                    add
                  </Button>
                ),
              },
            ]}
          />
        </div>
      )}
    </List>
  ));
