/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import StateProvider from '../StateProvider';
import Button from '../Button';
import HelpIcon from '../Icons/Help';
import Dropdown from './Dropdown';
import DropdownWrapper from './DropdownWrapper';

storiesOf('Dropdown', module)
  .addDecorator(centered)
  .addWithJSX('playground', () => (
    <StateProvider state={{ open: false }}>
      {({ open }, setState) => (
        <DropdownWrapper>
          <Button id="Dropdown-playground" onClick={() => setState({ open: !open })}>
            Click me
          </Button>
          <Dropdown
            closeFocusTargetId="Dropdown-playground"
            onClose={() => setState({ open: false })}
            open={open}
            right={boolean('right', false)}
            center={boolean('center', true)}
            top={boolean('top', false)}
          >
            {text('children', 'Hello world!')}
          </Dropdown>
        </DropdownWrapper>
      )}
    </StateProvider>
  ))
  .addWithJSX('position and alignment', () => (
    <div style={{ width: 400, display: 'flex', justifyContent: 'space-between' }}>
      <DropdownWrapper>
        <HelpIcon />
        <Dropdown open top>
          top
        </Dropdown>
        <Dropdown open>
          <em>default</em>
        </Dropdown>
      </DropdownWrapper>
      <DropdownWrapper>
        <HelpIcon />
        <Dropdown open top center>
          top center
        </Dropdown>
        <Dropdown open center>
          center
        </Dropdown>
      </DropdownWrapper>
      <DropdownWrapper>
        <HelpIcon />
        <Dropdown open top right>
          top right
        </Dropdown>
        <Dropdown open right>
          right
        </Dropdown>
      </DropdownWrapper>
    </div>
  ));
