/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { text, select, boolean } from '@storybook/addon-knobs';

import GhostInput from './GhostInput';

storiesOf('GhostInput', module)
  .addDecorator(centered)
  .addWithJSX('overview', () => {
    const type = select('type', ['text', 'textarea'], 'text');
    return (
      <div style={{ width: 600 }}>
        <GhostInput
          id="ghostinput-id"
          area={boolean('area', false)}
          type={type}
          label={text('label', 'my input')}
          placeholder={text('placeholder', 'placeholder')}
        />
      </div>
    );
  });
