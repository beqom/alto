/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';

import Header from './Header';
import Button from '../Button';

storiesOf('Header', module).addWithJSX('overview', () => (
  <Header
    superTitle={text('superTitle', 'Super title')}
    superUrl={text('superUrl', '')}
    title={text('title', 'Title')}
    loading={boolean('loading', false)}
  >
    <Button flat>secondary</Button>
    <Button>primary</Button>
  </Header>
));
