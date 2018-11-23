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
  'disabled',
]);

const Button = ({ buttonRef, ...props }) => {
  if (props.tag) {
    return <props.tag {...buttonProps(props)} disabled={props.disabled} ref={buttonRef} />;
  }

  if (props.href) {
    return (
      <Link {...buttonProps(props)} linkRef={buttonRef} href={props.href} disabled={props.disabled}>
        {props.children}
      </Link>
    );
  }

  return <button {...buttonProps(props)} disabled={props.disabled} ref={buttonRef} />;
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
  disabled: PropTypes.bool,
  buttonRef: PropTypes.object,
};

export default Button;
