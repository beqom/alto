/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';
import withReadme from 'storybook-readme/with-readme';
import styled from 'styled-components';

import ArrowRightIcon from '../Icons/ArrowRight';
import ChevronDownIcon from '../Icons/ChevronDown';
import BarsIcon from '../Icons/Bars';
import ObjectsIcon from '../Icons/Objects';
import Button from './Button';
import README from './README.md';

const SimpleWrapper = styled.div`
  text-align: center;
  width: 600px;
  padding: 40px 0;
  ${p => (p.width ? `width: ${p.width}` : '')};
  > * {
    margin: 10px;
  }
  ${props =>
    props.white &&
    `
    background-color: #192328;
  `};
`;

SimpleWrapper.displayName = 'Story';

const modifierNames = [
  'outline',
  'flat',
  'danger',
  'success',
  'white',
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
  .addDecorator(centered)
  .addWithJSX('overview', () => {
    const modifiers = getModifiers();

    return (
      <SimpleWrapper white={modifiers.white}>
        <Button>default</Button>
        <Button {...modifiers}>{text('children', 'customizable')}</Button>
      </SimpleWrapper>
    );
  })
  .addWithJSX('styles', () => {
    const modifiers = getModifiers('outline', 'flat');

    return (
      <SimpleWrapper white={modifiers.white}>
        <Button {...modifiers}>default</Button>
        <Button {...modifiers} outline>
          outline
        </Button>
        <Button {...modifiers} flat>
          flat
        </Button>
      </SimpleWrapper>
    );
  })
  .addWithJSX('colors', () => {
    const modifiers = getModifiers('danger', 'success', 'white');

    return (
      <SimpleWrapper>
        <Button {...modifiers}>default</Button>
        <Button {...modifiers} success>
          success
        </Button>
        <Button {...modifiers} danger>
          danger
        </Button>
      </SimpleWrapper>
    );
  })
  .addWithJSX('white', () => {
    const modifiers = getModifiers('danger', 'success', 'white', 'flat', 'outline');

    return (
      <SimpleWrapper white>
        <Button {...modifiers} white>
          default
        </Button>
        <Button {...modifiers} white outline>
          outline
        </Button>
        <Button {...modifiers} white flat>
          flat
        </Button>
      </SimpleWrapper>
    );
  })
  .addWithJSX('sizes', () => {
    const modifiers = getModifiers('small', 'large');

    return (
      <SimpleWrapper white={modifiers.white}>
        <Button {...modifiers} small>
          small
        </Button>
        <Button {...modifiers}>default</Button>
        <Button {...modifiers} large>
          large
        </Button>
      </SimpleWrapper>
    );
  })
  .addWithJSX('states', () => {
    const modifiers = getModifiers('active', 'disabled');

    return (
      <SimpleWrapper white={modifiers.white}>
        <Button {...modifiers}>default</Button>
        <Button {...modifiers} active>
          active
        </Button>
        <Button {...modifiers} disabled>
          disabled
        </Button>
      </SimpleWrapper>
    );
  })
  .addWithJSX('with icons', () => {
    const modifiers = getModifiers();

    return (
      <SimpleWrapper white={modifiers.white}>
        <Button {...modifiers}>
          <BarsIcon left />Menu
        </Button>
        <Button {...modifiers}>
          Next<ArrowRightIcon right />
        </Button>
        <Button {...modifiers}>
          <ObjectsIcon left />Select Objects<ChevronDownIcon right size="12px" />
        </Button>
      </SimpleWrapper>
    );
  })
  .addWithJSX('link', () => {
    const modifiers = getModifiers();

    return (
      <SimpleWrapper white={modifiers.white}>
        <Button href={text('href', '#some-url')} {...modifiers}>{text('children', 'I am a <a /> tag!')}</Button>
      </SimpleWrapper>
    );
  })
