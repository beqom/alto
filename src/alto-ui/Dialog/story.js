/* eslint-disable import/no-extraneous-dependencies */
import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, array } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import centered from '@storybook/addon-centered';

import StateProvider from '../StateProvider';
import Button from '../Button';
import TextField from '../Form/TextField';
import IconLightbulb from '../Icons/Lightbulb';

import Dialog from './Dialog';
import README from './README.md';

storiesOf('Dialog', module)
  .addDecorator(withReadme(README))
  .addDecorator(centered)
  .addWithJSX('overview', () => (
    <StateProvider state={{ open: false, textfieldValue: '' }}>
      {({ open }, setState) => (
        <Fragment>
          <div aria-hidden={open}>
            <Button id="dialog-trigger-button" onClick={() => setState({ open: true })}>
              Open dialog
            </Button>
          </div>
          <Dialog
            id="demo-dialog-overview"
            open={open}
            onClose={boolean('onClose', true) ? () => setState({ open: false }) : undefined}
            title={text('title', 'Title')}
            openFocusTargetId="dialog-textfield"
            closeFocusTargetId="dialog-trigger-button"
            buttons={array('buttons', ['cancel', 'save']).filter(btn => !!btn)}
            inert={boolean('inert', false)}
          >
            <StateProvider state={{ value: '' }}>
              {({ value }, setContentState) => (
                <TextField
                  id="dialog-textfield"
                  label="Name"
                  placeholder="Write your name here"
                  value={value}
                  onChange={e => setContentState({ value: e.target.value })}
                />
              )}
            </StateProvider>
          </Dialog>
        </Fragment>
      )}
    </StateProvider>
  ))
  .addWithJSX('custom content', () => (
    <Dialog
      open
      id="demo-dialog-custom"
      onClose={boolean('onClose', true) ? () => {} : undefined}
      title={text('title', 'Tips & Tricks ')}
      closeFocusTargetId="dialog-trigger-button"
      buttons={array('buttons', []).filter(btn => !!btn)}
    >
      <div style={{ display: 'flex' }}>
        <div style={{ fontSize: '5rem', color: 'gold', marginRight: '1rem' }}>
          <IconLightbulb />
        </div>
        <div style={{ marginTop: '0.5rem', lineHeight: 1.5 }}>
          Did you know that you can organize files in folder, rename files, add images (png, jpg)
          and create text document ?
        </div>
      </div>
    </Dialog>
  ));
