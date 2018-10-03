import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { bemClass } from '../../helpers/bem';

import './CheckBox.scss';

const CheckBox = props => {
  const { label, className, hideLabel, style, ...inputProps } = props;
  return (
    <div className={classnames('CheckBox', className)} style={style}>
      <input {...inputProps} className="CheckBox__input" type="checkbox" />
      <label
        htmlFor={props.id}
        checked={props.checked}
        disabled={props.disabled}
        title={label}
        className="CheckBox__label"
      >
        <div className={bemClass('CheckBox__label-text', { hidden: hideLabel })}>{props.label}</div>
      </label>
    </div>
  );
};

CheckBox.defaultProps = {
  checked: false,
  disabled: false,
};

CheckBox.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  hideLabel: PropTypes.bool,
};

export default CheckBox;
