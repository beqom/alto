import React from 'react';
import PropTypes from 'prop-types';

import Input from '../../../Input';

import { bemClass } from '../../../helpers/bem';

import './DatagridCellInput.scss';

const ENTER_KEY_CODE = 13;
const ESC_KEY_CODE = 27;

class DatagridCellInput extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleStartEditing = this.handleStartEditing.bind(this);
    this.handleChangeFromOverlay = this.handleChangeFromOverlay.bind(this);

    this.inputRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const becameEditing = !prevProps.editing && this.props.editing;

    if (becameEditing) {
      this.focus();
    }
  }

  getSharedProps() {
    const { value, id, context, column, type } = this.props;
    return {
      ref: this.inputRef,
      id,
      type,
      label: column.title,
      hideLabel: true,
      small: context.compact,
      value: [undefined, null].includes(value) ? '' : value,
      onBlur: this.handleBlur,
      onFocus: this.handleStartEditing,
      onKeyDown: this.handleKeyDown,
      onChange: this.handleChange,
    };
  }

  getInputProps() {
    const { type, context, column, inputProps, modifiers } = this.props;

    const sharedProps = this.getSharedProps();

    switch (type) {
      case 'list':
      case 'select':
        return {
          ...sharedProps,
          onBlur: undefined,
          onFocus: undefined,
          onChange: this.handleChangeFromOverlay,
          onOpen: this.handleStartEditing,
          onClose: this.handleBlur,
          clearable: true,
          edited: modifiers.edited,
          ...inputProps,
        };
      case 'boolean':
        return {
          ...sharedProps,
          onBlur: undefined,
          onFocus: undefined,
          ...inputProps,
        };
      case 'number':
      case 'integer':
      case 'float':
        return {
          ...sharedProps,
          locale: context.locale,
          precision: column.precision,
          right: true,
          disableThousandSeparator: column.disableThousandSeparator,
          percent: column.percent,
          ...inputProps,
        };
      case 'date':
      case 'datetime':
        return {
          ...sharedProps,
          onBlur: undefined,
          onClose: this.handleBlur,
          onChange: this.handleChange,
          onSelectDate: this.handleChangeFromOverlay,
          ...inputProps,
        };
      default:
        return {
          ...sharedProps,
          type: 'text',
          ...inputProps,
        };
    }
  }

  handleChange(value) {
    this.props.onChange(value);
  }

  handleBlur() {
    this.props.onStopEditing(this.props.value);
  }

  handleChangeFromOverlay(value) {
    this.props.onChange(value);
    this.props.onStopEditing(value);
  }

  handleStartEditing() {
    this.props.onStartEditing(this.props.value);
  }

  focus() {
    if (this.inputRef.current) this.inputRef.current.focus();
  }

  handleKeyDown(e) {
    if (e.keyCode === ESC_KEY_CODE || e.keyCode === ENTER_KEY_CODE) {
      this.props.onStopEditing();
    }
  }

  render() {
    return (
      <Input
        {...this.getInputProps()}
        className={bemClass('DatagridCellInput', this.props.modifiers)}
      />
    );
  }
}

DatagridCellInput.displayName = 'DatagridCellInput';

DatagridCellInput.defaultProps = {};

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
