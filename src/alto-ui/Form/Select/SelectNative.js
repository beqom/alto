import React from 'react';
import PropTypes from 'prop-types';
import { bemClass } from '../../helpers/bem';

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

const SelectNative = React.forwardRef((props, ref) => {
  const {
    success,
    error,
    large,
    small,
    className,
    hideLabel,
    options,
    readonly,
    multiple,
    ...otherProps
  } = props;
  return (
    <select
      ref={ref}
      {...otherProps}
      disabled={readonly || otherProps.disabled}
      multiple={multiple}
      className={bemClass('Select', {
        native: true,
        success,
        error,
        large,
        small,
        readonly,
        multiple,
      })}
    >
      {props.children || renderOptions(options)}
    </select>
  );
});

SelectNative.displayName = 'SelectNative';

SelectNative.defaultProps = {
  options: [],
  children: null,
};

SelectNative.propTypes = {
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

export default SelectNative;
