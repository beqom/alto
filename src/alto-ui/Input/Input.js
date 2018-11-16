import React from 'react';
import PropTypes from 'prop-types';

import InputNumber from '../Form/InputNumber';
import TextField from '../Form/TextField';
import DatePicker from '../Form/DatePicker';
import Select from '../Form/Select';
import TextArea from '../Form/TextArea';

import './Input.scss';

// const sharedPropsKeys = Object.keys({
//   ...InputNumber.propTypes,
//   ...TextField.propTypes,
//   ...DatePicker.propTypes,
//   ...Select.propTypes,
//   ...TextArea.propTypes,
// });

// const getSharedProps = props =>
//   Object.entries(props)
//     .filter(([key]) => sharedPropsKeys.includes(key))
//     .reduce((acc, [key, prop]) => ({ ...acc, [key]: prop }), {});

const BOOLEAN_DEFAULT_PROPS = {
  options: [true, false],
};

const Input = React.forwardRef(({ type, ...props }, ref) => {
  switch (type) {
    case 'integer':
    case 'number':
    case 'float':
      return <InputNumber ref={ref} {...props} />;
    case 'date':
    case 'datetime':
      return <DatePicker ref={ref} {...props} />;
    case 'list':
    case 'dropdown':
    case 'select':
      return <Select ref={ref} {...props} />;
    case 'boolean':
      return <Select ref={ref} {...BOOLEAN_DEFAULT_PROPS} {...props} />;
    case 'textarea':
      return <TextArea ref={ref} {...props} />;
    case 'string':
    case 'text':
    default:
      return <TextField ref={ref} {...props} type={type} />;
  }
});

Input.displayName = 'Input';

Input.defaultProps = {};

Input.propTypes = {
  type: PropTypes.string,
};

export default Input;
