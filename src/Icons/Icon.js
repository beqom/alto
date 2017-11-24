import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { getColor, fontSize } from '../helpers/theme';

const getColorFromProps = prop => props => getColor(props[prop])(props);

const modifier = (...ms) => val => props =>
  ms.reduce((acc, m) => acc && props[m], true) ? val : '';

const IconContainer = styled.i`
  display: inline-flex;
  align-self: center;
  position: relative;
  height: ${({ size }) => size};
  width: ${({ size }) => size};
  font-size: ${({ size }) => size};

  ${props => props.baseline && css`
    svg {
      bottom: -0.125em;
      position: absolute;
    }
  `}
`;

IconContainer.displayName = 'IconContainer';

const Icon = props => (
  <IconContainer {...props}>
    <svg
      version="1.1"
      viewBox={props.viewBox}
      width="1em"
      height="1em"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
    >
      {props.children({
        fill: props.color,
      })}
    </svg>
  </IconContainer>
)

Icon.defaultProps = {
  size: '1em',
  viewBox: '0 0 36 36',
  outline: false,
  color: 'currentColor',
};

Icon.propTypes = {
  children: PropTypes.func.isRequired,
  outline: PropTypes.bool,
  viewBox: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
};

export default Icon;
