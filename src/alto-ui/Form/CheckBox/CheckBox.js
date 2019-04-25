import React from 'react';
import PropTypes from 'prop-types';
import { bemClass } from '../../helpers/bem';

import './CheckBox.scss';

const CheckBox = React.forwardRef(
  ({ label, className, hideLabel, style, ...props }, forwardedRef) => (
    <div className={bemClass('CheckBox', {}, className)} style={style}>
      <input
        ref={forwardedRef}
        {...(props.readOnly ? { tabIndex: -1 } : null)}
        {...props}
        className={bemClass('CheckBox__input', { readOnly: props.readOnly })}
        type="checkbox"
        disabled={props.disabled || props.readOnly}
      />
      <label
        htmlFor={props.id}
        className={bemClass('CheckBox__label', {
          disabled: props.disabled,
          readOnly: props.readOnly,
        })}
      >
        <div className={bemClass('CheckBox__label-text', { hidden: hideLabel })}>{label}</div>
      </label>
    </div>
  )
);

CheckBox.defaultProps = {};

CheckBox.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  hideLabel: PropTypes.bool,
  readOnly: PropTypes.bool,
  forwardedRef: PropTypes.object,
};
export default CheckBox;
