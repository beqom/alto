import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { getColor, getTheme, fontSize } from '../helpers/theme';

const modifier = (...ms) => val => props =>
  ms.reduce((acc, m) => acc && props[m], true) ? val : '';

const colorFocus = props => {
  if (props.success) return getColor('success.20')(props);
  if (props.error) return getColor('error.20')(props);
  if (props.inverse) return getColor('inverse.40')(props);
  return getColor('primary.20')(props);
};

export const resetButton = css`
  font: inherit;
  background: transparent;
  border: 0;
  outline: 0;
  border-radius: 0;
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
    background: ${getColor('coolGrey.30')};
    border-color: ${getColor('coolGrey.30')};
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
    color: ${getColor('coolGrey.50')};
    border-color: ${getColor('coolGrey.50')};
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
    color: ${getColor('coolGrey.50')};
  }
`;

const Button = styled.button`
  ${resetButton};
  ${fontSize('medium')};
  border-radius: ${getTheme('borderRadius')};
  cursor: pointer;
  border: 1px solid transparent;
  font-weight: 400;
  line-height: 2.375;
  padding: 0 1em;
  text-align: center;
  vertical-align: middle;
  display: inline-block;
  transition:
    background ${getTheme('transition')},
    box-shadow ${getTheme('transition')},
    border-color ${getTheme('transition')};

  :focus {
    box-shadow: 0 0 0 3px ${colorFocus};
  }

  :disabled {
    cursor: not-allowed;
  }

  ${solidButton('primary', 'primary.80')};
  ${modifier('success')(solidButton('success', 'success.80'))};
  ${modifier('error')(solidButton('error', 'error.80'))};
  ${modifier('inverse')(solidButton('inverse', 'inverse.80', 'text'))};

  ${modifier('outline')(outlineButton('primary', 'primary.10'))};
  ${modifier('outline', 'success')(outlineButton('success', 'success.10'))};
  ${modifier('outline', 'error')(outlineButton('error', 'error.10'))};
  ${modifier('outline', 'inverse')(outlineButton('inverse', 'inverse.10'))};

  ${modifier('flat')(flatButton('primary', 'primary.80'))};
  ${modifier('flat', 'success')(flatButton('success', 'success.80'))};
  ${modifier('flat', 'error')(flatButton('error', 'error.80'))};
  ${modifier('flat', 'inverse')(flatButton('inverse', 'inverse.80'))};

  ${modifier('large')(css`
    ${fontSize('large')};
    line-height: 2.67;
    padding: 0 3em;
  `)};

  ${modifier('small')(css`
    ${fontSize('small')};
    line-height: 2;
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
