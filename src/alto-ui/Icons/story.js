/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { number, color, boolean } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';

import icons from './index';
import TextField from '../Form/TextField';

const AllIcons = props => {
  const [search, setSearch] = useState('');
  const iconsElts = Object.entries(icons)
    .filter(([name]) => name.toLowerCase().includes(search.toLowerCase()))
    .map(([name, Icon]) => (
      <div
        key={name}
        style={{
          textAlign: 'center',
          display: 'flex',
          padding: 10,
          width: '25%',
          alignItems: 'center',
        }}
      >
        <div style={{ padding: 10 }}>
          <Icon {...props} />
        </div>
        <div style={{ marginLeft: 10 }}>{name}</div>
      </div>
    ));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 20 }}>
      <TextField
        id="search"
        label="Search"
        hideLabel
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        clearable
        large
      />
      <div style={{ marginTop: 20, overflow: 'auto' }}>
        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          {iconsElts}
        </div>
      </div>
    </div>
  );
};

storiesOf('Icons', module).add('all', () => (
  <AllIcons
    outline={boolean('outline', false)}
    badged={boolean('badged', false)}
    size={`${number('size', 30, { range: true, step: 1, min: 5, max: 600 })}px`}
    weight={number('weight', 0, { range: true, step: 1, min: 0, max: 10 })}
    color={color('color', '#333C48')}
    onClick={boolean('onClick', false) ? () => {} : undefined}
  />
));

Object.entries(icons).forEach(([name, Icon]) => {
  storiesOf('Icons', module)
    .addDecorator(centered)
    .add(name, () => (
      <Icon
        outline={boolean('outline', false)}
        badged={boolean('badged', false)}
        size={`${number('size', 50, { range: true, step: 1, min: 5, max: 600 })}px`}
        color={color('color', '#333C48')}
        weight={number('weight', 0, { range: true, step: 1, min: 0, max: 10 })}
        onClick={boolean('onClick', false) ? () => {} : undefined}
      />
    ));
});
