/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import StateProvider from '../StateProvider';
import Button from '../Button';
import Popover from './Popover';
import PopoverWrapper from './PopoverWrapper';

// eslint-disable-next-line react/prop-types
const Cobay = ({ size = '2rem' }) => (
  <span
    style={{
      fontSize: size,
      lineHeight: 1,
      width: size,
      height: size,
      display: 'block',
    }}
    role="img"
    aria-label="monkey"
  >
    🐵
  </span>
);

storiesOf('Popover', module)
  .addDecorator(centered)
  .addWithJSX('playground', () => (
    <StateProvider state={{ open: false }}>
      {({ open }, setState) => (
        <PopoverWrapper>
          <Button id="Popover-playground" onClick={() => setState({ open: !open })}>
            Click me
          </Button>
          <Popover
            closeFocusTargetId="Popover-playground"
            onClose={() => setState({ open: false })}
            open={open}
            top={boolean('top', false)}
            left={boolean('left', false)}
            right={boolean('right', false)}
            start={boolean('start', false)}
            end={boolean('end', false)}
          >
            {text('children', 'Hello world!')}
          </Popover>
        </PopoverWrapper>
      )}
    </StateProvider>
  ))
  .addWithJSX('position', () => (
    <div>
      <PopoverWrapper>
        <Cobay size="4rem" />
        <Popover open top>
          top
        </Popover>
        <Popover open>
          <em>default</em>
        </Popover>
        <Popover open left>
          left
        </Popover>
        <Popover open right>
          right
        </Popover>
      </PopoverWrapper>
    </div>
  ))
  .addWithJSX('vertical alignment', () => (
    <div style={{ width: 400, display: 'flex', justifyContent: 'space-between' }}>
      <PopoverWrapper>
        <Cobay />
        <Popover open top end>
          top end
        </Popover>
        <Popover open end>
          end
        </Popover>
      </PopoverWrapper>
      <PopoverWrapper>
        <Cobay />
        <Popover open top>
          top
        </Popover>
        <Popover open>
          <em>- default -</em>
        </Popover>
      </PopoverWrapper>
      <PopoverWrapper>
        <Cobay />
        <Popover open top start>
          top start
        </Popover>
        <Popover open start>
          start
        </Popover>
      </PopoverWrapper>
    </div>
  ))
  .addWithJSX('horizontal alignment', () => (
    <div
      style={{
        height: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <PopoverWrapper>
        <Cobay />
        <Popover open left end>
          left end
        </Popover>
        <Popover open right end>
          right end
        </Popover>
      </PopoverWrapper>
      <PopoverWrapper>
        <Cobay />
        <Popover open left>
          left
        </Popover>
        <Popover open right>
          right
        </Popover>
      </PopoverWrapper>
      <PopoverWrapper>
        <Cobay />
        <Popover open left start>
          left start
        </Popover>
        <Popover open right start>
          right start
        </Popover>
      </PopoverWrapper>
    </div>
  ));
