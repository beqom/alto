/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, color, boolean } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import ArrowDown from './ArrowDown';
import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';
import ArrowUp from './ArrowUp';
import Bell from './Bell';
import Bolt from './Bolt';
import ChevronDown from './ChevronDown';
import ChevronLeft from './ChevronLeft';
import ChevronRight from './ChevronRight';
import ChevronUp from './ChevronUp';
import Lightbulb from './Lightbulb';
import Objects from './Objects';
import Search from './Search';

const icons = [
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  ArrowRight,
  Bell,
  Bolt,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  ChevronRight,
  Lightbulb,
  Objects,
  Search,
];

storiesOf('Icons', module)
  .addDecorator(centered)
  .add('all', () => {
    const outlineProps = boolean('outline', false) ? { outline: true } : {};
    const size = `${number('size', 30, { range: true, step: 1, min: 5, max: 600 })}px`;
    const col = color('color', '#333C48');
    const iconsElts = icons.map(Icon => (
      <div
        key={Icon.displayName}
        style={{ textAlign: 'center', display: 'inline-block', margin: 10 }}
      >
        <div style={{ padding: 10 }}>
          <Icon {...outlineProps} size={size} color={col} />
        </div>
        <div>{Icon.displayName}</div>
      </div>
    ));

    return <div style={{ textAlign: 'justify' }}>{iconsElts}</div>;
  })

icons.forEach(Icon => {
  storiesOf('Icons', module).add(Icon.displayName, () => (
    <Icon
      outline={boolean('outline', false)}
      size={`${number('size', 14, { range: true, step: 1, min: 5, max: 600 })}px`}
      color={color('color', '#333C48')}
    />
  ));
});
