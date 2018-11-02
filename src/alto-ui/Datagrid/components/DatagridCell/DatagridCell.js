import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';

import ExclamationCircleIcon from '../../../Icons/ExclamationCircle';
import ExclamationTriangleIcon from '../../../Icons/ExclamationTriangle';
import TextField from '../../../Form/TextField';
import InputNumber from '../../../Form/InputNumber';
import Dropdown from '../../../Dropdown';
import OptionsIcon from '../../../Icons/Options';
import Tooltip from '../../../Tooltip';

import { evaluateFormula } from '../../../helpers/formula';
import { bemClass } from '../../../helpers/bem';

import './DatagridCell.scss';

const IDENTITY = x => x;

const getValue = (value, column, row) =>
  column.formula ? evaluateFormula(column.formula, row) : value;
const getType = (value, column) => (value instanceof Error ? 'error' : column.type || typeof value);

const getFormatter = (context, type) => (value, column, row) => {
  const parser = context.parsers[type] || IDENTITY;
  const formatter = column.formatter || context.formatters[type] || IDENTITY;
  const args = [column, row, context];

  return formatter(parser(value, ...args), ...args);
};

const getFormattedValue = context => (value, column, row) => {
  const val = getValue(value, column, row);
  const type = getType(val, column);
  const format = getFormatter(context, type);
  return format(value, column, row);
};

const getInputProps = type => {
  switch (type) {
    case 'number':
    case 'float':
    case 'int':
    case 'integer':
    case 'percentage':
      return {
        type: 'number',
      };
    default:
      return {};
  }
};

const diff = (a, b) => {
  const aEntries = Object.entries(a || {});
  return (
    aEntries.some(([key, value]) => value !== b[key]) ||
    aEntries.length !== Object.values(b || {}).length
  );
};

