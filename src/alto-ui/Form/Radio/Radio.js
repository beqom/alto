import React from 'react';
import PropTypes from 'prop-types';

import './Radio.scss';

const Radio = props => {
  const { checked, disabled } = props;
  return (
    <div className="Radio">
      <input {...props} className="Radio__input" type="radio" />
      <label htmlFor={props.id} {...{ checked, disabled }} className="Radio__label">
        {props.label}
      </label>
    </div>
  );
};

Radio.defaultProps = {
  checked: false,
  disabled: false,
};

Radio.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Radio;
