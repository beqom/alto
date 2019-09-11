import React, { Fragment, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../../helpers/bem';
import { isIE11 } from '../../helpers/navigator';
import RemoveIcon from '../../Icons/Times';
import FormElement from '../FormElement';

import './TextField.scss';

function triggerOnChange(input, value) {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    'value'
  ).set;
  nativeInputValueSetter.call(input, value);
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

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

const TextField = React.forwardRef((props, passedRef) => {
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
    children,
    clearable,
    onClear,
    ...remainingProps
  } = props;
  const defaultRef = useRef();
  const ref = passedRef || defaultRef;
  const visibilityProps = props.readOnly ? { 'aria-hidden': true, tabIndex: '-1' } : {};

  const [isFocus, setFocus] = useState(false);

  const modifiers = {
    large,
    small,
    success,
    error,
    area,
    right,
    focus: isFocus,
    disabled: props.disabled,
    readOnly: props.readOnly,
  };

  const className = bemClass('textfield', modifiers, props.className);
  const inputClassName = bemClass('textfield__input', modifiers, props.className);
  const renderInput = typeof children === 'function' ? children : x => x;

  const element = area ? (
    <textarea
      ref={ref}
      {...remainingProps}
      className={className}
      {...visibilityProps}
      disabled={disabled}
    />
  ) : (
    <div className={className}>
      {renderInput(
        <Fragment>
          <input
            ref={ref}
            {...remainingProps}
            className={inputClassName}
            type={getInputType(props.type)}
            disabled={disabled}
            onFocus={(...args) => {
              setFocus(true);
              if (typeof props.onFocus === 'function') props.onFocus(...args);
            }}
            onBlur={(...args) => {
              setFocus(false);
              if (typeof props.onBlur === 'function') props.onBlur(...args);
            }}
            {...visibilityProps}
            onChange={event => handleChange(event, props.type, props.onChange)}
          />
          {(clearable || onClear) && !!props.value && (
            <RemoveIcon onClick={() => (onClear ? onClear() : triggerOnChange(ref.current, ''))} />
          )}
        </Fragment>,
        isFocus
      )}
    </div>
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
