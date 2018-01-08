import React from 'react';
import PropTypes from 'prop-types';

import './Switch.scss';

const Switch = props => {
  const { checked, disabled, id, label, onChange } = props;
  return (
    <div className="Switch">
      <input
        onChange={onChange}
        className="Switch__input"
        id={id}
        checked={checked}
        disabled={disabled}
        type="checkbox"
      />
      <label className="Switch__label" htmlFor={props.id}>
        <div className="Switch__element" />
        {label}
      </label>
    </div>
  );
};

Switch.defaultProps = {
  checked: false,
  disabled: false,
};

Switch.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Switch;
