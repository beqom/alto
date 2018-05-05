import React from 'react';
import PropTypes from 'prop-types';

import VisuallyHidden from '../VisuallyHidden';
import { bemClass } from '../helpers/bem';
import './Icon.scss';

const getStyle = (isButton, size) => {
  if (!size) return {};
  if (isButton) return { fontSize: size };

  return {
    width: size,
    height: size,
    fontSize: size,
  };
};

const Icon = props => {
  const Container = props.onClick ? 'button' : 'i';
  const {
    baseline,
    left,
    right,
    outline,
    viewBox,
    color,
    size,
    children,
    a11yLabel,
    badged,
    ...otherProps
  } = props;
  return (
    <Container
      {...otherProps}
      className={bemClass(
        'icon',
        { baseline, left, right, button: props.onClick },
        props.className
      )}
      style={getStyle(!!props.onClick, size)}
    >
      <svg
        version="1.1"
        viewBox={viewBox}
        width="1em"
        height="1em"
        xmlns="http://www.w3.org/2000/svg"
        role="presentation"
      >
        {children({ fill: color })}
        {badged && <circle className="icon__badge" cx="30" cy="6" r="5" />}
      </svg>
      {!!a11yLabel && <VisuallyHidden>{a11yLabel}</VisuallyHidden>}
    </Container>
  );
};

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
  badged: PropTypes.bool,
  viewBox: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  baseline: PropTypes.bool,
  left: PropTypes.bool,
  right: PropTypes.bool,
  a11yLabel: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Icon;
