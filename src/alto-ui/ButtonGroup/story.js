/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';

import ButtonGroup from './ButtonGroup';
import StateProvider from '../StateProvider';

storiesOf('ButtonGroup', module)
  .addDecorator(centered)
  .addWithJSX('Simple', () => (
    <div style={{ width: 120 }}>
      <StateProvider state={{ value: true }}>
        {(state, setState) => (
          <ButtonGroup
            onChange={value => setState({ value })}
            value={state.value}
            items={[{ title: 'yes', value: true }, { title: 'no', value: false }]}
            small={boolean('small', false)}
          />
        )}
      </StateProvider>
    </div>
  ))
  .addWithJSX('Multiple', () => (
    <div style={{ width: 120 }}>
      <StateProvider state={{ value: true }}>
        {(state, setState) => (
          <ButtonGroup
            onChange={value => setState({ value })}
            value={state.value}
            items={[
              { title: 'yes', value: 'a' },
              { title: 'no', value: 'b' },
              { title: 'not sure', value: 'c' },
            ]}
            small={boolean('small', false)}
          />
        )}
      </StateProvider>
    </div>
  ));
