/* eslint-disable import/no-extraneous-dependencies, react/prop-types */
import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';

import SimpleDemo from './SimpleDemo';
import Backlog from './Backlog';
import NestedList from './NestedList';
import Full from './Full';

storiesOf('List', module)
  .addDecorator(story => <div style={{ width: 800, maxWidth: '100%' }}>{story()}</div>)
  .addDecorator(centered)
  .addWithJSX('Simple Demo', () => <SimpleDemo />)
  .addWithJSX('Backlog', () => <Backlog />)
  .addWithJSX('NestedList', () => <NestedList />)
  .addWithJSX('Full', () => <Full />);
