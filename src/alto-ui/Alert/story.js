/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered';

import Alert from './Alert';

storiesOf('Alert', module)
  .addDecorator(centered)
  .addWithJSX('overview', () => (
    <Alert
      id="MyAlert"
      filled={boolean('filled', false)}
      success={boolean('success', false)}
      warning={boolean('warning', false)}
      error={boolean('error', false)}
      show={boolean('show', true)}
      onClose={boolean('onClose', true) ? action('onClose') : undefined}
    >
      {text('children', 'Hello world!')}
    </Alert>
  ))
  .addWithJSX('styles', () => (
    <div>
      <Alert
        info
        filled={boolean('filled', false)}
        onClose={boolean('onClose', true) ? action('onClose') : undefined}
      >
        info
      </Alert>
      <Alert
        success
        filled={boolean('filled', false)}
        onClose={boolean('onClose', true) ? action('onClose') : undefined}
      >
        success
      </Alert>
      <Alert
        warning
        filled={boolean('filled', false)}
        onClose={boolean('onClose', true) ? action('onClose') : undefined}
      >
        warning
      </Alert>
      <Alert
        error
        filled={boolean('filled', false)}
        onClose={boolean('onClose', true) ? action('onClose') : undefined}
      >
        error
      </Alert>
    </div>
  ))
  .addWithJSX('long text', () => (
    <Alert
      filled={boolean('filled', false)}
      success={boolean('success', false)}
      warning={boolean('warning', false)}
      error={boolean('error', false)}
      onClose={boolean('onClose', true) ? action('onClose') : undefined}
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vulputate nisi a erat blandit
      interdum a non lorem. Sed congue ut nunc vitae malesuada. Pellentesque egestas placerat ante
      ut porttitor. Nullam lacinia nunc nec libero malesuada, vel maximus quam luctus. Nullam eu
      neque sapien. Cras vehicula molestie posuere. Suspendisse euismod consectetur semper.
    </Alert>
  ));
