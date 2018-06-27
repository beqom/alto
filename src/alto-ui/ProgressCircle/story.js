/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number, text } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import ProgressCircle from './ProgressCircle';

storiesOf('ProgressCircle', module)
  .addDecorator(centered)
  .addWithJSX('playground', () => (
    <ProgressCircle
      id="MyProgressCircle"
      small={boolean('small', false)}
      large={boolean('large', false)}
      max={number('max', undefined)}
      min={number('min', undefined)}
      value={number('value', 0.33)}
    >
      {text('children', '')}
    </ProgressCircle>
  ))
  .addWithJSX('sizes', () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 340,
      }}
    >
      <ProgressCircle small value={0.4} />
      <ProgressCircle value={0.4} />
      <ProgressCircle large value={0.4} />
    </div>
  ));
