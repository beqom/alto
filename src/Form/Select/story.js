/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, object } from '@storybook/addon-knobs';
import styled from 'styled-components';
import withReadme from 'storybook-readme/with-readme';

import Select from './Select';
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

const options = [
  {
    title: 'HEADING ONE',
    value: ['First', 'Second', 'Third'],
  },
  {
    title: 'HEADING TWO',
    value: [{ title: 'First', value: 'first_two' }],
  },
];

storiesOf('Form/Select', module)
  .addDecorator(withReadme(README))
  .addWithJSX('overview', () => {
    const modifiers = getModifiers();

    return (
      <SimpleWrapper>
        <Select label="Default" id="default" options={options} placeholder="default" />
        <Select
          {...modifiers}
          label="Customizable"
          id="customizable"
          helpText={text('helpText', 'Help text')}
          options={object('options', options)}
        />
      </SimpleWrapper>
    );
  })
  .addWithJSX('colors', () => {
    const modifiers = getModifiers('success', 'error');

    return (
      <SimpleWrapper>
        <Select
          label="Default"
          id="default"
          options={options}
          {...modifiers}
          defaultValue="default"
          helpText="Default text"
        />
        <Select
          label="Success"
          id="success"
          options={options}
          {...modifiers}
          success
          defaultValue="success"
          helpText="Success, you did it right"
        />
        <Select
          label="Error"
          id="error"
          options={options}
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
        <Select
          label="Small"
          id="small"
          options={options}
          {...modifiers}
          small
          defaultValue="small"
        />
        <Select
          label="Default"
          id="default"
          options={options}
          {...modifiers}
          defaultValue="default"
        />
        <Select
          label="Large"
          id="large"
          options={options}
          {...modifiers}
          large
          defaultValue="large"
        />
      </SimpleWrapper>
    );
  })
  .addWithJSX('states', () => {
    const modifiers = getModifiers('disabled');

    return (
      <SimpleWrapper>
        <Select
          label="Default"
          id="default"
          options={options}
          {...modifiers}
          defaultValue="default"
        />
        <Select
          label="Disabled"
          id="disabled"
          options={options}
          {...modifiers}
          disabled
          defaultValue="disabled"
        />
      </SimpleWrapper>
    );
  });
