/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';

import CloseButton from './CloseButton';

storiesOf('CloseButton', module)
  .addDecorator(centered)
  .addWithJSX('overview', () => <CloseButton a11yLabel="Close panel" />)
  .addWithJSX('link', () => (
    <div style={{ display: 'flex', width: '100px', justifyContent: 'space-between' }}>
      <CloseButton a11yLabel="Close panel" />
      <CloseButton href="#foo" a11yLabel="Close panel link" />
    </div>
  ));
