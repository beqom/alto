import React from 'react';
import PropTypes from 'prop-types';

import FormElement from '../FormElement';
import Typeahead from '../Typeahead';
import SelectNative from './SelectNative';
import SelectDropdown from './SelectDropdown';

import './Select.scss';

const Select = React.forwardRef(
  ({ native, helpText, label, hideLabel, autocomplete, ...props }, ref) => {
    if (autocomplete) {
      const { options, ...typeaheadProps } = props;
      return <Typeahead ref={ref} items={options} {...typeaheadProps} />;
    }
    return (
      <FormElement
        {...props}
        useLabelledby={!native}
        helpText={helpText}
        label={label}
        hideLabel={hideLabel}
      >
        {native ? (
          <SelectNative ref={ref} {...props} />
        ) : (
          <SelectDropdown selectRef={ref} {...props} />
        )}
      </FormElement>
    );
  }
);

Select.displayName = 'Select';

Select.defaultProps = {
  native: false,
  autocomplete: false,
};

Select.propTypes = {
  autocomplete: PropTypes.bool,
  native: PropTypes.bool,
};

export default Select;
