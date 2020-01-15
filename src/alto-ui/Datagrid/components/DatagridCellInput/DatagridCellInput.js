import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Input from '../../../Input';
import {
  getListProps,
  getBooleanProps,
  getNumberProps,
  getDateProps,
  getTextProps,
} from './DatagridCellInputAdapters';

import { bemClass } from '../../../helpers/bem';

import './DatagridCellInput.scss';

const ENTER_KEY_CODE = 13;
const ESC_KEY_CODE = 27;

const DatagridCellInput = props => {
  const {
    editing,
    modifiers,
    onChange,
    onStopEditing,
    onStartEditing,
    value,
    type,
  } = props;
  const inputRef = useRef();

  useEffect(() => {
    if (editing) {
      const { current: inputRefCurrent } = inputRef;

      if (inputRefCurrent) {
        inputRefCurrent.focus();
      }
    }
  }, [editing]);

  function handleBlur() {
    onStopEditing(value);
  }

  function handleChangeFromOverlay(currentValue) {
    onChange(currentValue);
    onStopEditing(currentValue);
  }

  function handleStartEditing() {
    onStartEditing(value);
  }

  function handleKeyDown({ keyCode }) {
    if ([ESC_KEY_CODE, ENTER_KEY_CODE].includes(keyCode)) {
      onStopEditing();
    }
  }

  function getInputProps() {
    const inputProps = {
      ...props,
      ref: inputRef,
      handleChange: onChange,
      handleChangeFromOverlay,
      handleStartEditing,
      handleBlur,
      handleKeyDown,
    };

    switch (type) {
      case 'list':
      case 'select':
        return getListProps(inputProps);
      case 'boolean':
        return getBooleanProps(inputProps);
      case 'number':
      case 'integer':
      case 'float':
        return getNumberProps(inputProps);
      case 'date':
      case 'datetime':
        return getDateProps(inputProps);
      default:
        return getTextProps(inputProps);
    }
  }

  return (
    <Input
      ref={inputRef}
      {...getInputProps()}
      className={bemClass('DatagridCellInput', modifiers)}
    />
  );
};

DatagridCellInput.displayName = 'DatagridCellInput';

DatagridCellInput.defaultProps = {
  value: '',
  inputProps: {},
};

DatagridCellInput.propTypes = {
  value: PropTypes.any,
  inputProps: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onStopEditing: PropTypes.func.isRequired,
  onStartEditing: PropTypes.func.isRequired,
  modifiers: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  context: PropTypes.shape({
    locale: PropTypes.string.isRequired,
  }).isRequired,
  column: PropTypes.shape({
    precision: PropTypes.number,
    disableThousandSeparator: PropTypes.bool,
    percent: PropTypes.bool,
    title: PropTypes.string.isRequired,
  }).isRequired,
  type: PropTypes.string.isRequired,
  editing: PropTypes.bool.isRequired,
};

export default DatagridCellInput;
