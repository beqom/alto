import React from 'react';
import PropTypes from 'prop-types';
import isArray from 'lodash.isarray';
import { bemClass } from '../../helpers/bem';

import FormElement from '../FormElement';

import './Select.scss';

const renderOptions = options =>
  options.reduce((acc, option) => {
    if (option) {
      if (option.value !== undefined) {
        if (isArray(option.value)) {
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

const Select = props => {
  const {
    success,
    error,
    large,
    small,
    className,
    hideLabel,
    options,
    label,
    ...otherProps
  } = props;
  return (
    <FormElement {...props} className={className} hideLabel={hideLabel}>
      <select
        {...otherProps}
        className={bemClass('Select', {
          success,
          error,
          large,
          small,
        })}
      >
        {props.children || renderOptions(options)}
      </select>
    </FormElement>
  );
};

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
