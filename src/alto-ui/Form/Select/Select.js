import React from 'react';
import PropTypes from 'prop-types';

import FormElement from '../FormElement';
import SelectNative from './SelectNative';
import SelectDropdown from './SelectDropdown';
import Typeahead from '../Typeahead';

import './Select.scss';

const Select = React.forwardRef(({ native, autocomplete, ...props }, ref) => {
  if (autocomplete) {
    const { options, ...typeaheadProps } = props;
    return <Typeahead ref={ref} items={options} {...typeaheadProps} />;
  }
  const { helpText, label, hideLabel, ...selectProps } = props;
  return (
    <FormElement
      {...props}
      useLabelledby={!native}
      helpText={helpText}
      label={label}
      hideLabel={hideLabel}
    >
      {native ? (
        <SelectNative ref={ref} {...selectProps} />
      ) : (
        <SelectDropdown selectRef={ref} {...props} />
      )}
    </FormElement>
  );
});

Select.displayName = 'Select';

Select.defaultProps = {
  native: false,
  autocomplete: true,
};

Select.propTypes = {
  native: PropTypes.bool,
  autocomplete: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.shape({
        title: PropTypes.string,
        value: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
          PropTypes.bool,
          PropTypes.array,
        ]),
      }),
    ])
  ),
};

export default Select;
