import React from 'react';
import PropTypes from 'prop-types';

import FormElement from '../FormElement';
import SelectNative from './SelectNative';
import SelectDropdown from './SelectDropdown';

import './Select.scss';

const Select = React.forwardRef(({ native, helpText, label, hideLabel, ...props }, ref) => (
  <FormElement
    {...props}
    useLabelledby={!native}
    helpText={helpText}
    label={label}
    hideLabel={hideLabel}
  >
    {native ? <SelectNative ref={ref} {...props} /> : <SelectDropdown selectRef={ref} {...props} />}
  </FormElement>
));

Select.displayName = 'Select';

Select.defaultProps = {
  native: false,
};

Select.propTypes = {
  native: PropTypes.bool,
};

export default Select;
