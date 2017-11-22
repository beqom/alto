/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import withReadme from 'storybook-readme/with-readme';

import RadioButton from './RadioButton';
import README from './README.md';

storiesOf('Form/RadioButton', module)
  .addDecorator(withReadme(README))
  .addWithJSX('overview', () => (
    <div>
      <RadioButton id="inactive" label="Inactive" name="overview" />
      <RadioButton id="checked" label="Checked" name="overview" checked />
      <RadioButton id="disabled" label="Disabled" disabled />
      <RadioButton id="disabled-checked" label="Disabled checked" disabled checked />
    </div>
  ));
