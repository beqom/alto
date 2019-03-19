/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import Aside from './Aside';
import Button from '../Button';

function AsideStory(props) {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ flex: '1', display: 'flex' }}>
        <div style={{ margin: 'auto' }}>
          <Button onClick={() => setOpen(!open)}>Toggle</Button>
        </div>
      </div>
      <Aside {...props} show={open} onClose={() => setOpen(false)} />
    </div>
  );
}

storiesOf('Aside', module).addWithJSX('overview', () => (
  <AsideStory title={text('title', 'My Panel')}>
    {text(
      'children',
      'Officia irure enim do irure sunt laboris ex adipisicing. Sunt velit duis reprehenderit nulla aute anim tempor.'
    )}
  </AsideStory>
));
