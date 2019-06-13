/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered/react';
import withTests from '../../../withTests';

import Pagination from './Pagination';

storiesOf('Pagination', module)
  .addDecorator(withTests('Pagination'))
  .addDecorator(centered)
  .addWithJSX('overview', () => (
    <Pagination
      id="ComponentPagination"
      totalRecords={number('totalRecords', 100)}
      currentPage={number('currentPage', 1)}
      onChange={action('onChange')}
      pageSize={number('pageSize', 10)}
    />
  ));
