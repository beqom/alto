import React from 'react';
import PropTypes from 'prop-types';

import { format } from 'date-fns';
import mathEvaluator from 'math-expression-evaluator';

import CheckIcon from '../Icons/Check';
import ErrorIcon from '../Icons/Error';
import Avatar from '../Avatar';

import { bemClass } from '../helpers/bem';

import './Table.scss';

const IDENTITY = x => x;

const FORMATTERS = {
  date: x => format(new Date(x), 'D MMM YYYY'),
  datetime: x => FORMATTERS.date(x),
  number: x => Math.round(x * 100) / 100,
};

const RENDERERS = {
  boolean: x => (x ? <CheckIcon className="Table__cell-centered-content" /> : null),
  bit: x => RENDERERS.boolean(x),
  image: (x, col, row, { comfortable, compact }) => (
    <Avatar small={compact} large={comfortable} src={x || ''} alt={col.title} />
  ),
  error: x => <ErrorIcon outline title={x.message} />,
};

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

const TableCell = ({ column, row, tableProps }) => {
  const key = column.key || column;
  const value = column.formula ? evaluateFormula(column.formula, row) : row[key];
  const type = value instanceof Error ? 'error' : column.type || typeof value;
  const renderers = { ...RENDERERS, ...tableProps.renderers };
  const renderer = renderers[type] || IDENTITY;
  const formatter = FORMATTERS[type] || IDENTITY;
  const style =
    column.width || column.width === 0 ? { width: column.width, maxWidth: column.width } : {};
  return (
    <td
      key={key}
      className={bemClass('Table__cell', {
        [type]: true,
        formula: !!column.formula,
      })}
      style={style}
    >
      <div
        className={bemClass('Table__cell-content', {
          [type]: true,
          formula: !!column.formula,
        })}
        style={style}
      >
        {renderer(formatter(value, column, tableProps), column, row, tableProps)}
      </div>
    </td>
  );
};

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
};

export default TableCell;
