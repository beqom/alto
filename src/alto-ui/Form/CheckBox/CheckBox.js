import React from 'react';
import PropTypes from 'prop-types';

import './CheckBox.scss';

const CheckBox = props => {
  const { label, ...inputProps } = props;
  return (
    <div className="CheckBox">
      <input {...inputProps} className="CheckBox__input" type="checkbox" />
      <label
        htmlFor={props.id}
        defaultChecked={props.defaultChecked}
        disabled={props.disabled}
        title={label}
        className="CheckBox__label"
      >
        <span className="CheckBox__label-wrapper">{props.label}</span>
      </label>
    </div>
  );
};

CheckBox.defaultProps = {
  defaultChecked: false,
  disabled: false,
};

CheckBox.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default CheckBox;
