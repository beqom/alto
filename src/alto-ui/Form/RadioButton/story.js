/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';

import RadioButton from './RadioButton';

storiesOf('Form/RadioButton', module)
  .addDecorator(centered)
  .addWithJSX('overview', () => (
    <div>
      <RadioButton id="inactive" label="Inactive" name="overview" />
      <RadioButton id="checked" label="Checked" name="overview" checked />
      <RadioButton id="disabled" label="Disabled" disabled />
      <RadioButton id="disabled-checked" label="Disabled checked" disabled checked />
    </div>
  ));
