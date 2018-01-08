/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import withReadme from 'storybook-readme/with-readme';
import centered from '@storybook/addon-centered';

import Switch from './Switch';
import README from './README.md';

storiesOf('Form/Switch', module)
.addDecorator(withReadme(README))
.addDecorator(centered)
.addWithJSX('overview', () => (
  <div>
    <Switch id="unchecked" label="Unchecked" />
    <Switch id="checked" label="Checked" checked />
    <Switch id="disabled" label="Disabled" disabled />
    <Switch id="disabled-checked" label="Disabled checked" disabled checked />
  </div>
));

