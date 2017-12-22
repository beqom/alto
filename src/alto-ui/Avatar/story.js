/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import centered from '@storybook/addon-centered';


import Avatar from './Avatar';
import README from './README.md';

storiesOf('Avatar', module)
  .addDecorator(withReadme(README))
  .addDecorator(centered)
  .addWithJSX('overview', () => (
    <Avatar src={text('src', 'http://i.pravatar.cc/150')} />
    ))
  .addWithJSX('image 404', () => (
    <Avatar src={text('src', 'foo')} />
  ))
  .addWithJSX('sizes', () => {
    const src = boolean('image 404', false) ? 'foo' : 'http://i.pravatar.cc/150';
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar src={src} big /><br />
        <Avatar src={src} large /><br />
        <Avatar src={src} /><br />
        <Avatar src={src} small />
      </div>
    );
  });
