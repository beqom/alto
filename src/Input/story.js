/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, select } from '@storybook/addon-knobs';
import styled from 'styled-components';
import withReadme from 'storybook-readme/with-readme';

import Input from './Input';
import README from './README.md';

const SimpleWrapper = styled.div`
  text-align: center;
  width: 600px;
  ${p => (p.width ? `width: ${p.width}` : '')};

  > * {
    margin: 10px;
  }
`;

SimpleWrapper.displayName = 'Story';

const modifierNames = ['success', 'error', 'large', 'small', 'disabled'];

const getModifiers = (...modifiersExcluded) =>
  modifierNames
    .filter(name => !modifiersExcluded.includes(name))
    .map(name => ({
      name,
      value: boolean(name, false),
    }))
    .filter(({ value }) => value)
    .reduce((acc, { name, value }) => Object.assign({}, acc, { [name]: value }), {});

storiesOf('Input', module)
  .addDecorator(withReadme(README))
  .addWithJSX('overview', () => {
    const modifiers = getModifiers();

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
      <SimpleWrapper>
        <Input label="Default" id="default" placeholder="default" />
        <Input
          {...modifiers}
          {...typeProps}
          label="Customizable"
          id="customizable"
          placeholder={text('placeholder', 'Type something here...')}
          helpText={text('helpText', 'Help text')}
        />
      </SimpleWrapper>
    );
  })
  .addWithJSX('colors', () => {
    const modifiers = getModifiers('success', 'error');

    return (
      <SimpleWrapper>
        <Input label="Default" id="default" {...modifiers} defaultValue="default" />
        <Input label="Success" id="success" {...modifiers} success defaultValue="success" />
        <Input label="Error" id="error" {...modifiers} error defaultValue="error" />
      </SimpleWrapper>
    );
  })
  .addWithJSX('sizes', () => {
    const modifiers = getModifiers('small', 'large');

    return (
      <SimpleWrapper>
        <Input label="Small" id="small" {...modifiers} small defaultValue="small" />
        <Input label="Default" id="default" {...modifiers} defaultValue="default" />
        <Input label="Large" id="large" {...modifiers} large defaultValue="large" />
      </SimpleWrapper>
    );
  })
  .addWithJSX('states', () => {
    const modifiers = getModifiers('disabled');

    return (
      <SimpleWrapper>
        <Input label="Default" id="default" {...modifiers} defaultValue="default" />
        <Input label="Disabled" id="disabled" {...modifiers} disabled defaultValue="disabled" />
      </SimpleWrapper>
    );
  });
