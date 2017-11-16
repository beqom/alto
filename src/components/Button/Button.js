import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import get from 'lodash/fp/get';

const getTheme = (...path) => get(['theme', ...path]);
const getColor = color => props => getTheme('colors', color)(props) || color;

const modifier = (...ms) => val => props =>
  ms.reduce((acc, m) => acc && props[m], true) ? val : '';

const colorFocus = props => {
  if (props.secondary) return getColor('primaryLight')(props);
  return getColor('primaryLight')(props);
};

export const resetButton = css`
  font: inherit;
  background: transparent;
  border: 0;
  outline: 0;
`;

export const solidButton = (colorDefault, colorHover, colorFont = 'white') => css`
  background: ${getColor(colorDefault)};
  color: ${getColor(colorFont)};
  border-color: ${getColor(colorDefault)};

  :hover {
    background: ${getColor(colorHover)};
    border-color: ${getColor(colorHover)};
  }

  :active {
    background: ${getColor(colorDefault)};
    border-color: ${getColor(colorDefault)};
    box-shadow: 0 0 0 3px ${colorFocus}, inset 0 2px 0 ${getColor(colorHover)};
  }

  :disabled {
    background: ${getColor('greyLight')};
    border-color: ${getColor('greyLight')};
  }

  ${modifier('active')(css`
    background: ${getColor(colorHover)};
    border-color: ${getColor(colorHover)};
  `)};
`;

export const outlineButton = (colorDefault, colorHover) => css`
  background: transparent;
  color: ${getColor(colorDefault)};
  border-color: ${getColor(colorDefault)};

  :hover {
    background: ${getColor(colorHover)};
    border-color: ${getColor(colorDefault)};
  }

  :active {
    background: transparent;
    box-shadow: 0 0 0 3px ${colorFocus}, inset 0 2px 0 ${getColor(colorDefault)};
  }

  :disabled {
    background: transparent;
    color: ${getColor('greyLight')};
    border-color: ${getColor('greyLight')};
  }

  ${modifier('active')(css`
    background: ${getColor(colorHover)};
  `)};
`;

export const flatButton = (colorDefault, colorHover) => css`
  color: ${getColor(colorDefault)};

  &,
  :hover,
  :active,
  :disabled {
    background: transparent;
    border-color: transparent;
  }

  :hover {
    color: ${getColor(colorHover)};
  }

  ${modifier('active')(css`
    background: transparent;
    border-color: transparent;
    color: ${getColor(colorHover)};
  `)};

  :active {
    color: ${getColor(colorDefault)};
    box-shadow: 0 0 0 3px ${colorFocus};
  }

  :disabled {
    color: ${getColor('greyLight')};
  }
`;

const Button = styled.button`
  ${resetButton}

  border-radius: ${getTheme('borderRadius')};
  cursor: pointer;
  border: 1px solid transparent;
  font-weight: 600;
  line-height: 2.6;
  font-size: 1rem;
  padding: 0 2em;
  text-align: center;
  display: inline-block;

  :focus {
    box-shadow: 0 0 0 3px ${colorFocus};
  }

  :disabled {
    cursor: not-allowed;
  }

  ${solidButton('primary', 'primaryDark')};

  ${modifier('outline')(outlineButton('primary', 'primaryUltraLight'))};

  ${modifier('flat')(flatButton('primary', 'primaryDark'))};

  ${modifier('large')(css`
    font-size: 1.15rem;
    line-height: 2.6;
    padding: 0 3em;
  `)};

  ${modifier('small')(css`
    font-size: .85rem;
    line-height: 2.2;
    padding: 0 1.5em;
  `)};

  ${modifier('block')(css`
    display: block;
    width: 100%;
  `)};
`;

Button.displayName = 'Button';

Button.defaultProps = {};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  modifiers: PropTypes.array,
};

export default Button;
