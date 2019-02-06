/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { text, select } from '@storybook/addon-knobs';

import StateProvider from '../StateProvider';
import GhostInput from './GhostInput';

storiesOf('GhostInput', module)
  .addDecorator(centered)
  .addWithJSX('overview', () => {
    const type = select('type', ['text', 'textarea'], 'text');
    return (
      <StateProvider state={{ value: '' }}>
        {(state, setState) => (
          <div style={{ width: 600 }}>
            <GhostInput
              id="ghostinput-id"
              type={type}
              label={text('label', 'my input')}
              placeholder={text('placeholder', 'Type something here...')}
              onChange={(_, value) => setState({ value })}
              value={state.value}
            />
          </div>
        )}
      </StateProvider>
    );
  });
