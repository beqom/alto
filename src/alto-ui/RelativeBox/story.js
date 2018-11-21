/* eslint-disable import/no-extraneous-dependencies */
import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number } from '@storybook/addon-knobs';
import { Rnd } from 'react-rnd';

import StateProvider from '../StateProvider';

import RelativeBox from './RelativeBox';

storiesOf('RelativeBox', module).addWithJSX('playground', () => {
  const watch = boolean('watch (is dragging)', false);
  return (
    <StateProvider refs={['target']}>
      {(state, setState, refs) => (
        <Fragment>
          <RelativeBox
            top={boolean('top', false)}
            bottom={boolean('bottom', false)}
            right={boolean('right', false)}
            left={boolean('left', false)}
            start={boolean('start', false)}
            middle={boolean('middle', false)}
            end={boolean('end', false)}
            margin={number('margin')}
            target={refs.target.current}
            watch={watch ? { dragging: state.dragging } : undefined}
            style={{
              padding: 50,
              background: 'black',
              opacity: !watch || !state.dragging ? 1 : 0.5,
              color: 'white',
              width: 250,
              textAlign: 'center',
            }}
          >
            Relative Box
          </RelativeBox>
          <Rnd
            default={{
              x: window.innerWidth / 2 - 100,
              y: window.innerHeight / 2 - 50,
              width: 200,
              height: 100,
            }}
            onDrag={() => {
              setState({ updated: new Date().getTime(), dragging: true });
            }}
            onDragStop={() => {
              setState({ updated: new Date().getTime(), dragging: false });
            }}
            onResize={() => {
              setState({ updated: new Date().getTime() });
            }}
          >
            <div
              ref={refs.target}
              style={{
                background: 'dodgerblue',
                color: 'white',
                height: '100%',
                textAlign: 'center',
                display: 'flex',
              }}
            >
              <span style={{ margin: 'auto' }}>
                Target
                <br />
                (drag and resize me)
              </span>
            </div>
          </Rnd>
        </Fragment>
      )}
    </StateProvider>
  );
});
