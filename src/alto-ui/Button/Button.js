import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash.omit';

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

const Button = props => {
  const safeProps = buttonProps(omit(props, 'buttonRef'));
  if (props.tag) {
    return <props.tag {...safeProps} disabled={props.disabled} ref={props.buttonRef} />;
  }

  if (props.href) {
    return (
      <Link {...safeProps} ref={props.buttonRef} href={props.href} disabled={props.disabled}>
        {props.children}
      </Link>
    );
  }

  return <button {...safeProps} disabled={props.disabled} ref={props.buttonRef} />;
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
