/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, number } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import CopyToClipboard from './CopyToClipboard';

storiesOf('CopyToClipboard', module)
  .addDecorator(centered)
  .addWithJSX('playground', () => (
    <CopyToClipboard
      label={text('label', 'Copy to Clipboard')}
      succesLabel={text('succesLabel', 'Text copied')}
      timer={number('timer', undefined)}
    >
      {text('children', 'Text to copy')}
    </CopyToClipboard>
  ));
