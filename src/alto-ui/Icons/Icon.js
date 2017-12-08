import React from 'react';
import PropTypes from 'prop-types';

import bem from '../helpers/bem';
import './Icon.scss';

const modifiers = ['baseline', 'left', 'right'];

const extraProps = ['outline', 'viewBox', 'color', 'size'];

const IconContainer = bem('i', 'icon', modifiers, extraProps);

IconContainer.displayName = 'IconContainer';

const getStyle = ({ size }) => {
  if(!size) return {};

  return {
    width: size,
    height: size,
    fontSize: size,
  };
}

const Icon = props => (
  <IconContainer {...props} style={getStyle(props)}>
    <svg
      version="1.1"
      viewBox={props.viewBox}
      width="1em"
      height="1em"
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
    >
      {props.children({
        fill: props.color,
      })}
    </svg>
  </IconContainer>
);

Icon.defaultProps = {
  size: null,
  viewBox: '0 0 36 36',
  outline: false,
  color: 'currentColor',
  baseline: false,
  left: false,
  right: false,
};

Icon.propTypes = {
  children: PropTypes.func.isRequired,
  outline: PropTypes.bool,
  viewBox: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  baseline: PropTypes.bool,
  left: PropTypes.bool,
  right: PropTypes.bool,
};

export default Icon;
