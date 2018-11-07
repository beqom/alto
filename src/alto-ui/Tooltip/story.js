/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import Button from '../Button';
import Tooltip from './Tooltip';

storiesOf('Tooltip', module)
  .addDecorator(centered)
  .addWithJSX('overview', () => (
    <Tooltip
      show={boolean('show', false)}
      content={text('content', "Hey I'm a tooltip!")}
      info={boolean('info', false)}
      success={boolean('success', false)}
      error={boolean('error', false)}
      warning={boolean('warning', false)}
      narrow={boolean('narrow', false)}
      wide={boolean('wide', false)}
      top={boolean('top', false)}
      left={boolean('left', false)}
      right={boolean('right', false)}
      big={boolean('big', false)}
    >
      {text('children', 'hover me')}
    </Tooltip>
  ))
  .addWithJSX('sizes', () => {
    const longText =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pulvinar molestie ullamcorper.';
    return (
      <div>
        <Tooltip content={longText} show>
          <div style={{ marginBottom: 80, textAlign: 'center' }}>default</div>
        </Tooltip>
        <Tooltip content="Lorem ipsum dolor sit amet..." show narrow>
          <div style={{ marginBottom: 80, textAlign: 'center' }}>narrow</div>
        </Tooltip>
        <Tooltip content={longText} show wide>
          <div style={{ marginBottom: 80, textAlign: 'center' }}>wide</div>
        </Tooltip>
      </div>
    );
  })
  .addWithJSX('directions', () => (
    <Tooltip content="default" show>
      <Tooltip content="left" show left>
        <Tooltip content="top" show top>
          <Tooltip content="right" show right>
            <Button>Hello world!</Button>
          </Tooltip>
        </Tooltip>
      </Tooltip>
    </Tooltip>
  ));
