import React from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../../helpers/bem';
import { isIE11 } from '../../helpers/navigator';
import FormElement from '../FormElement';

import './TextField.scss';

const handleChange = (event, type, onChange) => {
  if (typeof onChange !== 'function') return;

  if (type !== 'number') {
    onChange(event);
    return;
  }

  const regex = /^-?[+]?[0-9]*\.?[0-9]*$/;
  if (regex.test(event.target.value)) {
    onChange(event);
  }
};

// IE for ever <3
const getInputType = type => (isIE11() && type === 'number' ? 'text' : type);

const TextField = React.forwardRef((props, ref) => {
  const {
    hideLabel,
    label,
    style,
    type,
    helpText,
    large,
    small,
    success,
    error,
    area,
    right,
    disabled,
    percent,
    ...remainingProps
  } = props;

  const visibilityProps = props.readOnly ? { 'aria-hidden': true, tabIndex: '-1' } : {};

  const className = bemClass(
    'textfield',
    {
      large,
      small,
      success,
      error,
      area,
      right,
      readOnly: props.readOnly,
    },
    props.className
  );

  const element = area ? (
    <textarea
      ref={ref}
      {...remainingProps}
      className={className}
      {...visibilityProps}
      disabled={disabled}
    />
  ) : (
    <input
      ref={ref}
      {...remainingProps}
      className={className}
      type={getInputType(props.type)}
      disabled={disabled}
      {...visibilityProps}
      onChange={event => handleChange(event, props.type, props.onChange)}
    />
  );

  if (!label) return element;

  return <FormElement {...props}>{element}</FormElement>;
});
TextField.defaultProps = {
  type: 'text',
  autoComplete: 'off',
};

TextField.propTypes = {
  type: PropTypes.string,
  area: PropTypes.bool,
  large: PropTypes.bool,
  small: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.bool,
};

TextField.displayName = 'TextField';

export default TextField;
