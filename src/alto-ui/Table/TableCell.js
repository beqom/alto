import React from 'react';
import PropTypes from 'prop-types';
import mathEvaluator from 'math-expression-evaluator';
import debounce from 'lodash.debounce';

import TextField from '../Form/TextField';

import { bemClass } from '../helpers/bem';

import './Table.scss';

const IDENTITY = x => x;
const ERROR_MESSAGE = 'There is an error in formula';

const evaluateFormula = (formula, row, errorLabel) => {
  const expression = Object.entries(row).reduce(
    (acc, [key, value]) => acc.replace(new RegExp(`\\[${key}\\]`, 'g'), value),
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

const getCellInput = () => TextField;

const getInputProps = type => {
  switch (type) {
    case 'number':
    case 'float':
    case 'int':
    case 'integer':
      return {
        type: 'number',
      };
    default:
      return {};
  }
};

class TableCell extends React.Component {
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
    this.handleKeyDown = this.handleKeyDown.bind(this);
    const propagateChange = this.propagateChange.bind(this);
    this.propagateChange = onChangeDebounceTime
      ? debounce(propagateChange, onChangeDebounceTime)
      : propagateChange;
    this.inputRef = React.createRef();
    this.cellRef = React.createRef();
    this.labels = { errorFormula: ERROR_MESSAGE, ...props.labels };
  }

  componentDidUpdate(prevProps, prevState) {
    const becameEditing = !prevState.editing && this.state.editing;
    // const becameNotEditing = prevState.editing && !this.state.editing;

    if (becameEditing) {
      this.focus();
    }
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

  propagateChange(value) {
    const { column, row, tableProps } = this.props;
    if (tableProps.onChange) {
      tableProps.onChange(value, column, row);
    }
  }

  handleKeyDown(e) {
    if (e.key === 'Escape' || e.key === 'Enter') {
      this.stopEditing();
    }
  }

  render() {
    const {
      column,
      row,
      tableProps,
      renderers,
      formatters,
      parsers,
      frozen,
      render,
      editable,
      edited,
    } = this.props;
    const value = column.formula
      ? evaluateFormula(column.formula, row, this.labels.errorFormula)
      : this.state.value;
    const key = column.key || column;
    const type = value instanceof Error ? 'error' : column.type || typeof value;

    const style = this.getStyle();
    const { editing } = this.state;
    const Input = getCellInput(type);
    const renderer = renderers[type] || IDENTITY;
    const parser = parsers[type] || IDENTITY;
    const formatter = column.formatter || formatters[type] || IDENTITY;
    const args = [column, row, tableProps];
    if (render) {
      const format = x => formatter(x, ...args);

      return (
        <td
          className={bemClass('Table__cell', { first: true, [type]: true, frozen })}
          ref={this.cellRef}
          style={style}
        >
          <div
            className={bemClass('Table__cell-content', { first: true, [type]: true })}
            ref={this.setContentNode}
          >
            {render(column, row, format, parser)}
          </div>
        </td>
      );
    }
    const modifiers = {
      [type]: true,
      formula: !!column.formula,
      editable,
      editing,
      frozen,
      edited,
    };

    const contentProps = {
      ref: this.setContentNode,
      className: bemClass('Table__cell-content', modifiers),
      children: renderer(formatter(parser(value, ...args), ...args), ...args),
    };

    return (
      <td className={bemClass('Table__cell', modifiers)} ref={this.cellRef} style={style}>
        {editable ? (
          <button {...contentProps} onClick={this.startEditing} />
        ) : (
          <div {...contentProps} />
        )}
        {editable && (
          <Input
            ref={this.inputRef}
            label="edit cell"
            hideLabel
            small={tableProps.compact}
            id={`Table--${tableProps.id}__cell-input--${row[tableProps.rowId]}--${key}`}
            className={bemClass('Table__cell-input', modifiers)}
            onBlur={this.stopEditing}
            style={{ width: (column.width || this.state.width) - 6 }}
            value={value || ''}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            {...getInputProps(type)}
          />
        )}
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
};

export default TableCell;
