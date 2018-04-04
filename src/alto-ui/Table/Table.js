import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import CheckIcon from '../Icons/Check';
import Avatar from '../Avatar';
import { bemClass } from '../helpers/bem';

import './Table.scss';

const IDENTITY = x => x;

const FORMATTERS = {
  date: x => format(new Date(x), 'D MMM YYYY'),
  datetime: x => FORMATTERS.date(x),
};

const RENDERERS = {
  boolean: x => (x ? <CheckIcon className="Table__cell-centered-content" /> : null),
  bit: x => RENDERERS.boolean(x),
  image: (x, col, { wide, compact }) => (
    <Avatar small={compact} large={wide} src={x || ''} alt={col.title} />
  ),
};

const renderCell = (row, props) => col => {
  const key = col.key || col;
  const value = row[key];
  const type = col.type || typeof value;
  const renderer = RENDERERS[type] || IDENTITY;
  const formatter = FORMATTERS[type] || IDENTITY;
  return (
    <td
      key={key}
      className={bemClass('Table__cell', {
        [type]: true,
      })}
    >
      {renderer(formatter(value, col, props), col, props)}
    </td>
  );
};

const Table = props => {
  const { className, rows, rowId, wide, compact } = props;
  const columns = props.columns || Object.keys(rows[0]).map(key => ({ key, title: key }));
  return (
    <div className={bemClass('Table', { wide, compact }, className)}>
      <table className="Table__table">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} className="Table__cell Table__cell--header">
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => <tr key={row[rowId]}>{columns.map(renderCell(row, props))}</tr>)}
        </tbody>
      </table>
    </div>
  );
};

Table.displayName = 'Table';

Table.defaultProps = {
  rowId: 'id',
};

Table.propTypes = {
  className: PropTypes.string,
  rowId: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.any.isRequired,
      title: PropTypes.any.isRequired,
      description: PropTypes.string,
      type: PropTypes.string,
    })
  ),
  rows: PropTypes.array.isRequired,
  wide: PropTypes.bool,
  compact: PropTypes.bool,
};

export default Table;
