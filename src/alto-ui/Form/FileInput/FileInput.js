import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../../Button';

import './FileInput.scss';

const FileInput = ({
  id,
  className,
  onChange,
  label,
  disabled,
  outline,
  flat,
  danger,
  success,
  white,
  large,
  small,
  block,
  nowrap,
  accept,
  name,
  required,
  value,
  children,
}) => (
  <div className={classnames('FileInput', className)}>
    <input
      className="FileInput__input"
      id={id}
      type="file"
      {...{ disabled, onChange, accept, name, required, value }}
    />
    <Button
      tag="label"
      htmlFor={id}
      {...{
        disabled,
        outline,
        flat,
        danger,
        success,
        white,
        large,
        small,
        block,
        nowrap,
      }}
    >
      {children || label}
    </Button>
  </div>
);

FileInput.displayName = 'FileInput';

FileInput.defaultProps = {};

FileInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  children: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  outline: PropTypes.bool,
  flat: PropTypes.bool,
  disabled: PropTypes.bool,
  danger: PropTypes.bool,
  success: PropTypes.bool,
  white: PropTypes.bool,
  large: PropTypes.bool,
  small: PropTypes.bool,
  block: PropTypes.bool,
  nowrap: PropTypes.bool,
  accept: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
};

export default FileInput;
