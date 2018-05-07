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
  'icons',
  'disabled',
]);

const Button = props => {
  if (props.tag) {
    return <props.tag {...buttonProps(props)} disabled={props.disabled} />;
  }

  if (props.href) {
    return (
      <Link {...buttonProps(props)} href={props.href} disabled={props.disabled}>
        {props.children}
      </Link>
    );
  }

  return <button {...buttonProps(props)} disabled={props.disabled} />;
};

Button.displayName = 'Button';

Button.propTypes = {
  children: PropTypes.any,
  href: PropTypes.string,
  tag: PropTypes.string,
  outline: PropTypes.bool,
  flat: PropTypes.bool,
  error: PropTypes.bool,
  success: PropTypes.bool,
  white: PropTypes.bool,
  large: PropTypes.bool,
  small: PropTypes.bool,
  active: PropTypes.bool,
  block: PropTypes.bool,
  nowrap: PropTypes.bool,
  icons: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Button;
