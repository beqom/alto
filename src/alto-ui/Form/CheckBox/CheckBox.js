import React from 'react';
import PropTypes from 'prop-types';

import './CheckBox.scss';

const CheckBox = props => {
  const { checked, disabled } = props;
  return (
    <div className="CheckBox">
      <input {...props} className="CheckBox__input" type="checkbox" />
      <label htmlFor={props.id} {...{ checked, disabled }} className="CheckBox__label">
        {props.label}
      </label>
    </div>
  );
}

CheckBox.defaultProps = {
  checked: false,
  disabled: false,
};

CheckBox.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default CheckBox;

