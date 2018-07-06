import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import mathEvaluator from 'math-expression-evaluator';
import debounce from 'lodash.debounce';

import ExclamationCircleIcon from '../Icons/ExclamationCircle';
import ExclamationTriangleIcon from '../Icons/ExclamationTriangle';
import TextField from '../Form/TextField';
import Tooltip from '../Tooltip';

import { bemClass } from '../helpers/bem';

import './Table.scss';

const IDENTITY = x => x;

const evaluateFormula = (formula, row, errorLabel) => {
  const expression = Object.entries(row).reduce(
    (acc, [key, value]) => acc.replace(new RegExp(`\\[${key}\\]`, 'g'), value || 0),
    formula
  );

  try {
    const res = mathEvaluator.eval(expression);
    if (!Number.isFinite(res) || Number.isNaN(res)) return new Error(errorLabel);
    return res;
  } catch (e) {
    return new Error(errorLabel);
  }
};

const getValue = (value, column, row, labels) =>
  column.formula ? evaluateFormula(column.formula, row, labels.errorFormula) : value;
const getType = (value, column) => (value instanceof Error ? 'error' : column.type || typeof value);

const getFormattedValue = (formatters, parsers, tableProps, labels) => (value, column, row) => {
  const val = getValue(value, column, row, labels);
  const type = getType(val, column);
  const parser = parsers[type] || IDENTITY;
  const formatter = column.formatter || formatters[type] || IDENTITY;
  const args = [column, row, tableProps];

  return formatter(parser(val, ...args), ...args);
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

class TableCell extends React.Component {
  constructor(props) {
    super(props);

    const value = props.row[props.column.key || props.column];

    this.state = {
      editing: false,
      width: 150,
      value,
      // eslint-disable-next-line react/no-unused-state
      originalValue: value,
    };

    const { onChangeDebounceTime } = props.tableProps;

    this.startEditing = this.startEditing.bind(this);
    this.stopEditing = this.stopEditing.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    if (!nextProps.column.formula) {
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

  componentDidUpdate(prevProps, prevState) {
    const becameEditing = !prevState.editing && this.state.editing;

    if (becameEditing) {
      this.focus();
    }
  }

  getValue() {
    const { row, column } = this.props;
    return getValue(this.state.value, column, row, this.labels);
  }

  getStyle() {
    const { column } = this.props;
    if (this.state.editing) {
      return { width: this.state.width, maxWidth: this.state.width };
    }
    if (column.width || column.width === 0) {
      return { width: column.width, maxWidth: column.width };
    }
    return {};
  }

  getModifiers() {
    const { editing } = this.state;
    const { tableProps, row, column, edited, frozen, editable } = this.props;

    const value = this.getValue();
    const type = getType(value, column);

    return {
      [type]: true,
      formula: !!column.formula,
      editable,
      editing,
      frozen,
      edited,
      'with-icon': tableProps.showError(value, column, row),
      ...tableProps.modifiers(value, column, row),
    };
  }

  format(value, column, row) {
    const { formatters, parsers, tableProps } = this.props;
    const format = getFormattedValue(formatters, parsers, tableProps, this.labels);
    return format(value, column, row);
  }

  replaceRowValues(message) {
    if (typeof message !== 'string') return message;
    const { row, tableProps } = this.props;

    return tableProps.columns.reduce(
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
    this.setState({ editing: true, width });
  }
  stopEditing() {
    this.setState({ editing: false });
  }

  focus() {
    this.inputRef.current.focus();
  }

  handleChange(e) {
    const { value } = e.target;
    this.setState({ value });
    this.propagateChange(value);
  }

  handleBlur(e) {
    this.stopEditing();
    const { value } = e.target;
    const { column, row, tableProps } = this.props;
    if (tableProps.onBlur) {
      const error = tableProps.showError(value, column, row);
      tableProps.onBlur(value, column, row, this.replaceRowValues(error));
    }
  }

  propagateChange(value) {
    const { column, row, tableProps } = this.props;
    if (tableProps.onChange) {
      const error = tableProps.showError(value, column, row);
      tableProps.onChange(value, column, row, this.replaceRowValues(error));
    }
  }

  handleKeyDown(e) {
    if (e.key === 'Escape' || e.key === 'Esc' || e.key === 'Enter') {
      this.stopEditing();
    }
  }

  renderContent() {
    const { editing } = this.state;
    const {
      id,
      renderers,
      tableProps,
      row,
      column,
      edited,
      frozen,
      editable,
      rowIndex,
      columnIndex,
    } = this.props;

    const value = this.getValue();
    const type = getType(value, column);

    const modifiers = {
      [type]: true,
      formula: !!column.formula,
      editable,
      editing,
      frozen,
      edited,
      ...tableProps.modifiers(value, column, row),
    };

    const renderer = renderers[type] || IDENTITY;
    const ContentComponent = editable ? 'button' : 'div';
    const content = (
      <ContentComponent
        id={editable && id ? `${id}__button` : undefined}
        ref={this.setContentNode}
        className={bemClass('Table__cell-content', modifiers)}
        onClick={editable ? this.startEditing : undefined}
      >
        {renderer(this.format(this.state.value, column, row), column, row, tableProps)}
      </ContentComponent>
    );

    const error =
      typeof tableProps.showError === 'function' ? tableProps.showError(value, column, row) : false;
    if (!error) return content;
    const warning =
      typeof tableProps.isWarningError === 'function'
        ? tableProps.isWarningError(value, column, row)
        : false;

    const icon = warning ? (
      <ExclamationTriangleIcon baseline className="Table__cell-warning-icon" />
    ) : (
      <ExclamationCircleIcon baseline className="Table__cell-error-icon" />
    );
    const lastRow = rowIndex === tableProps.rows.length - 1;
    const firstCell = columnIndex === 0;
    const lastCell = columnIndex === tableProps.columns.length - 1;
    const tooltipContent = this.replaceRowValues(error);
    const isMedium = tooltipContent.length > 35;
    const errorElement =
      typeof error === 'string' ? (
        <Tooltip
          content={tooltipContent}
          medium={isMedium}
          error={!warning}
          warning={warning}
          top={lastRow && !firstCell && !lastCell}
          left={lastCell}
          right={firstCell}
        >
          {icon}
        </Tooltip>
      ) : (
        icon
      );
    return (
      <Fragment>
        {errorElement}
        {content}
      </Fragment>
    );
  }

  render() {
    const { id, column, row, tableProps, formatters, frozen, render, editable } = this.props;
    const key = column.key || column;
    const value = getValue(this.state.value, column, row, this.labels);
    const type = getType(value, column);

    const style = this.getStyle();
    if (render) {
      const formatter = column.formatter || formatters[type] || IDENTITY;
      const format = x => formatter(x, column, row, tableProps);

      return (
        <td
          title={this.getValue()}
          className={bemClass('Table__cell', {
            first: true,
            [type]: true,
            frozen,
            ...tableProps.modifiers(value, column, row),
          })}
          ref={this.cellRef}
          style={style}
        >
          <div
            className={bemClass('Table__cell-content', { first: true, [type]: true })}
            ref={this.setContentNode}
          >
            <div className="Table__cell-value">{render(column, row, format)}</div>
          </div>
        </td>
      );
    }

    const modifiers = this.getModifiers();

    return (
      <td
        title={this.getValue()}
        className={bemClass('Table__cell', modifiers)}
        ref={this.cellRef}
        style={style}
      >
        <div className="Table__cell-container">
          {this.renderContent()}
          {editable && (
            <TextField
              ref={this.inputRef}
              label="edit cell"
              hideLabel
              small={tableProps.compact}
              id={id ? `${id}__input` : `Table__cell-input--${row[tableProps.rowId]}--${key}`}
              className={bemClass('Table__cell-input', modifiers)}
              style={{ width: (column.width || this.state.width) - 6 }}
              value={value || ''}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              onKeyDown={this.handleKeyDown}
              {...getInputProps(type)}
            />
          )}
        </div>
      </td>
    );
  }
}

TableCell.displayName = 'TableCell';

TableCell.defaultProps = {
  editable: false,
  edited: false,
};

TableCell.propTypes = {
  id: PropTypes.string,
  column: PropTypes.shape({
    key: PropTypes.any.isRequired,
    title: PropTypes.any.isRequired,
    description: PropTypes.string,
    type: PropTypes.string,
    width: PropTypes.number,
    formula: PropTypes.string,
  }),
  row: PropTypes.object,
  tableProps: PropTypes.shape({
    onChangeDebounceTime: PropTypes.number,
    onChange: PropTypes.func,
  }),
  renderers: PropTypes.object,
  formatters: PropTypes.object,
  parsers: PropTypes.object,
  locale: PropTypes.string,
  frozen: PropTypes.bool,
  render: PropTypes.func,
  editable: PropTypes.bool,
  edited: PropTypes.bool,
  labels: PropTypes.shape({
    errorFormula: PropTypes.string,
  }),
  rowIndex: PropTypes.number.isRequired,
  columnIndex: PropTypes.number.isRequired,
};

export default TableCell;
