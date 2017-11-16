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
        <Input placeholder="default" />
        <Input
          {...modifiers}
          {...typeProps}
          placeholder={text('placeholder', 'customisable')}
          helpText={text('helpText', 'Help text')}
        />
      </SimpleWrapper>
    );
  })
  .addWithJSX('colors', () => {
    const modifiers = getModifiers('success', 'error');

    return (
      <SimpleWrapper>
        <Input {...modifiers} defaultValue="default" />
        <Input {...modifiers} success defaultValue="success" />
        <Input {...modifiers} error defaultValue="error" />
      </SimpleWrapper>
    );
  })
  .addWithJSX('sizes', () => {
    const modifiers = getModifiers('small', 'large');

    return (
      <SimpleWrapper>
        <Input {...modifiers} small defaultValue="small" />
        <Input {...modifiers} defaultValue="default" />
        <Input {...modifiers} large defaultValue="large" />
      </SimpleWrapper>
    );
  })
  .addWithJSX('states', () => {
    const modifiers = getModifiers('disabled');

    return (
      <SimpleWrapper>
        <Input {...modifiers} defaultValue="default" />
        <Input {...modifiers} disabled defaultValue="disabled" />
      </SimpleWrapper>
    );
  });
