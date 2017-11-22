import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { getColor, getTheme, fontSize } from '../../helpers/theme';
import FormElement from '../FormElement';

const modifier = (...ms) => val => props =>
  ms.reduce((acc, m) => acc && props[m], true) ? val : '';

export const resetInput = css`
  font: inherit;
  background: transparent;
  border: 0;
  outline: 0;
`;

export const TextFieldTag = styled.input`
  ${resetInput};
  ${fontSize('medium')};
  background: white;
  color: ${getColor('text')};
  border-radius: ${getTheme('borderRadius')};
  border: 1px solid ${getColor('coolGrey.20')};
  font-weight: 400;
  line-height: 2.375;
  padding: 0 10px;
  display: block;
  width: 100%;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  transition: box-shadow ${getTheme('transition')}, border-color ${getTheme('transition')};

  ::placeholder {
    color: ${getColor('coolGrey.20')};
  }

  :hover {
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.1);
  }

  :focus {
    border-color: ${getColor('primary')};
    box-shadow: 0 0 0 3px ${getColor('primary.20')};
  }

  ${modifier('success')(css`
    border-color: ${getColor('success')};
    :focus {
      border-color: ${getColor('success')};
      box-shadow: 0 0 0 3px ${getColor('success.20')};
    }
  `)};
  ${modifier('error')(css`
    border-color: ${getColor('error')};
    :focus {
      border-color: ${getColor('error')};
      box-shadow: 0 0 0 3px ${getColor('error.20')};
    }
  `)};
  ${modifier('large')(css`
    ${fontSize('large')};
    padding: 0 20px;
    line-height: 2.67;
  `)};
  ${modifier('small')(css`
    ${fontSize('small')};
    line-height: 2;
  `)};
  :disabled {
    cursor: not-allowed;
    color: ${getColor('coolGrey.40')};
    background: ${getColor('coolGrey.10')};
    border-color: ${getColor('coolGrey.20')};
    box-shadow: none;
  }
`;

TextFieldTag.displayName = 'Input';

TextFieldTag.defaultProps = {
  type: 'text',
};

TextFieldTag.PropTypes = {
  type: PropTypes.string,
};

const TextField = props => (
  <FormElement {...props}>
    <TextFieldTag {...props} />
  </FormElement>
);

TextField.displayName = 'TextField';

export default TextField;
