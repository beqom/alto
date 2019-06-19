import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../../helpers/bem';
import VisuallyHidden from '../../VisuallyHidden';
import './Switch.scss';

function Switch({ className, hideLabel, checked, disabled, id, label, left, small, ...props }) {
  const LabelComponent = hideLabel ? VisuallyHidden : 'div';
  const right = !left;
  const labelElt = (
    <LabelComponent
      className={bemClass('Switch__label', { hidden: hideLabel, left, right, disabled })}
    >
      {label}
    </LabelComponent>
  );
  return (
    <Fragment>
      <input
        {...props}
        className="Switch__input"
        id={id}
        checked={checked}
        disabled={disabled}
        type="checkbox"
      />

      <label className={bemClass('Switch', { small }, className)} htmlFor={id}>
        {right && labelElt}
        <div className={bemClass('Switch__element', { small, checked, disabled })} />
        {left && labelElt}
      </label>
    </Fragment>
  );
}

Switch.displayName = 'Switch';

Switch.defaultProps = {
  checked: false,
  disabled: false,
  onChange: () => {},
};

Switch.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  hideLabel: PropTypes.bool,
  left: PropTypes.bool,
  small: PropTypes.bool,
};

export default Switch;
