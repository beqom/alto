/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';

import Label from './Label';

storiesOf('Form/Label', module)
  .addDecorator(centered)
  .addWithJSX('playground', () => <Label htmlFor="foo">label</Label>);
