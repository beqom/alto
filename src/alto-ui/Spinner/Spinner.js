import React from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../helpers/bem';
import './Spinner.scss';

const Spinner = ({ className, show, children, small, large }) =>
  show ? <div className={bemClass('Spinner', { small, large }, className)} /> : children;

Spinner.displayName = 'Spinner';

Spinner.defaultProps = {
  show: true,
  small: false,
  large: false,
};

Spinner.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  show: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
};

export default Spinner;
