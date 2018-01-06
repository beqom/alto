/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import centered from '@storybook/addon-centered';

import Table from './Table';
import README from './README.md';

storiesOf('Table', module)
  .addDecorator(centered)
  .addDecorator(withReadme(README))
  .addWithJSX('playground', () => (
    <Table
      wide={boolean('wide', false)}
      compact={boolean('compact', false)}
      rows={[
        { id: 1, name: 'Bart Simpson', age: 12 },
        { id: 2, name: 'Lisa Simpson', age: 10 },
        { id: 3, name: 'Maggie Simpson', age: 3 },
      ]}
    />
  ));
