import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import CheckIcon from '../Icons/Check';
import ChevronUpIcon from '../Icons/ChevronUp';
import ChevronDownIcon from '../Icons/ChevronDown';
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
  const style = col.width || col.width === 0 ? { width: col.width, maxWidth: col.width } : {};

  return (
    <td
      key={key}
      className={bemClass('Table__cell', {
        [type]: true,
      })}
      style={style}
    >
      <div className="Table__cell-content" style={style}>
        {renderer(formatter(value, col, props), col, props)}
      </div>
    </td>
  );
};

const renderHeaderCell = p => col => {
  const style = col.width || col.width === 0 ? { width: col.width, maxWidth: col.width } : {};
  if (p.onSort) {
    const sorted = col.key === p.columnSorted || [1, -1].includes(col.sortDirection);
    return (
      <th
        key={col.key}
        className={bemClass('Table__cell', {
          header: true,
          sortable: true,
          sorted,
        })}
        style={style}
      >
        <button
          className="Table__cell-button Table__cell-content Table__cell-content--header"
          onClick={() => p.onSort(col)}
          style={style}
        >
          <span className="Table__header-cell-title">{col.title}</span>
          <div className="Table__header-cell-sortable-icons">
            <div
              className={bemClass('Table__header-cell-sortable-icon', {
                active: (sorted && p.sortDirection === 1) || col.sortDirection === 1,
              })}
            >
              <ChevronUpIcon />
            </div>
            <div
              className={bemClass('Table__header-cell-sortable-icon', {
                active: (sorted && p.sortDirection === -1) || col.sortDirection === -1,
              })}
            >
              <ChevronDownIcon />
            </div>
          </div>
        </button>
      </th>
    );
  }

  return (
    <th
      key={col.key}
      style={style}
      className={bemClass('Table__cell', {
        header: true,
      })}
    >
      <div className="Table__cell-content Table__cell-content--header">{col.title}</div>
    </th>
  );
};

const Table = props => {
  const { className, rows, rowId, wide, compact } = props;
  const columns = props.columns || Object.keys(rows[0]).map(key => ({ key, title: key }));
  return (
    <div className={bemClass('Table', { wide, compact }, className)}>
      <table className="Table__table">
        <thead>
          <tr>{columns.map(renderHeaderCell(props))}</tr>
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
  columnsSorted: [],
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
