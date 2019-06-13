/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered/react';

import Input from './Input';

const options = [
  { title: 'Apple', value: 'apple' },
  { title: 'Banana', value: 'banana' },
  { title: 'Orange', value: 'orange' },
];

storiesOf('Input', module)
  .addDecorator(centered)
  .addWithJSX('playground', () => {
    const type = select(
      'type',
      [
        'number',
        'integer',
        'float',
        'boolean',
        'date',
        'datetime',
        'select',
        'dropdown',
        'text',
        'textarea',
      ],
      'number'
    );
    return (
      <Input
        id="input"
        type={type}
        onChange={action('onChange')}
        {...(['select', 'dropdown'].includes(type) ? { options } : undefined)}
        label={text('label', 'my input')}
      />
    );
  });
