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
      id="MyProgressBar"
      small={boolean('small', false)}
      large={boolean('large', false)}
      looping={boolean('looping', false)}
      tooltipProps={{
        ...(boolean('tooltipProps.show', false) ? { show: true } : {}),
        top: boolean('tooltipProps.top', true),
      }}
      max={number('max', undefined)}
      min={number('min', undefined)}
      value={number('value', 0.33)}
    />
  ))
  .addWithJSX('sizes', () => (
    <Fragment>
      <ProgressBar small tooltipProps={{ show: true }} value={0.4} />
      <br />
      <br />
      <br />
      <ProgressBar tooltipProps={{ show: true }} value={0.4} />
      <br />
      <br />
      <br />
      <ProgressBar large tooltipProps={{ show: true }} value={0.4} />
    </Fragment>
  ));
