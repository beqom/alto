/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';

import Fieldset from './Fieldset';
import TextField from '../TextField';

storiesOf('Form/Fieldset', module)
  .addDecorator(centered)
  .addWithJSX('playground', () => (
    <Fieldset id="fieldset" legend={text('legend', 'List of input')}>
      <TextField id="TextField__1" label="First input" />
      <TextField id="TextField__2" label="Second input" />
      <TextField id="TextField__2" label="Third input" />
    </Fieldset>
  ));
