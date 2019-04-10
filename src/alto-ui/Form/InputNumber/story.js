/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { text, boolean, number, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import InputNumber from './InputNumber';
import StateProvider from '../../StateProvider';

storiesOf('Form/InputNumber', module)
  .addDecorator(centered)
  .addWithJSX('playground', () => {
    const value = text('value', '1500.048');
    return (
      <StateProvider state={{ value }}>
        {(state, setState) => (
          <InputNumber
            id="input-number"
            label="My number input"
            value={state.value}
            precision={number('precision', 2)}
            locale={select('locale', ['en', 'fr', 'de', 'it', 'es', 'tr'], 'en')}
            currency={text('currency', '$')}
            onChange={(...args) => {
              action('onChange')(...args);
              setState({ value: args[1] });
            }}
            disableThousandSeparator={boolean('disableThousandSeparator', false)}
            percent={boolean('percent', false)}
          />
        )}
      </StateProvider>
    );
  });
