import React from 'react';
import PropTypes from 'prop-types';

import InputNumber from '../Form/InputNumber';
import TextField from '../Form/TextField';
import DatePicker from '../Form/DatePicker';
import Select from '../Form/Select';
import TextArea from '../Form/TextArea';
import TagInput from '../Form/TagInput';

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

class Input extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(...args) {
    const { type, onChange } = this.props;
    if (onChange) {
      switch (type) {
        case 'date':
        case 'datetime':
        case 'list':
        case 'dropdown':
        case 'select':
        case 'boolean':
        case 'tags':
          return onChange(args[0], ...args);
        case 'integer':
        case 'number':
        case 'float':
          return onChange(args[1], ...args);
        default:
          return onChange(args[0].target.value, ...args);
      }
    }
    return null;
  }

  render() {
    const { type, inputRef, ...props } = this.props;

    const sharedProps = {
      ref: inputRef,
      onChange: this.handleChange,
    };

    switch (type) {
      case 'tags':
        return <TagInput {...props} {...sharedProps} />;
      case 'integer':
      case 'number':
      case 'float':
        return <InputNumber {...props} {...sharedProps} />;
      case 'date':
      case 'datetime':
        return <DatePicker {...props} {...sharedProps} value={props.value || undefined} />;
      case 'list':
      case 'dropdown':
      case 'select':
        return <Select {...props} {...sharedProps} />;
      case 'boolean':
        return <Select {...BOOLEAN_DEFAULT_PROPS} {...props} {...sharedProps} />;
      case 'textarea':
        return <TextArea {...props} {...sharedProps} />;
      case 'string':
      case 'text':
      default:
        return <TextField {...props} type={type} {...sharedProps} />;
    }
  }
}

Input.displayName = 'Input';

Input.defaultProps = {};

Input.propTypes = {
  type: PropTypes.string,
  inputRef: PropTypes.object,
  onChange: PropTypes.func,
  value: PropTypes.any,
};

export default React.forwardRef((props, ref) => <Input {...props} inputRef={ref} />);
