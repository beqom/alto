import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

import InputNumber from '../Form/InputNumber';
import TextField from '../Form/TextField';
import DatePicker from '../Form/DatePicker';
import Select from '../Form/Select';
import TextArea from '../Form/TextArea';
import TagInput from '../Form/TagInput';
import CheckBox from '../Form/CheckBox';

import RichTextEditor from '../Form/RichTextEditor/RichTextEditor';
import useDebounceCallback from '../hooks/useDebouncedCallback';
import './Input.scss';

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

const Input = React.forwardRef((props, ref) => {
  const [value, setValue] = useState(props.value);

  const instance = useRef({}).current;

  const clearPropagation = () => {
    if (typeof instance.clearPropagation === 'function') instance.clearPropagation();
  };

  useEffect(() => {
    // sync state.value with props.value
    if (!isEqual(props.value, value)) setValue(props.value);
    // cancel propagation of on change
    return clearPropagation;
  }, [props.value]);

  const debouncedTime = props.debounced === true ? DEFAULT_DEBOUNCE_TIME : props.debounced || 0;
  const onChangeDebounced = useDebounceCallback(props.onChange, debouncedTime);
  const onChangeNotDebounced = (...args) => {
    props.onChange(...args);
    return () => {};
  };

  const propagateChange = props.debounced ? onChangeDebounced : onChangeNotDebounced;

  function changeValue(...args) {
    setValue(args[0]);
    instance.clearPropagation = propagateChange(...args);
  }

  function onChange(...args) {
    const { type } = props;

    if (props.onChange) {
      switch (type) {
        case 'date':
        case 'datetime':
        case 'list':
        case 'dropdown':
        case 'select':
        case 'tags':
          return changeValue(args[0], ...args);
        case 'boolean':
          return changeValue((args[0].target || {}).checked, ...args);
        case 'richtext':
        case 'html':
          return changeValue(args[0], ...args);
        case 'integer':
        case 'number':
        case 'float':
          return changeValue(args[1], ...args);
        default:
          return changeValue(args[0].target.value, ...args);
      }
    }
    return null;
  }

  const { type, inputRef, debounced, checked, ...otherProps } = props;
  const { small, ...checkboxProps } = otherProps;
  const sharedProps = {
    ref,
    onChange,
    value,
  };

  switch (type) {
    case 'tags':
      return <TagInput {...otherProps} {...sharedProps} />;
    case 'integer':
    case 'number':
    case 'float':
      return <InputNumber {...otherProps} {...sharedProps} />;
    case 'date':
    case 'datetime':
      return <DatePicker {...otherProps} {...sharedProps} />;
    case 'list':
    case 'dropdown':
    case 'select':
      return <Select {...otherProps} {...sharedProps} />;
    case 'boolean':
      return <CheckBox {...checkboxProps} checked={!!checkboxProps.value} {...sharedProps} />;
    case 'textarea':
      return <TextArea {...otherProps} {...sharedProps} />;
    case 'richtext':
    case 'html':
      return <RichTextEditor {...otherProps} {...sharedProps} />;
    case 'string':
    case 'text':
    default:
      return <TextField {...otherProps} type={type} {...sharedProps} />;
  }
});

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

export default Input;
