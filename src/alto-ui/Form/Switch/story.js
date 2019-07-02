/* eslint-disable import/no-extraneous-dependencies, react/prop-types */
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { boolean } from '@storybook/addon-knobs';

import SwitchSateLess from './Switch';

const Switch = props => {
  const [checked, check] = useState(props.checked);
  return <SwitchSateLess {...props} checked={checked} onChange={check} />;
};

storiesOf('Form/Switch', module)
  .addDecorator(centered)
  .addWithJSX('overview', () => {
    const props = {
      left: boolean('left'),
      small: boolean('small'),
      hideLabel: boolean('hideLabel'),
    };
    return (
      <div>
        <Switch id="unchecked" label="Unchecked" {...props} />
        <Switch id="checked" label="Checked" checked {...props} />
        <Switch id="disabled" label="Disabled" disabled {...props} />
        <Switch id="disabled-checked" label="Disabled checked" disabled checked {...props} />
      </div>
    );
  })
  .addWithJSX('sizes', () => {
    const props = {
      left: boolean('left'),
    };
    return (
      <div>
        <Switch id="normal" label="Default" {...props} />
        <Switch id="small" label="Small" small checked {...props} />
      </div>
    );
  });
