/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';
import styled from 'styled-components';

import ArrowRightIcon from '../Icons/ArrowRight';
import ChevronDownIcon from '../Icons/ChevronDown';
import BarsIcon from '../Icons/Bars';
import CloseIcon from '../Icons/Close';
import VisuallyHidden from '../VisuallyHidden';
import ObjectsIcon from '../Icons/Objects';
import Button from './Button';

const SimpleWrapper = styled.div`
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 40px 0;
  ${p => (p.width ? `width: ${p.width}` : '')};
  > * {
    margin: 0.5rem;
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
    .reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {});

storiesOf('Button', module)
  .addDecorator(centered)
  .addWithJSX('overview', () => {
    const modifiers = getModifiers();

    return (
      <SimpleWrapper white={modifiers.white}>
        <Button>Default</Button>
        <Button {...modifiers}>{text('children', 'Customizable')}</Button>
      </SimpleWrapper>
    );
  })
  .addWithJSX('styles', () => {
    const modifiers = getModifiers('outline', 'flat');

    return (
      <SimpleWrapper white={modifiers.white}>
        <Button {...modifiers}>Default</Button>
        <Button {...modifiers} outline>
          Outline
        </Button>
        <Button {...modifiers} flat>
          Flat
        </Button>
      </SimpleWrapper>
    );
  })
  .addWithJSX('colors', () => {
    const modifiers = getModifiers('danger', 'success', 'white');

    return (
      <SimpleWrapper>
        <Button {...modifiers}>Default</Button>
        <Button {...modifiers} success>
          Success
        </Button>
        <Button {...modifiers} danger>
          Danger
        </Button>
      </SimpleWrapper>
    );
  })
  .addWithJSX('white', () => {
    const modifiers = getModifiers('danger', 'success', 'white', 'flat', 'outline');

    return (
      <SimpleWrapper white>
        <Button {...modifiers} white>
          Default
        </Button>
        <Button {...modifiers} white outline>
          Outline
        </Button>
        <Button {...modifiers} white flat>
          Flat
        </Button>
      </SimpleWrapper>
    );
  })
  .addWithJSX('sizes', () => {
    const modifiers = getModifiers('small', 'large');

    return (
      <SimpleWrapper white={modifiers.white}>
        <Button {...modifiers} small>
          Small
        </Button>
        <Button {...modifiers}>Default</Button>
        <Button {...modifiers} large>
          Large
        </Button>
      </SimpleWrapper>
    );
  })
  .addWithJSX('states', () => {
    const modifiers = getModifiers('active', 'disabled');

    return (
      <SimpleWrapper white={modifiers.white}>
        <Button {...modifiers}>Default</Button>
        <Button {...modifiers} active>
          Active
        </Button>
        <Button {...modifiers} disabled>
          Disabled
        </Button>
      </SimpleWrapper>
    );
  })
  .addWithJSX('nowrap', () => {
    const modifiers = getModifiers();

    return (
      <SimpleWrapper white={modifiers.white}>
        <Button {...modifiers} nowrap>
          <BarsIcon left />
        </Button>
        <Button {...modifiers} nowrap>
          Next<ArrowRightIcon right />
        </Button>
        <Button {...modifiers} nowrap>
          <ObjectsIcon left />Select Objects<ChevronDownIcon right />
        </Button>
      </SimpleWrapper>
    );
  })

  .addWithJSX('icons', () => {
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
          <ObjectsIcon left />Select Objects<ChevronDownIcon right />
        </Button>
        <Button {...modifiers}>
          <ObjectsIcon />
        </Button>
        <Button {...modifiers}>
          <BarsIcon />
        </Button>
        <Button {...modifiers}>
          <ArrowRightIcon />
        </Button>
      </SimpleWrapper>
    );
  })
  .addWithJSX('link', () => {
    const modifiers = getModifiers();

    return (
      <SimpleWrapper white={modifiers.white}>
        <Button href={text('href', '#some-url')} {...modifiers}>
          {text('children', 'I am a <a /> tag!')}
        </Button>
      </SimpleWrapper>
    );
  });
