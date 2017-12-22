import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import isArray from 'lodash.isarray';

import { getColor, getTheme, fontSize } from '../../helpers/theme';
import FormElement from '../FormElement';

const modifier = (...ms) => val => props =>
  ms.reduce((acc, m) => acc && props[m], true) ? val : '';

const SelectTag = styled.select`
  ${fontSize('medium')};
  outline: 0;
  background: white;
  color: ${getColor('text')};
  border-radius: ${getTheme('borderRadius')};
  border: 1px solid ${getColor('coolGrey.20')};
  font-weight: 400;
  height: 2.375em;
  display: block;
  width: 100%;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  transition: box-shadow ${getTheme('transition')}, border-color ${getTheme('transition')};

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

SelectTag.displayName = 'SelectTagSelect';

const renderOptions = options => options.reduce((acc, option) => {
  if (option) {
    if (option.value) {
      if (isArray(option.value)) {
        return acc.concat([
          <optgroup label={option.title} key={option.title}>
            {renderOptions(option.value)}
          </optgroup>,
        ]);
      }
      return acc.concat([
        <option key={option.value} value={option.value}>{option.title}</option>,
      ]);
    }
    return acc.concat([
      <option key={option} value={option}>{option}</option>,
    ]);
  }
  return acc;
}, []);

const Select = props => (
  <FormElement {...props}>
    <SelectTag {...props}>
      {props.children || renderOptions(props.options)}
    </SelectTag>
  </FormElement>
);

Select.displayName = 'Select';

Select.defaultProps = {
  options: [],
  children: null,
};

Select.propTypes = {
  children: PropTypes.any,
  options: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      title: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
      ]),
    }),
  ])),
};

export default Select;
