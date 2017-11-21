/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, color } from '@storybook/addon-knobs';

import ChevronLeft from './ChevronLeft';
import ChevronRight from './ChevronRight';
import ChevronUp from './ChevronUp';
import ChevronDown from './ChevronDown';
import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';
import ArrowUp from './ArrowUp';
import ArrowDown from './ArrowDown';

const icons = [
  ChevronLeft,
  ChevronUp,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  ArrowUp,
  ArrowRight,
  ArrowDown,
];

storiesOf('Icons', module).add('all', () => {
  const size = `${number('size', 30, { range: true, step: 1, min: 5, max: 600 })}px`;
  const col = color('color', '#333C48');
  const iconsElts = icons.map(Icon => (
    <div
      key={Icon.displayName}
      style={{ textAlign: 'center', display: 'inline-block', margin: 10 }}
    >
      <div style={{ padding: 10 }}>
        <Icon size={size} color={col} />
      </div>
      <div>{Icon.displayName}</div>
    </div>
  ));

  return <div style={{ textAlign: 'justify' }}>{iconsElts}</div>;
});

icons.forEach(Icon => {
  storiesOf('Icons', module).add(Icon.displayName, () => (
    <Icon
      size={`${number('size', 50, { range: true, step: 1, min: 5, max: 600 })}px`}
      color={color('color', '#333C48')}
    />
  ));
});
