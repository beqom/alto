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
    x instanceof Date
      ? DateTime.fromJSDate(x)
          .setLocale(locale)
          .toLocaleString(DateTime.DATE_SHORT)
      : x,
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

const renderGroupedRow = (text, colspan, key) => (
  <tr key={`${key}-grouped`}>
    <td className="Table__cell Table__cell--grouped Table__cell--frozen">
      <div className="Table__cell-content">{text}</div>
    </td>
    <td className="Table__cell Table__cell--grouped" colSpan={colspan - 1} />
  </tr>
);

const renderHeaderCell = p => (col, colIndex) => {
  const style = col.width || col.width === 0 ? { width: col.width, maxWidth: col.width } : {};
  const frozen = colIndex === 0 && p.isFirstColumnFrozen;
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
          frozen,
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
        frozen,
      })}
    >
      <div className="Table__cell-content Table__cell-content--header" title={col.title}>
        {col.title}
      </div>
    </th>
  );
};

const Table = props => {
  const {
    className,
    rows,
    rowId,
    comfortable,
    compact,
    isFirstColumnFrozen,
    renderSummaryCell,
    groupedByColumnId,
    edited,
    editable,
  } = props;
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
          {renderSummaryCell && (
            <tr>
              {columns.map((col, colIndex) => (
                <TableCell
                  key={col.key || col}
                  row={{}}
                  column={col}
                  tableProps={props}
                  parsers={parsers}
                  renderers={renderers}
                  formatters={FORMATTERS}
                  frozen={colIndex === 0 && isFirstColumnFrozen}
                  render={renderSummaryCell}
                />
              ))}
            </tr>
          )}
          {rows.reduce((acc, row, index, arr) => {
            const groupedRow =
              groupedByColumnId &&
              (!index || row[groupedByColumnId] !== arr[index - 1][groupedByColumnId])
                ? renderGroupedRow(row[groupedByColumnId], columns.length, row[rowId])
                : [];

            return acc.concat(
              [groupedRow],
              [
                <tr key={row[rowId]}>
                  {columns.map((col, colIndex) => (
                    <TableCell
                      key={col.key || col}
                      row={row}
                      column={col}
                      tableProps={props}
                      parsers={parsers}
                      renderers={renderers}
                      formatters={FORMATTERS}
                      frozen={colIndex === 0 && isFirstColumnFrozen}
                      editable={editable(col, row) && !col.formula}
                      edited={edited(col, row, colIndex, index)}
                    />
                  ))}
                </tr>,
              ]
            );
          }, [])}
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
  edited: () => false,
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
  isFirstColumnFrozen: PropTypes.bool,
  renderSummaryCell: PropTypes.func,
  groupedByColumnId: PropTypes.string,
  // editable: PropTypes.func,
  editable: PropTypes.func,
  edited: PropTypes.func,
  // onChangeDebounceTime: PropTypes.number,
};

export default Table;
