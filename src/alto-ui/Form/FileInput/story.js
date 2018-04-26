/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import FileInput from './FileInput';

const buttonProps = [
  'outline',
  'flat',
  'danger',
  'success',
  'white',
  'large',
  'small',
  'nowrap',
  'block',
  'disabled',
];

const getButtonProps = (...modifiersExcluded) =>
  buttonProps
    .filter(name => !modifiersExcluded.includes(name))
    .map(name => ({
      name,
      value: boolean(name, false),
    }))
    .filter(({ value }) => value)
    .reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {});

storiesOf('Form/FileInput', module)
  .addDecorator(centered)
  .addWithJSX('playground', () => (
    <FileInput
      id="file-input"
      label={text('label', 'Choose a file')}
      onChange={() => {}}
      noFilename={boolean('noFilename', false)}
      filename={text('filename', 'my-awesome-table.xls')}
      accept={text('accept', 'image/x-png,image/jpeg')}
      {...getButtonProps()}
    />
  ));
