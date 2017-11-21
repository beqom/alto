/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import styled from 'styled-components';

import Button from './Button';
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

const modifierNames = [
  'outline',
  'flat',
  'large',
  'small',
  'active',
  'block',
  'disabled',
];

const getModifiers = (...modifiersExcluded) =>
  modifierNames
    .filter(name => !modifiersExcluded.includes(name))
    .map(name => ({
      name,
      value: boolean(name, false),
    }))
    .filter(({ value }) => value)
    .reduce((acc, { name, value }) => Object.assign({}, acc, { [name]: value }), {});

storiesOf('Button', module)
  .addDecorator(withReadme(README))
  .addWithJSX('overview', () => {
    const modifiers = getModifiers();

    return (
      <SimpleWrapper>
        <Button>default</Button>
        <Button {...modifiers}>{text('children', 'customizable')}</Button>
      </SimpleWrapper>
    );
  })
  .addWithJSX('styles', () => {
    const modifiers = getModifiers('outline', 'flat');

    return (
      <SimpleWrapper>
        <Button {...modifiers}>default</Button>
        <Button {...modifiers} outline>outline</Button>
        <Button {...modifiers} flat>flat</Button>
      </SimpleWrapper>
    );
  })
  .addWithJSX('sizes', () => {
    const modifiers = getModifiers('small', 'large');

    return (
      <SimpleWrapper>
        <Button {...modifiers} small>small</Button>
        <Button {...modifiers}>default</Button>
        <Button {...modifiers} large>large</Button>
      </SimpleWrapper>
    );
  })
  .addWithJSX('states', () => {
    const modifiers = getModifiers('active', 'disabled');

    return (
      <SimpleWrapper>
        <Button {...modifiers}>default</Button>
        <Button {...modifiers} active>active</Button>
        <Button {...modifiers} disabled>disabled</Button>
      </SimpleWrapper>
    );
  });
