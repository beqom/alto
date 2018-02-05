import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import VisuallyHidden from '../../VisuallyHidden';

import './ColorPicker.scss';

const ColorPicker = ({ id, name, label, checked, color, onChange, className, disabled }) => (
  <div className={classnames('ColorPicker', className)}>
    <input
      type="radio"
      name={name}
      onChange={onChange}
      className="ColorPicker__input"
      id={id}
      checked={checked}
      disabled={disabled}
    />
    <label
      htmlFor={id}
      className="ColorPicker__label"
      style={{
        borderColor: color,
      }}
    >
      <div
        className="ColorPicker__dot"
        style={{
          backgroundColor: color,
        }}
      />
      <VisuallyHidden>{label}</VisuallyHidden>
    </label>
  </div>
);

ColorPicker.displayName = 'ColorPicker';

ColorPicker.defaultProps = {};

ColorPicker.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default ColorPicker;
