import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import isNumber from 'lodash.isnumber';

import { bemClass } from '../../helpers/bem';
import { isIE11 } from '../../helpers/navigator';
import FormElement from '../FormElement';
import GhostInput from '../../GhostInput/GhostInput';

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
    ghost,
    disabled,
    percent,
    debounced,
    ...remainingProps
  } = props;

  const onChangeDebounceTime = isNumber(debounced) ? debounced : 200;
  const propagateChange = debounced ? debounce(handleChange, onChangeDebounceTime) : handleChange;
  const visibilityProps = props.readOnly ? { 'aria-hidden': true, tabIndex: '-1' } : {};

  if (ghost) return <GhostInput {...props} />;

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

  return (
    <FormElement {...props}>
      {area ? (
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
          onChange={event => propagateChange(event, type, props.onChange)}
        />
      )}
    </FormElement>
  );
});
TextField.defaultProps = {
  type: 'text',
  autoComplete: 'off',
  debounced: false,
};

TextField.propTypes = {
  type: PropTypes.string,
  debounced: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  area: PropTypes.bool,
  large: PropTypes.bool,
  small: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.bool,
};

TextField.displayName = 'TextField';

export default TextField;
