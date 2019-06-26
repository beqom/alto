/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, array } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import StateProvider from '../StateProvider';
import Button from '../Button';
import TextField from '../Form/TextField';
import IconLightbulb from '../Icons/Lightbulb';

import Dialog from './Dialog';

storiesOf('Dialog', module)
  .addDecorator(centered)
  .addWithJSX('overview', () => (
    <StateProvider state={{ open: false, textfieldValue: '' }}>
      {({ open }, setState) => (
        <>
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
        </>
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
  ))
  .addWithJSX('long text', () => (
    <Dialog
      open
      id="demo-dialog-custom"
      onClose={boolean('onClose', true) ? () => {} : undefined}
      title={text('title', 'Tips & Tricks ')}
      closeFocusTargetId="dialog-trigger-button"
      buttons={['reject', 'accept']}
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vulputate tellus leo. Donec
      mollis posuere urna, ac lobortis tortor commodo gravida. Maecenas et pellentesque massa.
      Nullam pharetra vestibulum felis, lacinia finibus diam eleifend eget. Integer ut sapien
      facilisis, sodales erat sed, sagittis dolor. Fusce eget quam pretium, aliquet ante non,
      vulputate sapien.
      <br />
      <br />
      Praesent dictum, felis sed tempor eleifend, ex nulla luctus nibh, nec rutrum nunc leo at est.
      Praesent a vulputate felis, et commodo velit. Suspendisse id lacus nec quam faucibus blandit a
      a justo. Quisque ante eros, tristique eget euismod et, lacinia at nunc. Nulla facilisi.
      Praesent cursus tellus vel sodales ornare. Nunc quis orci at libero molestie vestibulum vel
      vitae velit.
      <br />
      <br />
      Curabitur scelerisque ex at metus convallis auctor. Praesent eu dolor commodo, aliquet tellus
      quis, lobortis elit. Maecenas sed libero congue, consequat nibh sit amet, ultricies sapien.
      Phasellus ac urna semper, scelerisque metus id, vestibulum arcu. Interdum et malesuada fames
      ac ante ipsum primis in faucibus.
      <br />
      <br />
      Cras nec turpis non est vehicula maximus et eu enim. Aliquam ut metus sagittis, tincidunt nunc
      vel, convallis magna. Suspendisse eu porta sapien. Curabitur enim turpis, facilisis nec felis
      id, elementum convallis lorem.
      <br />
      <br />
      Maecenas vitae nisl quis elit molestie efficitur. Nullam vitae mauris faucibus elit aliquet
      elementum vitae id velit. Pellentesque cursus ligula justo, ac tincidunt turpis condimentum
      ac. Maecenas ullamcorper maximus erat, quis tempor nibh cursus id. In scelerisque hendrerit
      varius. Nullam bibendum arcu ac quam egestas, eget luctus magna maximus. Nunc quis consectetur
      lectus, a volutpat dolor. Integer quis sapien quis tortor mattis ullamcorper.
      <br />
      <br />
      Proin nunc ante, dictum ut lacinia non, facilisis a quam. In dictum tincidunt felis eget
      iaculis. Mauris maximus, enim in efficitur bibendum, lectus arcu sodales ex, sed tincidunt
      enim orci vel neque. Quisque eu felis pulvinar, ultrices urna in, lacinia eros. Pellentesque
      convallis neque ac molestie suscipit. Nam gravida pretium mollis. Nam non urna vehicula,
      elementum tellus nec, lacinia felis. Maecenas a egestas massa.
      <br />
      <br />
      Proin ut mauris dui. Cras dolor dolor, accumsan sit amet neque vel, elementum fermentum elit.
      Sed interdum diam nunc, eu facilisis arcu convallis ac. Integer aliquet porttitor ante, id
      hendrerit massa placerat a. Ut tempor sit amet nisl id commodo. Proin eu dapibus augue.
      Suspendisse ut mattis tortor, nec vulputate urna.
      <br />
      <br />
      Nam suscipit diam vitae molestie euismod. Proin id sagittis nisi, at lacinia purus.
      Pellentesque venenatis fermentum nunc a aliquet. Nullam molestie varius gravida. Nunc at
      maximus lorem, sit amet venenatis ante. Praesent leo purus, aliquam in libero et, feugiat
      fermentum leo. Proin dapibus mi turpis, non hendrerit eros sagittis at.
    </Dialog>
  ));
