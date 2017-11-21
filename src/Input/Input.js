import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { getColor, getTheme, fontSize } from '../helpers/theme';

const modifier = (...ms) => val => props =>
  ms.reduce((acc, m) => acc && props[m], true) ? val : '';

export const resetInput = css`
  font: inherit;
  background: transparent;
  border: 0;
  outline: 0;
`;

const InputElement = styled.input`
  ${resetInput};

  background: white;
  color: ${getColor('text')};
  border-radius: ${getTheme('borderRadius')};
  border: 1px solid ${getColor('coolGrey.20')};
  font-weight: 400;
  line-height: 2.6;
  font-size: 1rem;
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
  `)} ${modifier('error')(css`
      border-color: ${getColor('error')};
      :focus {
        border-color: ${getColor('error')};
        box-shadow: 0 0 0 3px ${getColor('error.20')};
      }
    `)} ${modifier('large')(css`
      font-size: 1.15rem;
      padding: 0 20px;
    `)} ${modifier('small')(css`
      font-size: 0.85rem;
      line-height: 2.2;
    `)} :disabled {
    cursor: not-allowed;
    color: ${getColor('coolGrey.40')};
    background: ${getColor('coolGrey.10')};
    border-color: ${getColor('coolGrey.20')};
    box-shadow: none;
  }
`;

InputElement.displayName = 'Input';

InputElement.defaultProps = {
  type: 'text',
};

const InputHelpText = styled.div`
  ${fontSize('small')};
  text-align: left;
  font-weight: 600;
  padding: 10px 0;
  color: ${getColor('coolGrey.50')};

  ${modifier('success')(css`
    color: ${getColor('success')};
  `)} ${modifier('error')(css`
      color: ${getColor('error')};
    `)} ${modifier('disabled')(css`
      color: ${getColor('coolGrey.20')};
    `)};
`;

const InputLabel = styled.label`
  ${fontSize('small')};
  font-weight: 700;
  color: ${getColor('coolGrey.50')};
  text-align: left;
  padding-bottom: 10px;
  display: block;
`;

const Input = props => {
  const { error, disabled, success, id } = props;
  return (
    <div>
      <InputLabel htmlFor={id} id={`${id}__label`} {...{ error, disabled, success }}>
        {props.label}
      </InputLabel>
      <InputElement {...props} />
      <InputHelpText id={`${id}__help-text`} {...{ error, disabled, success }}>
        {props.helpText}
      </InputHelpText>
    </div>
  );
};

Input.propTypes = {
  helpText: PropTypes.string,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  success: PropTypes.bool,
};

export default Input;
