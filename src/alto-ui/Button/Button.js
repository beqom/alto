import React from 'react';
import PropTypes from 'prop-types';

import Link from '../Link';
import { bemProps } from '../helpers/bem';
import './Button.scss';

const buttonProps = bemProps('button', [
  'outline',
  'flat',
  'danger',
  'success',
  'white',
  'large',
  'small',
  'active',
  'block',
  'nowrap',
]);

const Button = props => (
  props.href
  ? <Link {...buttonProps(props)} href={props.href}>{props.children}</Link>
  : <button {...buttonProps(props)} />
);

Button.displayName = 'Button';

Button.propTypes = {
  children: PropTypes.any,
  href: PropTypes.string,
  outline: PropTypes.bool,
  flat: PropTypes.bool,
  error: PropTypes.bool,
  success: PropTypes.bool,
  white: PropTypes.bool,
  large: PropTypes.bool,
  small: PropTypes.bool,
  active: PropTypes.bool,
  block: PropTypes.bool,
}

export default Button;
