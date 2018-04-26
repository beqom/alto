/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';

import Switch from './Switch';

storiesOf('Form/Switch', module)
  .addDecorator(centered)
  .addWithJSX('overview', () => (
    <div>
      <Switch id="unchecked" label="Unchecked" />
      <Switch id="checked" label="Checked" checked />
      <Switch id="disabled" label="Disabled" disabled />
      <Switch id="disabled-checked" label="Disabled checked" disabled checked />
    </div>
  ));
