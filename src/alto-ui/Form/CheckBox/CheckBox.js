import React from 'react';
import PropTypes from 'prop-types';
import { bemClass } from '../../helpers/bem';

import './CheckBox.scss';

function CheckBox({ label, className, hideLabel, style, ...props }) {
  return (
    <div className={bemClass('CheckBox', {}, className)} style={style}>
      <input
        {...(props.readOnly ? { tabIndex: -1 } : null)}
        {...props}
        className="CheckBox__input"
        type="checkbox"
      />
      <label htmlFor={props.id} className="CheckBox__label">
        <div className={bemClass('CheckBox__label-text', { hidden: hideLabel })}>{label}</div>
      </label>
    </div>
  );
}

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
};

export default CheckBox;
