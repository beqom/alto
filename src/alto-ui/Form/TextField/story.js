/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, select } from '@storybook/addon-knobs';
import styled from 'styled-components';
import centered from '@storybook/addon-centered';

import FilterIcon from '../../Icons/Filter';
import TextField from './TextField';

const SimpleWrapper = styled.div`
  text-align: center;
  width: 600px;
  ${p => (p.width ? `width: ${p.width}` : '')};

  > * {
    margin: 10px;
  }
`;

SimpleWrapper.displayName = 'Story';

const modifierNames = ['success', 'error', 'large', 'small', 'area', 'disabled', 'readOnly'];

const getModifiers = (...modifiersExcluded) =>
  modifierNames
    .filter(name => !modifiersExcluded.includes(name))
    .map(name => ({
      name,
      value: boolean(name, false),
    }))
    .filter(({ value }) => value)
    .reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {});

storiesOf('Form/TextField', module)
  .addDecorator(centered)
  .addWithJSX('overview', () => {
    const modifiers = getModifiers();

    const defaultType = 'default (text)';
    const type = select(
      'type',
      [defaultType, 'email', 'number', 'password', 'tel', 'search', 'url'],
      defaultType
    );

    const typeProps = type === defaultType ? {} : { type };

    return (
      <SimpleWrapper>
        <TextField label="Default" id="default" placeholder="default" />
        <TextField
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
        <TextField
          label="Default"
          id="default"
          {...modifiers}
          defaultValue="default"
          helpText="Default text"
        />
        <TextField
          label="Success"
          id="success"
          {...modifiers}
          success
          defaultValue="success"
          helpText="Success, you did it right"
        />
        <TextField
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
        <TextField label="Small" id="small" {...modifiers} small defaultValue="small" />
        <TextField label="Default" id="default" {...modifiers} defaultValue="default" />
        <TextField label="Large" id="large" {...modifiers} large defaultValue="large" />
      </SimpleWrapper>
    );
  })
  .addWithJSX('states', () => {
    const modifiers = getModifiers('disabled');

    return (
      <SimpleWrapper>
        <TextField label="Default" id="default" {...modifiers} defaultValue="default" />
        <TextField label="Disabled" id="disabled" {...modifiers} disabled defaultValue="disabled" />
      </SimpleWrapper>
    );
  })
  .add('Clearable', () =>
    React.createElement(() => {
      const [value, setValue] = useState('');

      return (
        <div style={{ width: 300 }}>
          <TextField
            label="Clearable"
            id="celarable"
            value={value}
            onChange={e => setValue(e.target.value)}
            clearable
          />
        </div>
      );
    })
  )
  .add('Children function', () =>
    React.createElement(() => {
      const [value, setValue] = useState('');
      const emoji = ['😀', '😂', '😛', '😎', '👻'][Math.round(Math.random() * 4)];

      return (
        <div style={{ width: 300 }}>
          <TextField
            label="Children function"
            id="children"
            value={value}
            onChange={e => setValue(e.target.value)}
          >
            {(input, isFocused) => (
              <>
                <FilterIcon outline={!value} active={isFocused} />
                {input}
                {!!value && <button onClick={() => setValue(value + emoji)}>{emoji}</button>}
              </>
            )}
          </TextField>
        </div>
      );
    })
  );
