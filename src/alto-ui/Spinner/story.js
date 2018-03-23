/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import centered from '@storybook/addon-centered';

import Spinner from './Spinner';
import README from './README.md';

storiesOf('Spinner', module)
  .addDecorator(withReadme(README))
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
