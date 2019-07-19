/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';

import Spinner from './Spinner';

storiesOf('Spinner', module)
  .addDecorator(centered)
  .addWithJSX('playground', () => (
    <Spinner small={boolean('small', false)} large={boolean('large', false)} />
  ))
  .addWithJSX('sizes', () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Spinner small />
      <br />
      <Spinner />
      <br />
      <Spinner large />
    </div>
  ))
  .addWithJSX('show/hide with children', () => (
    <Spinner show={boolean('show', true)}>{text('children', 'Hello')}</Spinner>
  ));
