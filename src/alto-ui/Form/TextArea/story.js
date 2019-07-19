/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import styled from 'styled-components';
import centered from '@storybook/addon-centered/react';

import TextArea from './TextArea';

const SimpleWrapper = styled.div`
  text-align: center;
  width: 600px;
  ${p => (p.width ? `width: ${p.width}` : '')};

  > * {
    margin: 10px;
  }
`;

SimpleWrapper.displayName = 'Story';

const modifierNames = ['success', 'error', 'large', 'small', 'disabled', 'ghost', 'readOnly'];

const getModifiers = (...modifiersExcluded) =>
  modifierNames
    .filter(name => !modifiersExcluded.includes(name))
    .map(name => ({
      name,
      value: boolean(name, false),
    }))
    .filter(({ value }) => value)
    .reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {});

storiesOf('Form/TextArea', module)
  .addDecorator(centered)
  .addWithJSX('overview', () => {
    const modifiers = getModifiers();

    return (
      <SimpleWrapper>
        <TextArea label="Default" id="default" placeholder="default" />
        <TextArea
          {...modifiers}
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
        <TextArea
          label="Default"
          id="default"
          {...modifiers}
          defaultValue="default"
          helpText="Default text"
        />
        <TextArea
          label="Success"
          id="success"
          {...modifiers}
          success
          defaultValue="success"
          helpText="Success, you did it right"
        />
        <TextArea
          label="Error"
          id="error"
          {...modifiers}
          error
          defaultValue="error"
          helpText="Oops, something is wrong"
        />
      </SimpleWrapper>
    );
  })
  .addWithJSX('sizes', () => {
    const modifiers = getModifiers('small', 'large');

    return (
      <SimpleWrapper>
        <TextArea label="Small" id="small" {...modifiers} small defaultValue="small" />
        <TextArea label="Default" id="default" {...modifiers} defaultValue="default" />
        <TextArea label="Large" id="large" {...modifiers} large defaultValue="large" />
      </SimpleWrapper>
    );
  })
  .addWithJSX('states', () => {
    const modifiers = getModifiers('disabled');

    return (
      <SimpleWrapper>
        <TextArea label="Default" id="default" {...modifiers} defaultValue="default" />
        <TextArea label="Disabled" id="disabled" {...modifiers} disabled defaultValue="disabled" />
      </SimpleWrapper>
    );
  });
