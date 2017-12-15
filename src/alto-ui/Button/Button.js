import React from 'react';
import PropTypes from 'prop-types';
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
]);

const Button = props => (
  props.href
  ? <a {...buttonProps(props)} href={props.href}>{props.children}</a>
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
