/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, color, boolean } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import icons from './index';

storiesOf('Icons', module).add('all', () => {
  const outlineProps = boolean('outline', false) ? { outline: true } : {};
  const badged = boolean('badged', false);
  const size = `${number('size', 30, { range: true, step: 1, min: 5, max: 600 })}px`;
  const weight = number('weight', 0, { range: true, step: 1, min: 0, max: 10 });
  const col = color('color', '#333C48');
  const iconsElts = Object.entries(icons).map(([name, Icon]) => (
    <div
      key={name}
      style={{
        textAlign: 'center',
        display: 'flex',
        padding: 10,
        width: '33%',
        alignItems: 'center',
      }}
    >
      <div style={{ padding: 10 }}>
        <Icon
          {...outlineProps}
          badged={badged}
          size={size}
          color={col}
          weight={weight}
          onClick={boolean('onClick', false) ? () => {} : undefined}
        />
      </div>
      <div style={{ marginLeft: 10 }}>{name}</div>
    </div>
  ));

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        margin: 20,
      }}
    >
      {iconsElts}
    </div>
  );
});

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
