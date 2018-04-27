import React from 'react';
import PropTypes from 'prop-types';
import mathEvaluator from 'math-expression-evaluator';

import TextField from '../Form/TextField';

import { bemClass } from '../helpers/bem';

import './Table.scss';

const IDENTITY = x => x;

const evaluateFormula = (formula, row) => {
  const expression = Object.entries(row).reduce(
    (acc, [key, value]) => acc.replace(new RegExp(`\\[${key}\\]`, 'g'), value),
    formula
  );

  try {
    return mathEvaluator.eval(expression);
  } catch (e) {
    return new Error(e.message);
  }
};

const getCellInput = () => TextField;

class TableCell extends React.Component {
  constructor() {
    super();

    this.state = {
      editing: false,
      width: 150,
    };

    this.startEditing = this.startEditing.bind(this);
    this.stopEditing = this.stopEditing.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.inputRef = React.createRef();
    this.cellRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    const becameEditing = !prevState.editing && this.state.editing;
    // const becameNotEditing = prevState.editing && !this.state.editing;

    if (becameEditing) {
      this.focus();
    }
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
    const { column, row, tableProps } = this.props;

    if (tableProps.onChange) {
      tableProps.onChange(e.target.value, column, row);
    }
  }

  handleKeyDown(e) {
    if (e.key === 'Escape' || e.key === 'Enter') {
      this.stopEditing();
    }
  }

  render() {
    const { column, row, tableProps, renderers, formatters, parsers } = this.props;
    const key = column.key || column;
    const value = column.formula ? evaluateFormula(column.formula, row) : row[key];
    const type = value instanceof Error ? 'error' : column.type || typeof value;

    const style =
      column.width || column.width === 0 ? { width: column.width, maxWidth: column.width } : {};
    const editable = tableProps.editable(column, row) && !column.formula;
    const { editing } = this.state;
    const Input = getCellInput(type);
    const renderer = renderers[type] || IDENTITY;
    const parser = parsers[type] || IDENTITY;
    const formatter = formatters[type] || IDENTITY;
    const modifiers = {
      [type]: true,
      formula: !!column.formula,
      editable,
      editing,
    };
    const args = [column, row, tableProps];
    const contentProps = {
      ref: this.setContentNode,
      className: bemClass('Table__cell-content', modifiers),
      style,
      children: renderer(formatter(parser(value, ...args), ...args), ...args),
    };
    return (
      <td className={bemClass('Table__cell', modifiers)} ref={this.cellRef}>
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
          />
        )}
      </td>
    );
  }
}

TableCell.displayName = 'TableCell';

TableCell.defaultProps = {};

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
  tableProps: PropTypes.object,
  renderers: PropTypes.object,
  formatters: PropTypes.object,
  parsers: PropTypes.object,
  locale: PropTypes.string,
};

export default TableCell;
