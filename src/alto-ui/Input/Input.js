import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';

import InputNumber from '../Form/InputNumber';
import TextField from '../Form/TextField';
import DatePicker from '../Form/DatePicker';
import Select from '../Form/Select';
import TextArea from '../Form/TextArea';
import TagInput from '../Form/TagInput';
import CheckBox from '../Form/CheckBox';

import './Input.scss';
import RichTextEditor from '../Form/RichTextEditor/RichTextEditor';

const DEFAULT_DEBOUNCE_TIME = 200;

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

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line react/no-unused-state
      valueFromProps: props.value,
      value: props.value,
    };
    this.useValueFromState = false;

    this.handleChange = this.handleChange.bind(this);
    const propagateChange = this.propagateChange.bind(this);
    this.propagateChange = props.debounced
      ? debounce(
          propagateChange,
          props.debounced === true ? DEFAULT_DEBOUNCE_TIME : props.debounced
        )
      : propagateChange;
  }

  static getDerivedStateFromProps({ value }, { valueFromProps }) {
    if (!isEqual(value, valueFromProps)) return { value, valueFromProps: value };
    return null;
  }

  changeValue(...args) {
    this.setState({ value: args[0] });
    this.propagateChange(...args);
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
        case 'tags':
          return this.changeValue(args[0], ...args);
        case 'boolean':
          return this.changeValue((args[0].target || {}).checked, ...args);
        case 'richtext':
        case 'html':
          return this.changeValue(args[0], ...args);
        case 'integer':
        case 'number':
        case 'float':
          return this.changeValue(args[1], ...args);
        default:
          return this.changeValue(args[0].target.value, ...args);
      }
    }
    return null;
  }

  propagateChange(...args) {
    this.props.onChange(...args);
  }

  render() {
    const { type, inputRef, value, debounced, ...props } = this.props;

    const sharedProps = {
      ref: inputRef,
      onChange: this.handleChange,
      value: this.state.value,
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
        return <CheckBox {...props} checked={props.value} {...sharedProps} />;
      case 'textarea':
        return <TextArea {...props} {...sharedProps} />;
      case 'richtext':
      case 'html':
        return <RichTextEditor {...props} {...sharedProps} />;
      case 'string':
      case 'text':
      default:
        return <TextField {...props} type={type} {...sharedProps} />;
    }
  }
}

Input.displayName = 'Input';

Input.defaultProps = {
  debounced: true,
};

Input.propTypes = {
  type: PropTypes.string,
  inputRef: PropTypes.object,
  onChange: PropTypes.func,
  value: PropTypes.any,
  debounced: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
};

export default React.forwardRef((props, ref) => <Input {...props} inputRef={ref} />);
