/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';

import Radio from './Radio';

storiesOf('Form/Radio', module)
  .addDecorator(centered)
  .addWithJSX('overview', () => (
    <div>
      <Radio id="inactive" label="Inactive" name="overview" />
      <Radio id="checked" label="Checked" name="overview" checked />
      <Radio id="disabled" label="Disabled" disabled />
      <Radio id="disabled-checked" label="Disabled checked" disabled checked />
    </div>
  ));
