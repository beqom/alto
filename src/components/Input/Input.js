import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import get from 'lodash/fp/get';

const getTheme = (...path) => get(['theme', ...path]);
const getColor = color => props => getTheme('colors', color)(props) || color;

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
  border: 1px solid ${getColor('greyUltraLight')};
  font-weight: 400;
  line-height: 2.6;
  font-size: 1rem;
  padding: 0 10px;
  display: block;
  width: 100%;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  transition: box-shadow 0.2s ease-in-out,
    border-color 0.2s ease-in-out;

  ::placeholder {
    color: ${getColor('greyLight')};
  }

  :hover {
    box-shadow: 0 2px 1px rgba(0, 0, 0, .1);
  }

  :focus {
    border-color: ${getColor('primary')};
    box-shadow: 0 0 0 3px ${getColor('primaryLight')};
  }

  ${modifier('success')(css`
    border-color: ${getColor('success')};
    :focus {
      border-color: ${getColor('success')};
      box-shadow: 0 0 0 3px ${getColor('successLight')};
    }
  `)}

  ${modifier('error')(css`
    border-color: ${getColor('error')};
    :focus {
      border-color: ${getColor('error')};
      box-shadow: 0 0 0 3px ${getColor('errorLight')};
    }
  `)}

  ${modifier('large')(css`
    font-size: 1.15rem;
    padding: 0 20px;
  `)}

  ${modifier('small')(css`
    font-size: .85rem;
    line-height: 2.2;
  `)}

  :disabled{
    cursor: not-allowed;
    background: ${getColor('greyUltraLight')};
    border-color: ${getColor('greyLight')};
    color: ${getColor('secondary')};
    box-shadow: none;
  }
`;

InputElement.displayName = 'Input';

InputElement.defaultProps = {
  type: 'text',
};

const InputHelpText = styled.div`
  text-align: left;
  font-size: .8rem;
  font-weight: 600;
  padding: 10px 0;
  color: ${getColor('secondary')};

  ${modifier('success')(css`
    color: ${getColor('success')};
  `)}

  ${modifier('error')(css`
    color: ${getColor('error')};
  `)}

  ${modifier('disabled')(css`
    color: ${getColor('greyLight')};
  `)}
`;

const Input = props => (
  <div>
    <InputElement {...props} />
    <InputHelpText {...props}>{props.helpText}</InputHelpText>
  </div>
)

Input.propTypes = {
  helpText: PropTypes.string,
};

export default Input;
