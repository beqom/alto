/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import withReadme from 'storybook-readme/with-readme';
import centered from '@storybook/addon-centered';

import CheckBox from './CheckBox';
import README from './README.md';

storiesOf('Form/CheckBox', module)
.addDecorator(withReadme(README))
.addDecorator(centered)
.addWithJSX('overview', () => (
  <div>
    <CheckBox id="unchecked" label="Unchecked" />
    <CheckBox id="checked" label="Checked" checked />
    <CheckBox id="disabled" label="Disabled" disabled />
    <CheckBox id="disabled-checked" label="Disabled checked" disabled checked />
  </div>
));

