/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import centered from '@storybook/addon-centered';

import DatePicker from './DatePicker';
import README from './README.md';
import StateProvider from '../../StateProvider';

storiesOf('Form/DatePicker', module)
  .addDecorator(withReadme(README))
  .addDecorator(centered)
  .addWithJSX('playground', () => (
    <StateProvider>
      {(state, setState) => (
        <DatePicker
          id="Datepicker-demo-1"
          onChange={date => setState({ date })}
          value={state.date}
          label="Choose a date"
          readOnly={boolean('readOnly', false)}
        />
      )}
    </StateProvider>
  ));
