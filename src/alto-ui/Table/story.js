/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import centered from '@storybook/addon-centered';

import Table from './Table';
import README from './README.md';

storiesOf('Table', module)
  .addDecorator(centered)
  .addDecorator(withReadme(README))
  .addWithJSX('playground', () => (
    <Table
      wide={boolean('wide', false)}
      compact={boolean('compact', false)}
      columns={[
        { key: 'picture', title: 'Picture', type: 'image' },
        { key: 'name', title: 'Name' },
        { key: 'speak', title: 'Speak ?' },
        { key: 'birth_date', title: 'Birth Date', type: 'date' },
        { key: 'age', title: 'Age' },
      ]}
      rows={[
        {
          id: 1,
          name: 'Bart Simpson',
          age: 12,
          birth_date: '2000-05-17',
          speak: true,
          picture:
            'http://icons.iconarchive.com/icons/jonathan-rey/simpsons/256/Bart-Simpson-01-icon.png',
        },
        {
          id: 2,
          name: 'Lisa Simpson',
          age: 10,
          birth_date: '2002-01-06',
          speak: true,
          picture:
            'http://icons.iconarchive.com/icons/jonathan-rey/simpsons/256/Lisa-Simpson-icon.png',
        },
        {
          id: 3,
          name: 'Maggie Simpson',
          age: 3,
          birth_date: '2009-09-27',
          speak: false,
          picture:
            'http://icons.iconarchive.com/icons/jonathan-rey/simpsons/256/Maggie-Simpson-icon.png',
        },
      ]}
    />
  ));
