/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import { action } from '@storybook/addon-actions';

import Tag from './Tag';

storiesOf('Tag', module)
  .addDecorator(centered)
  .addWithJSX('overview', () => (
    <Tag
      active={boolean('active', false)}
      rounded={boolean('rounded', false)}
      onClick={boolean('onClick', false) ? action('onClick') : undefined}
      disabled={boolean('disabled', false)}
    >
      {text('children', 'My Tag')}
    </Tag>
  ));
