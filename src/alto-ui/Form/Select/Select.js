import React from 'react';
import PropTypes from 'prop-types';
import { bemClass } from '../../helpers/bem';

import FormElement from '../FormElement';

import './Select.scss';

const renderOptions = options =>
  (options || []).reduce((acc, option) => {
    if (option) {
      if (option.value !== undefined) {
        if (Array.isArray(option.value)) {
          return acc.concat([
            <optgroup label={option.title} key={option.title}>
              {renderOptions(option.value)}
            </optgroup>,
          ]);
        }
        return acc.concat([
          <option key={option.value} value={option.value}>
            {option.title}
          </option>,
        ]);
      }
      return acc.concat([
        <option key={option} value={option}>
          {option}
        </option>,
      ]);
    }
    return acc;
  }, []);

const Select = React.forwardRef((props, ref) => {
  const {
    success,
    error,
    large,
    small,
    className,
    hideLabel,
    options,
    readonly,
    label,
    helpText,
    ...otherProps
  } = props;
  return (
    <FormElement
      {...props}
      helpText={helpText}
      label={label}
      className={className}
      hideLabel={hideLabel}
    >
      <select
        ref={ref}
        {...otherProps}
        disabled={readonly || otherProps.disabled}
        className={bemClass('Select', {
          success,
          error,
          large,
          small,
          readonly,
        })}
      >
        {props.children || renderOptions(options)}
      </select>
    </FormElement>
  );
});

Select.displayName = 'Select';

Select.defaultProps = {
  options: [],
  children: null,
};

Select.propTypes = {
  children: PropTypes.any,
  success: PropTypes.bool,
  error: PropTypes.bool,
  large: PropTypes.bool,
  small: PropTypes.bool,
  className: PropTypes.string,
  hideLabel: PropTypes.bool,
  helpText: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        title: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
      }),
    ])
  ),
  label: PropTypes.string,
};

export default Select;
