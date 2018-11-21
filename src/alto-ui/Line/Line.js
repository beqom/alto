import React from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../helpers/bem';

import './Line.scss';

const Line = ({
  className,
  vertical,
  xxsmall,
  small,
  medium,
  large,
  xlarge,
  xxlarge,
  ...props
}) => (
  <div
    {...props}
    className={bemClass(
      'Line',
      {
        vertical,
        xxsmall,
        small,
        medium,
        large,
        xlarge,
        xxlarge,
      },
      className
    )}
  />
);

Line.displayName = 'Line';

Line.defaultProps = {};

Line.propTypes = {
  className: PropTypes.string,
  vertical: PropTypes.bool,
  xxsmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  xlarge: PropTypes.bool,
  xxlarge: PropTypes.bool,
};

export default Line;
