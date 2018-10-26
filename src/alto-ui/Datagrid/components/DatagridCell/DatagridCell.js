import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';

import ExclamationCircleIcon from '../../../Icons/ExclamationCircle';
import ExclamationTriangleIcon from '../../../Icons/ExclamationTriangle';
import TextField from '../../../Form/TextField';
import InputNumber from '../../../Form/InputNumber';
import Select from '../../../Form/Select';
import Spinner from '../../../Spinner';

import { evaluateFormula } from '../../../helpers/formula';
import { bemClass } from '../../../helpers/bem';

import './DatagridCell.scss';

const IDENTITY = x => x;

const getValue = (value, column, row, labels) =>
  column.formula ? evaluateFormula(column.formula, row, labels.errorFormula) : value;
const getType = (value, column) => (value instanceof Error ? 'error' : column.type || typeof value);

const getFormatter = (context, type) => (value, column, row) => {
  const parser = context.parsers[type] || IDENTITY;
  const formatter = column.formatter || context.formatters[type] || IDENTITY;
  const args = [column, row, context];

  return formatter(parser(value, ...args), ...args);
};

const getFormattedValue = context => (value, column, row) => {
  const val = getValue(value, column, row, context.labels);
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

class DatagridCell extends React.Component {
  constructor(props) {
    super(props);

    const value = props.row[props.column.key];
    this.state = {
      editing: false,
      width: 150,
      value,
      // eslint-disable-next-line react/no-unused-state
      originalValue: value,
    };

    const { onChangeDebounceTime } = props.context;

    this.startEditing = this.startEditing.bind(this);
    this.stopEditing = this.stopEditing.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeNumber = this.handleChangeNumber.bind(this);
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
    return this.props.row !== nextProps.row;
  }

  componentDidUpdate(prevProps, prevState) {
    const becameEditing = !prevState.editing && this.state.editing;

    if (becameEditing) {
      this.focus();
    }
  }

  getValue() {
    const { row, column, context, render, header } = this.props;
    if (render) return '';
    if (header) return this.state.value;
    return getValue(this.state.value, column, row, context.labels);
  }

  getFormattedValue() {
    const { context, row, column } = this.props;
    const value = this.getValue();
    const type = getType(value, column);
    const format = getFormatter(context, type);
    return format(value, column, row);
  }

  getStyle() {
    const { column } = this.props;
    if (this.state.editing) {
      return { width: this.state.width, maxWidth: this.state.width };
    }
    const { width } = column;
    if (width || width === 0) {
      return { width, minWidth: '2rem', maxWidth: width };
    }
    return {};
  }

  getModifiers() {
    const { editing } = this.state;
    const { context, row, column, edited, editable, header } = this.props;

    const value = this.getValue();
    const type = getType(value, column);

    return {
      [type]: true,
      formula: !!column.formula,
      editable,
      editing,
      edited,
      header,
      'with-icon': context.showError(value, column, row),
      ...context.modifiers(value, column, row),
    };
  }

  getSharedFieldProps() {
    const value = this.getValue();
    const { id, context, row, column } = this.props;
    return {
      ref: this.inputRef,
      id: id ? `${id}__input` : `DatagridCell__input--${row[context.rowId]}--${column.key}`,
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
    return renderer(this.getFormattedValue(), column, row, context);
  }

  renderContent() {
    const { id, context, row, column, editable, render } = this.props;
    const value = this.getValue();
    const type = getType(value, column);
    const modifiers = this.getModifiers();

    const ContentComponent = editable ? 'button' : 'div';

    const content = type !== 'list' && (
      <ContentComponent
        id={editable && id ? `${id}__button` : undefined}
        ref={this.setContentNode}
        className={bemClass('DatagridCell__content', modifiers)}
        onClick={editable ? this.startEditing : undefined}
      >
        {this.renderValue()}
      </ContentComponent>
    );

    if (render) return content;
    const error =
      typeof context.showError === 'function' ? context.showError(value, column, row) : false;

    if (!error) return content;
    const warning =
      typeof context.isWarningError === 'function'
        ? context.isWarningError(value, column, row)
        : false;

    const tooltipContent = this.replaceRowValues(error);
    const icon = warning ? (
      <ExclamationTriangleIcon
        title={tooltipContent}
        baseline
        className="DatagridCell__warning-icon"
      />
    ) : (
      <ExclamationCircleIcon title={tooltipContent} baseline className="DatagridCell__error-icon" />
    );
    return (
      <Fragment>
        {icon}
        {content}
      </Fragment>
    );
  }

  renderInput() {
    const { column, row, context, editable, render, header } = this.props;
    if (render) return null;
    const value = getValue(this.state.value, column, row, context.labels);
    const type = getType(value, column);

    if ((!editable && type !== 'list') || header) return null;

    if (type === 'list') {
      const { fetching, ...selectProps } = context.getSelectProps(column, row) || {};
      return (
        <Fragment>
          <Select
            onFocus={this.startEditing}
            {...this.getSharedFieldProps()}
            {...selectProps}
            readonly={!editable}
          />
          {fetching && <Spinner className="DatagridCell__spinner" small />}
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

  render() {
    const { aria, render } = this.props;
    const style = this.getStyle();
    const modifiers = this.getModifiers();

    return (
      <div
        title={render ? undefined : this.getFormattedValue()}
        className={bemClass('DatagridCell', modifiers)}
        ref={this.cellRef}
        style={style}
        role="gridcell"
        aria-rowindex={aria.rowIndex}
        aria-colindex={aria.colIndex}
      >
        <div className="DatagridCell__container">
          {this.renderContent()}
          {this.renderInput()}
        </div>
      </div>
    );
  }
}

DatagridCell.displayName = 'DatagridCell';

DatagridCell.defaultProps = {
  editable: false,
  edited: false,
  row: {},
};

DatagridCell.propTypes = {
  id: PropTypes.string,
  column: PropTypes.shape({
    key: PropTypes.any.isRequired,
    title: PropTypes.any.isRequired,
    description: PropTypes.string,
    type: PropTypes.string,
    width: PropTypes.number,
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
  }),
  render: PropTypes.func,
  editable: PropTypes.bool,
  edited: PropTypes.bool,
  header: PropTypes.bool,
  aria: PropTypes.shape({
    rowIndex: PropTypes.number.isRequired,
    colIndex: PropTypes.number.isRequired,
  }).isRequired,
};

export default DatagridCell;
