/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, select } from '@storybook/addon-knobs';
import styled from 'styled-components';
import withReadme from 'storybook-readme/with-readme';

import TextArea from './TextArea';
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

storiesOf('TextArea', module)
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
      <TextArea label="Default" id="default" placeholder="default" />
      <TextArea
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
      <TextArea label="Default" id="default" {...modifiers} defaultValue="default" />
      <TextArea label="Success" id="success" {...modifiers} success defaultValue="success" />
      <TextArea label="Error" id="error" {...modifiers} error defaultValue="error" />
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
