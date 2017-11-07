/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { number } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import { action } from '@storybook/addon-actions';

import Pagination from './Pagination';
import README from './README.md';

storiesOf('Pagination', module)
  .addDecorator(withReadme(README))
  .addWithJSX('overview', () => (
    <Pagination max={number('max', 20)} current={number('current', 10)} onClick={action('onClick')} />
  ));
