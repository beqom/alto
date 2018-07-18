/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
// import { boolean, text, number, color, array, object, select, date } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import Datagrid from './Datagrid';

import { rows, columns } from './data.json';

storiesOf('Datagrid', module)
  .addDecorator(centered)
  .add('playground', () => (
    <div style={{ width: 800, maxWidth: '100%', height: 600, maxHeight: '100%' }}>
      <Datagrid rows={rows.slice(0, 30)} rowKeyField={item => item.login_uuid} columns={columns} />
    </div>
  ));
