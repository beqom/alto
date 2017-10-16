import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import './Button.scss';

const Button = ({ className, children, modifiers = [] }) => (
  <button className={classnames('Button', className, modifiers.map(m => `Button--${m}`))}>
    {children}
  </button>
);

Button.defaultProps = {
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  modifiers: PropTypes.array,
};

export default Button;
