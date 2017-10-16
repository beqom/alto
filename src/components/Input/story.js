/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, array, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';

import Input from './Input';
import README from './README.md';

storiesOf('Input', module)
  .addDecorator(withReadme(README))
  .addWithJSX('playground', () => {
    const modifiers = array('modifiers', [], ' ').filter(s => !!s.trim());

    const modifiersProps = modifiers.join('').trim().length ? { modifiers } : {};
    const defaultType = 'default (text)';
    const type = select('type', [
      defaultType,
      'email',
      'number',
      'password',
      'tel',
      'search',
      'url',
    ], defaultType);

    const typeProps = type === defaultType ? {} : { type };

    return (
      <Input
        {...modifiersProps}
        {...typeProps}
        placeholder={text('placeholder', 'Your text here...')}
        defaultValue={text('value', '')}
      />
    );
  });
