/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { array, text } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';

import Button from './Button';
import README from './README.md';

storiesOf('Button', module)
  .addDecorator(withReadme(README))
  .addWithJSX('playground', () => {
    const modifiers = array('modifiers', [], ' ').filter(s => !!s.trim());

    const modifiersProps = modifiers.join('').trim().length ? { modifiers } : {};
    return (
      <Button {...modifiersProps}>{text('children', 'My Button')}</Button>
    );
  });