class DatagridCell extends React.Component {
  constructor(props) {
    super(props);

    const value = props.row[props.column.key];
    this.state = {
      editing: false,
      value,
      // eslint-disable-next-line react/no-unused-state
      originalValue: value,
    };

    const { onChangeDebounceTime } = props.context;

    this.startEditing = this.startEditing.bind(this);
    this.stopEditing = this.stopEditing.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeNumber = this.handleChangeNumber.bind(this);
    this.handleChangeDropdown = this.handleChangeDropdown.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.format = this.format.bind(this);
    const propagateChange = this.propagateChange.bind(this);
    this.propagateChange = onChangeDebounceTime
      ? debounce(propagateChange, onChangeDebounceTime)
      : propagateChange;
    this.inputRef = React.createRef();
    this.cellRef = React.createRef();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.column.formula || nextProps.header) {
      const nextValue = nextProps.row[nextProps.column.key || nextProps.column];
      if (nextValue !== prevState.originalValue) {
        return {
          value: nextValue,
          originalValue: nextValue,
        };
      }
    }
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.render) return true;
    if (!isEqual(this.state, nextState)) {
      return true;
    }
    return (
      diff(this.props.selectProps, nextProps.selectProps) ||
      this.props.row !== nextProps.row ||
      this.props.selectedRowKey !== nextProps.selectedRowKey ||
      this.props.width !== nextProps.width
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const becameEditing = !prevState.editing && this.state.editing;

    if (becameEditing) {
      this.focus();
    }
  }

  getValue() {
    const { row, column, render, header } = this.props;
    if (render) return '';
    if (header) return this.state.value;
    return getValue(this.state.value, column, row);
  }

  getFormattedValue() {
    const { context, row, column } = this.props;
    const value = this.getValue();
    const type = getType(value, column);
    const format = getFormatter(context, type);
    return format(value, column, row);
  }

  getStyle() {
    if (this.state.editing) {
      return { width: this.state.width, maxWidth: this.state.width };
    }
    const { width } = this.props;
    return { width, minWidth: '2rem', maxWidth: width };
  }

  getModifiers() {
    const { editing } = this.state;
    const {
      context,
      row,
      column,
      edited,
      editable,
      disabled,
      header,
      selectedRowKey,
      clickable,
    } = this.props;
    const value = this.getValue();
    const type = getType(value, column);
    const selected = selectedRowKey && context.rowKeyField(row) === selectedRowKey;
    return {
      [type]: true,
      formula: !!column.formula,
      editable,
      editing,
      edited,
      disabled,
      header,
      selected,
      clickable,
      'with-icon': context.showError(value, column, row),
      ...context.modifiers(value, column, row),
    };
  }

  getId() {
    const { id, row, column, context } = this.props;
    return id ? `${id}__input` : `DatagridCell__input--${row[context.rowId]}--${column.key}`;
  }

  getSharedFieldProps() {
    const value = this.getValue();
    const { context } = this.props;
    return {
      ref: this.inputRef,
      id: this.getId(),
      label: 'edit cell',
      hideLabel: true,
      small: context.compact,
      value: value || '',
      onChange: this.handleChange,
      onBlur: this.handleBlur,
      onKeyDown: this.handleKeyDown,
      className: bemClass('DatagridCell__input', this.getModifiers()),
    };
  }

  format(value, column, row) {
    const { context } = this.props;
    const format = getFormattedValue(context);
    return format(value, column, row);
  }

  replaceRowValues(message) {
    if (typeof message !== 'string') return message;
    const { row, context } = this.props;

    return context.columns.reduce(
      (acc, col) =>
        acc.replace(
          new RegExp(`\\{${col.key}\\}`, 'g'),
          this.format(row[col.key || col], col, row)
        ),
      message
    );
  }

  startEditing() {
    const width = this.cellRef.current.offsetWidth;
    const { row, column, context } = this.props;
    const { onStartEditing } = context || {};
    if (onStartEditing && typeof onStartEditing === 'function') {
      onStartEditing(column, row);
    }

    this.setState({ editing: true, width });
  }
  stopEditing() {
    this.setState({ editing: false });
  }

  focus() {
    if (this.inputRef.current) this.inputRef.current.focus();
  }

  handleChange(e) {
    const { value } = e.target;
    this.setState({ value });
    this.propagateChange(value);
  }

  handleChangeDropdown(row) {
    const { key } = row;
    this.setState({ value: key });
    this.propagateChange(key);
  }

  handleChangeNumber(e, value) {
    this.setState({ value });
    this.propagateChange(value);
  }

  handleBlur(e) {
    this.stopEditing();
    const { value } = e.target;
    const { column, row, context } = this.props;
    if (context.onBlur) {
      const error = context.showError(value, column, row);
      context.onBlur(value, column, row, this.replaceRowValues(error));
    }
  }

  propagateChange(value) {
    const { column, row, context } = this.props;
    if (context.onChange) {
      const error = context.showError(value, column, row);
      context.onChange(value, column, row, this.replaceRowValues(error));
    }
  }

  handleKeyDown(e) {
    if (e.key === 'Escape' || e.key === 'Esc' || e.key === 'Enter') {
      this.stopEditing();
    }
  }

  renderDropdown() {
    const { column, header, context } = this.props;
    if (header || !column.cellDropdownItems || !column.cellDropdownItems.length) return null;
    return (
      <Dropdown
        id={this.getId()}
        items={column.cellDropdownItems}
        end
        onClick={item =>
          context.onClickCellDropdownItem(item, this.getValue(), this.props.row, this.props.column)
        }
        renderTrigger={onClick => <OptionsIcon onClick={onClick} />}
      />
    );
  }

  renderError() {
    const { column, row, context } = this.props;
    const value = this.getValue();
    const error =
      typeof context.showError === 'function' ? context.showError(value, column, row) : false;

    if (!error) return null;
    const warning =
      typeof context.isWarningError === 'function'
        ? context.isWarningError(value, column, row)
        : false;

    const tooltipContent = this.replaceRowValues(error);
    const icon = warning ? (
      <ExclamationTriangleIcon baseline className="DatagridCell__warning-icon" />
    ) : (
      <ExclamationCircleIcon baseline className="DatagridCell__error-icon" />
    );

    return <Tooltip content={tooltipContent}>{icon}</Tooltip>;
  }

  renderValue() {
    const { render, column, row, context } = this.props;
    if (render) {
      const formatter = column.formatter || IDENTITY;
      const format = x => formatter(x, column, row, context);
      return render(column, row, format);
    }
    const value = this.getValue();
    const type = getType(value, column);
    const renderer = context.renderers[type] || IDENTITY;
    if (type === 'error') {
      return renderer(value, column, row, context);
    }
    return renderer(this.getFormattedValue(), column, row, context);
  }

  renderInput() {
    const { column, row, context, editable, disabled, render, header, selectProps } = this.props;
    if (render) return null;
    const value = getValue(this.state.value, column, row);
    const type = getType(value, column);

    if ((!editable && type !== 'list') || header) return null;

    if (type === 'list') {
      const selectedValue = this.getValue();
      if (!editable || disabled) {
        const itemSelected = (selectProps.items || []).find(item => item.key === selectedValue);
        return (
          <div className="DatagridCell__content">{itemSelected ? itemSelected.title : ''}</div>
        );
      }
      return (
        <Fragment>
          <Dropdown
            id={this.getId()}
            selected={selectedValue}
            defaultLabel="Select"
            onClick={this.handleChangeDropdown}
            onOpen={() =>
              typeof context.handleStartEditing === 'function' &&
              context.handleStartEditing(column, row)
            }
            {...selectProps}
          />
        </Fragment>
      );
    }
    const inputType = getInputProps(type);
    if (inputType.type && inputType.type === 'number' && context.locale) {
      return (
        <InputNumber
          {...this.getSharedFieldProps()}
          onChange={this.handleChangeNumber}
          locale={context.locale}
          precision={column.precision}
        />
      );
    }
    return <TextField {...this.getSharedFieldProps()} {...inputType} />;
  }

  renderContent() {
    const { id, column, render, editable, disabled } = this.props;
    const value = this.getValue();
    const type = getType(value, column);
    const modifiers = this.getModifiers();

    const ContentComponent = editable ? 'button' : 'div';

    const content = type !== 'list' && (
      <ContentComponent
        id={editable && id ? `${id}__button` : undefined}
        ref={this.setContentNode}
        disabled={disabled}
        className={bemClass('DatagridCell__content', modifiers)}
        onClick={editable ? this.startEditing : undefined}
      >
        {this.renderValue()}
      </ContentComponent>
    );

    if (render) return content;

    return (
      <Fragment>
        {this.renderError()}
        {content}
        {this.renderInput()}
        {this.renderDropdown()}
      </Fragment>
    );
  }

  render() {
    const { aria, render } = this.props;
    const style = this.getStyle();
    const modifiers = this.getModifiers();

    return (
      <div
        title={render || modifiers.error ? undefined : this.getFormattedValue()}
        className={bemClass('DatagridCell', modifiers)}
        ref={this.cellRef}
        style={style}
        role="gridcell"
        aria-rowindex={aria.rowIndex}
        aria-colindex={aria.colIndex}
      >
        <div className="DatagridCell__container">{this.renderContent()}</div>
      </div>
    );
  }
}

