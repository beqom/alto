import React from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../helpers/bem';
import './Spinner.scss';

const Spinner = ({ id, className, show, centered, children, small, large }) => {
  if (!show) return children || null;
  const spinner = (
    <div id={id} className={bemClass('Spinner', { small, large, centered }, className)} />
  );
  if (centered) {
    return <div className="Spinner--centered__wrapper">{spinner}</div>;
  }
  return spinner;
};

Spinner.displayName = 'Spinner';

Spinner.defaultProps = {
  show: true,
  small: false,
  large: false,
  centered: false,
};

Spinner.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
  show: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  centered: PropTypes.bool,
};

export default Spinner;
