/* eslint-disable import/no-extraneous-dependencies */
import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import ProgressBar from './ProgressBar';

storiesOf('ProgressBar', module)
  .addDecorator(story => <div style={{ width: 300, maxWidth: '100%' }}>{story()}</div>)
  .addDecorator(centered)
  .addWithJSX('overview', () => (
    <ProgressBar
      small={boolean('small', false)}
      large={boolean('large', false)}
      looping={boolean('looping', false)}
      tooltipPersistent={boolean('tooltipPersistent', false)}
      max={number('max', undefined)}
      min={number('min', undefined)}
      value={number('value', 0.33)}
    />
  ))
  .addWithJSX('sizes', () => (
    <Fragment>
      <ProgressBar small tooltipPersistent value={0.4} />
      <br />
      <br />
      <br />
      <ProgressBar tooltipPersistent value={0.4} />
      <br />
      <br />
      <br />
      <ProgressBar large tooltipPersistent value={0.4} />
    </Fragment>
  ));