DatagridCell.displayName = 'DatagridCell';

DatagridCell.defaultProps = {
  editable: false,
  edited: false,
  row: {},
  width: 150,
};

DatagridCell.propTypes = {
  id: PropTypes.string,
  column: PropTypes.shape({
    key: PropTypes.any.isRequired,
    title: PropTypes.any.isRequired,
    description: PropTypes.string,
    type: PropTypes.string,
    formula: PropTypes.string,
    formatter: PropTypes.func,
  }),
  row: PropTypes.object,
  rowIndex: PropTypes.number.isRequired,
  colIndex: PropTypes.number.isRequired,
  context: PropTypes.shape({
    onChangeDebounceTime: PropTypes.number,
    onChange: PropTypes.func,
    renderers: PropTypes.object,
    formatters: PropTypes.object,
    parsers: PropTypes.object,
    labels: PropTypes.shape({
      errorFormula: PropTypes.string,
    }),
    locale: PropTypes.string,
    onStartEditing: PropTypes.func,
    getSelectProps: PropTypes.func,
    onClickCellDropdownItem: PropTypes.func.isRequired,
  }),
  render: PropTypes.func,
  editable: PropTypes.bool,
  edited: PropTypes.bool,
  disabled: PropTypes.bool,
  header: PropTypes.bool,
  aria: PropTypes.shape({
    rowIndex: PropTypes.number.isRequired,
    colIndex: PropTypes.number.isRequired,
  }).isRequired,
  selectedRowKey: PropTypes.string,
  clickable: PropTypes.bool,
  selectProps: PropTypes.object,
  width: PropTypes.number,
};

export default DatagridCell;
