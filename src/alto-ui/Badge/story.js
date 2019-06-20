/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';

import Badge from './Badge';

storiesOf('Badge', module)
  .addDecorator(centered)
  .addWithJSX('colors', () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 300,
      }}
    >
      <Badge>default</Badge>
      {[
        'red',
        'orange',
        'yellow',
        'lime',
        'green',
        'pine',
        'teal',
        'blue',
        'indigo',
        'purple',
        'pink',
        'black',
      ].map(color => (
        <Badge key={color} {...{ [color]: true }}>
          {color}
        </Badge>
      ))}
    </div>
  ));
