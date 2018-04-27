import React from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

import { bemClass } from '../helpers/bem';
import ChevronUpIcon from '../Icons/ChevronUp';
import ChevronDownIcon from '../Icons/ChevronDown';
import FilterIcon from '../Icons/Filter';
import CheckIcon from '../Icons/Check';
import ErrorIcon from '../Icons/Error';
import Avatar from '../Avatar';

import TableCell from './TableCell';
import './Table.scss';

const PARSERS = {};

const FORMATTERS = {
  date: (x, col, row, { locale }) =>
    DateTime.fromJSDate(x)
      .setLocale(locale)
      .toLocaleString(DateTime.DATE_SHORT),
  float: x =>
    typeof x === 'number'
      ? x.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : '',
  number: x =>
    typeof x === 'number'
      ? x.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })
      : '',
  integer: x =>
    typeof x === 'number'
      ? x.toLocaleString(undefined, {
          maximumFractionDigits: 0,
        })
      : '',
  int: x => FORMATTERS.integer(x),
};

const RENDERERS = {
  boolean: x => (x ? <CheckIcon className="Table__cell-centered-content" /> : null),
  bit: x => RENDERERS.boolean(x),
  image: (x, col, row, { comfortable, compact }) => (
    <Avatar small={compact} large={comfortable} src={x || ''} alt={col.title} />
  ),
  error: x => <ErrorIcon outline title={x.message} />,
};

const renderHeaderCell = p => col => {
  const style = col.width || col.width === 0 ? { width: col.width, maxWidth: col.width } : {};
  if (p.onSort) {
    const sorted = col.key === p.columnSorted || [1, -1].includes(col.sortDirection);
    const { filtered } = col;
    return (
      <th
        key={col.key}
        className={bemClass('Table__cell', {
          header: true,
          sortable: true,
          sorted,
          filtered,
        })}
        style={style}
      >
        <button
          className="Table__cell-button Table__cell-content Table__cell-content--header"
          onClick={() => p.onSort(col)}
          style={style}
          title={col.title}
        >
          {filtered ? <FilterIcon className="Table__filter-icon" /> : null}
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
      <div className="Table__cell-content Table__cell-content--header" title={col.title}>
        {col.title}
      </div>
    </th>
  );
};

const Table = props => {
  const { className, rows, rowId, comfortable, compact } = props;
  const columns = props.columns || Object.keys(rows[0]).map(key => ({ key, title: key }));
  const renderers = { ...RENDERERS, ...props.renderers };
  const parsers = { ...PARSERS, ...props.parsers };

  return (
    <div className={bemClass('Table', { comfortable, compact }, className)}>
      <table className="Table__table">
        <thead>
          <tr>{columns.map(renderHeaderCell(props))}</tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row[rowId]}>
              {columns.map(col => (
                <TableCell
                  key={col.key || col}
                  row={row}
                  column={col}
                  tableProps={props}
                  parsers={parsers}
                  renderers={renderers}
                  formatters={FORMATTERS}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.displayName = 'Table';

Table.defaultProps = {
  rowId: 'id',
  columnsSorted: [],
  editable: col => col.editable,
};

Table.propTypes = {
  // id: PropTypes.string.isRequired,
  className: PropTypes.string,
  rowId: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.any.isRequired,
      title: PropTypes.any.isRequired,
      description: PropTypes.string,
      type: PropTypes.string,
      width: PropTypes.number,
      formula: PropTypes.string,
    })
  ),
  rows: PropTypes.array.isRequired,
  comfortable: PropTypes.bool,
  compact: PropTypes.bool,
  renderers: PropTypes.object,
  parsers: PropTypes.object,
  // editable: PropTypes.func,
  // onChangeDebounceTime: PropTypes.number,
};

export default Table;
