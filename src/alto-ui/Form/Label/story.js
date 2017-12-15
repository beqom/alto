/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import withReadme from 'storybook-readme/with-readme';
import centered from '@storybook/addon-centered';

import Label from './Label';
import README from './README.md';

storiesOf('Form/Label', module)
  .addDecorator(withReadme(README))
  .addDecorator(centered)
  .addWithJSX('playground', () => (
    <Label htmlFor="foo">label</Label>
    ));
