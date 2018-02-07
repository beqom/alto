import React from 'react';
import PropTypes from 'prop-types';
import { bemClass } from '../../helpers/bem';

import VisuallyHidden from '../../VisuallyHidden';

import './ColorPicker.scss';

const ColorPicker = ({ id, name, label, checked, color, onChange, className, disabled }) => (
  <div className={bemClass('ColorPicker', { [color]: true }, className)}>
    <input
      type="radio"
      name={name}
      onChange={onChange}
      className="ColorPicker__input"
      id={id}
      checked={checked}
      disabled={disabled}
    />
    <label htmlFor={id} className="ColorPicker__label">
      <div className="ColorPicker__dot" />
      <VisuallyHidden>{label || color}</VisuallyHidden>
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
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default ColorPicker;
