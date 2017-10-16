import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

import './Input.scss';

const Input = props => {
  const { className, modifiers = [] } = props;
  const sanitizedProps = omit(props, ['modifiers']);
  return (
    <input
      {...sanitizedProps}
      className={classnames('Input', className, modifiers.map(m => `Input--${m}`))}
    />
  );
};

Input.displayName = 'Input';

Input.defaultProps = {
  type: 'text',
};

Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf([
    'text',
    'email',
    'number',
    'password',
    'tel',
    'search',
    'url',
  ]),
  modifiers: PropTypes.array,
};

export default Input;
