import React from 'react';
import PropTypes from 'prop-types';
import { bemClass } from '../../helpers/bem';

import './Radio.scss';

function Radio({ label, className, hideLabel, style, ...props }) {
  return (
    <div className={bemClass('Radio', {}, className)} style={style}>
      <input
        {...(props.readOnly ? { tabIndex: -1 } : null)}
        {...props}
        className={bemClass('Radio__input', { readOnly: props.readOnly })}
        type="radio"
        disabled={props.disabled || props.readOnly}
      />
      <label htmlFor={props.id} className="Radio__label">
        <div className={bemClass('Radio__label-text', { hidden: hideLabel })}>{label}</div>
      </label>
    </div>
  );
}

Radio.defaultProps = {};

Radio.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  hideLabel: PropTypes.bool,
};

export default Radio;
