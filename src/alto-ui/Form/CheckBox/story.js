/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';

import CheckBox from './CheckBox';

storiesOf('Form/CheckBox', module)
  .addDecorator(centered)
  .addWithJSX('overview', () => (
    <div>
      <CheckBox id="unchecked" label="Unchecked" />
      <CheckBox id="checked" label="Checked" checked />
      <CheckBox id="disabled" label="Disabled" disabled />
      <CheckBox id="disabled-checked" label="Disabled checked" disabled checked />
    </div>
  ));
