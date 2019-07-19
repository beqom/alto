/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, object } from '@storybook/addon-knobs';
import styled from 'styled-components';
import centered from '@storybook/addon-centered/react';

import Select from './Select';
import StateProvider from '../../StateProvider';

const SimpleWrapper = styled.div`
  text-align: center;
  width: 400px;
  ${p => (p.width ? `width: ${p.width}` : '')};

  > * {
    margin: 10px;
  }
`;

SimpleWrapper.displayName = 'Story';

const modifierNames = [
  'success',
  'error',
  'large',
  'small',
  'disabled',
  'native',
  'readOnly',
  'autocomplete',
];

const getModifiers = (...modifiersExcluded) =>
  modifierNames
    .filter(name => !modifiersExcluded.includes(name))
    .map(name => ({
      name,
      value: boolean(name, name === 'autocomplete'),
    }))
    .reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {});

const getOptions = ({ autocomplete }) =>
  autocomplete
    ? [
        'First',
        'Second',
        'Third',
        'Fourth: The very very long long extra giga mega long text, isnt it ?',
      ]
    : [
        {
          title: 'HEADING ONE',
          value: [
            'First',
            'Second',
            'Third',
            'Fourth: The very very long long extra giga mega long text, isnt it ?',
          ],
        },
        {
          title: 'HEADING TWO',
          value: [{ title: 'First', value: 'first_two' }],
        },
      ];

storiesOf('Form/Select', module)
  .addDecorator(centered)
  .addWithJSX('overview', () => {
    const modifiers = getModifiers();
    const options = getOptions(modifiers);

    return (
      <SimpleWrapper>
        <Select label="Default" id="default" options={options} placeholder="default" />
        <Select
          {...modifiers}
          label="Customizable"
          id="customizable"
          helpText={text('helpText', 'Help text')}
          options={object('options', options)}
          placeholder={text('placeholder', 'customizable')}
        />
      </SimpleWrapper>
    );
  })
  .addWithJSX('colors', () => {
    const modifiers = getModifiers('success', 'error');
    const options = getOptions(modifiers);

    return (
      <SimpleWrapper>
        <Select
          label="Default"
          id="default"
          options={options}
          {...modifiers}
          placeholder="default"
          helpText="Default text"
        />
        <Select
          label="Success"
          id="success"
          options={options}
          {...modifiers}
          success
          placeholder="success"
          helpText="Success, you did it right"
        />
        <Select
          label="Error"
          id="error"
          options={options}
          {...modifiers}
          error
          placeholder="error"
          helpText="Oops, something is wrong"
        />
      </SimpleWrapper>
    );
  })
  .addWithJSX('sizes', () => {
    const modifiers = getModifiers('small', 'large');
    const options = getOptions(modifiers);

    return (
      <SimpleWrapper>
        <Select
          label="Small"
          id="small"
          options={options}
          {...modifiers}
          small
          placeholder="small"
        />
        <Select
          label="Default"
          id="default"
          options={options}
          {...modifiers}
          placeholder="default"
        />
        <Select
          label="Large"
          id="large"
          options={options}
          {...modifiers}
          large
          placeholder="large"
        />
      </SimpleWrapper>
    );
  })
  .addWithJSX('states', () => {
    const modifiers = getModifiers('disabled');
    const options = getOptions(modifiers);

    return (
      <SimpleWrapper>
        <Select
          label="Default"
          id="default"
          options={options}
          {...modifiers}
          placeholder="default"
        />
        <Select
          label="Disabled"
          id="disabled"
          options={options}
          {...modifiers}
          disabled
          placeholder="disabled"
        />
      </SimpleWrapper>
    );
  })
  .addWithJSX('multiple', () => {
    const modifiers = getModifiers('disabled');
    const options = getOptions(modifiers);

    return (
      <StateProvider state={{ value: ['First', 'Second'] }}>
        {(state, setState) => (
          <SimpleWrapper>
            <Select
              label="Default"
              id="multiple"
              options={options}
              {...modifiers}
              placeholder="default"
              value={state.value}
              onChange={modifiers.native ? () => undefined : value => setState({ value })}
              multiple
            />
          </SimpleWrapper>
        )}
      </StateProvider>
    );
  })
  .addWithJSX('clearable', () => {
    const modifiers = getModifiers('disabled');
    const options = getOptions(modifiers);

    return (
      <StateProvider state={{ value: 'First' }}>
        {(state, setState) => (
          <SimpleWrapper>
            <Select
              label="Can be clear"
              id="clearable"
              options={options}
              {...modifiers}
              placeholder="default"
              value={state.value}
              onChange={modifiers.native ? () => undefined : value => setState({ value })}
              clearable
            />
          </SimpleWrapper>
        )}
      </StateProvider>
    );
  });
