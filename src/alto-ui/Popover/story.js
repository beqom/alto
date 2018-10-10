/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, number } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import StateProvider from '../StateProvider';
import Button from '../Button';
import Popover from './Popover';

// eslint-disable-next-line react/prop-types
const Cobay = React.forwardRef(({ size = '2rem' }, ref) => (
  <span
    ref={ref}
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
));

storiesOf('Popover', module)
  .addDecorator(centered)
  .addWithJSX('playground', () => (
    <StateProvider state={{ open: false }}>
      {({ open }, setState) => (
        <Popover
          closeFocusTargetId="Popover-playground"
          onClose={() => setState({ open: false })}
          open={open || boolean('open', false)}
          top={boolean('top', false)}
          bottom={boolean('bottom', false)}
          left={boolean('left', false)}
          right={boolean('right', false)}
          start={boolean('start', false)}
          middle={boolean('middle', false)}
          end={boolean('end', false)}
          {...(margin => (!!margin || margin === 0 ? { margin } : {}))(number('margin', undefined))}
          watch={null}
          target={
            <Button id="Popover-playground" onClick={() => setState({ open: !open })}>
              Click me
            </Button>
          }
        >
          {text('children', 'Hello world!')}
        </Popover>
      )}
    </StateProvider>
  ))
  .addWithJSX('position', () => (
    <StateProvider refs={['target']}>
      {(state, setState, refs) => (
        <div>
          <Cobay ref={refs.target} size="4rem" />
          <Popover target={refs.target.current} open top>
            top
          </Popover>
          <Popover target={refs.target.current} open>
            <em>default</em>
          </Popover>
          <Popover target={refs.target.current} open left>
            left
          </Popover>
          <Popover target={refs.target.current} open right>
            right
          </Popover>
        </div>
      )}
    </StateProvider>
  ))
  .addWithJSX('vertical alignment', () => (
    <StateProvider refs={['start', 'middle', 'end']}>
      {(state, setState, refs) => (
        <div style={{ width: 400, display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Cobay ref={refs.end} />
            <Popover target={refs.end.current} open top end>
              top end
            </Popover>
            <Popover target={refs.end.current} open end>
              end
            </Popover>
          </div>
          <div>
            <Cobay ref={refs.middle} />
            <Popover target={refs.middle.current} open top>
              top
            </Popover>
            <Popover target={refs.middle.current} open>
              <em>- default -</em>
            </Popover>
          </div>
          <div>
            <Cobay ref={refs.start} />
            <Popover target={refs.start.current} open top start>
              top start
            </Popover>
            <Popover target={refs.start.current} open start>
              start
            </Popover>
          </div>
        </div>
      )}
    </StateProvider>
  ))
  .addWithJSX('horizontal alignment', () => (
    <StateProvider refs={['start', 'middle', 'end']}>
      {(state, setState, refs) => (
        <div
          style={{
            height: 200,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <Cobay ref={refs.end} />
            <Popover target={refs.end.current} open left end>
              left end
            </Popover>
            <Popover target={refs.end.current} open right end>
              right end
            </Popover>
          </div>
          <div>
            <Cobay ref={refs.middle} />
            <Popover target={refs.middle.current} open left>
              left
            </Popover>
            <Popover target={refs.middle.current} open right>
              right
            </Popover>
          </div>
          <div>
            <Cobay ref={refs.start} />
            <Popover target={refs.start.current} open left start>
              left start
            </Popover>
            <Popover target={refs.start.current} open right start>
              right start
            </Popover>
          </div>
        </div>
      )}
    </StateProvider>
  ));
