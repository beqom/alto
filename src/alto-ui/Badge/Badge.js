import React from 'react';
import PropTypes from 'prop-types';
import { bemClass } from '../helpers/bem';

import './Badge.scss';

function Badge({
  className,
  red,
  orange,
  yellow,
  lime,
  green,
  pine,
  teal,
  blue,
  indigo,
  purple,
  pink,
  black,
  ...props
}) {
  return (
    <div
      {...props}
      className={bemClass(
        'Badge',
        { red, orange, yellow, lime, green, pine, teal, blue, indigo, purple, pink, black },
        className
      )}
    />
  );
}

Badge.displayName = 'Badge';

Badge.defaultProps = {};

Badge.propTypes = {
  className: PropTypes.string,
  red: PropTypes.bool,
  orange: PropTypes.bool,
  yellow: PropTypes.bool,
  lime: PropTypes.bool,
  green: PropTypes.bool,
  pine: PropTypes.bool,
  teal: PropTypes.bool,
  blue: PropTypes.bool,
  indigo: PropTypes.bool,
  purple: PropTypes.bool,
  pink: PropTypes.bool,
  black: PropTypes.bool,
};

export default Badge;
