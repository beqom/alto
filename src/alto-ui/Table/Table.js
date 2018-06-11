import React from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

import { bemClass } from '../helpers/bem';
import ChevronDownIcon from '../Icons/ChevronDown';
import CheckIcon from '../Icons/Check';
import ErrorIcon from '../Icons/Error';
import Avatar from '../Avatar';
import TableCell from './TableCell';
import TableHeader from './TableHeader';

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

const renderGroupedRow = (tableProps, columns, row, renderCells) => {
  const {
    rowId,
    groupedByColumnId,
    handleClickOnGroup,
    collapsedGroups,
    renderSummaryGroupCell,
  } = tableProps;
  const isCollapsed = collapsedGroups[row[groupedByColumnId]];

  return (
    <tr key={`${row[rowId]}-grouped`}>
      <td className="Table__cell Table__cell--grouped Table__cell--frozen">
        <button
          id={rowId || null}
          className="Table__cell-content Table__cell-content--grouped"
          onClick={() => handleClickOnGroup(row[groupedByColumnId])}
        >
          <ChevronDownIcon
            className={bemClass('Table__cell-content-icon', { collapsed: isCollapsed })}
          />
          {row[groupedByColumnId]}
        </button>
      </td>
      {renderCells(columns, row, null, renderSummaryGroupCell).slice(1)}
    </tr>
  );
};

const renderTableCell = tableProps => {
  const renderers = { ...RENDERERS, ...tableProps.renderers };
  const parsers = { ...PARSERS, ...tableProps.parsers };
  const formatters = { ...FORMATTERS, ...tableProps.formatters };

  const { isFirstColumnFrozen, editable, edited } = tableProps;

  return (columns, row, rowIndex, render) =>
    columns.map((col, colIndex) => {
      const isEditable = !render && editable(col, row) && !col.formula;
      const editedFunc = render ? null : edited(col, row, colIndex, rowIndex);

      return (
        <TableCell
          key={col.key || col}
          row={row}
          column={col}
          tableProps={tableProps}
          parsers={parsers}
          renderers={renderers}
          formatters={formatters}
          frozen={colIndex === 0 && isFirstColumnFrozen}
          render={render}
          editable={isEditable}
          edited={editedFunc}
          rowIndex={rowIndex || 0}
          columnIndex={colIndex}
          namespace={tableProps.className}
        />
      );
    });
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
    collapsedGroups,
    columnSorted,
    sortDirection,
    onSort,
  } = props;
  const columns = props.columns || Object.keys(rows[0]).map(key => ({ key, title: key }));
  const renderCells = renderTableCell(props);
  return (
    <div className={bemClass('Table', { comfortable, compact }, className)}>
      <table className="Table__table">
        <TableHeader
          isFirstColumnFrozen={isFirstColumnFrozen}
          onSort={onSort}
          columnSorted={columnSorted}
          sortDirection={sortDirection}
          columns={columns}
          namespace={className}
        />
        <tbody>
          {renderSummaryCell && <tr>{renderCells(columns, {}, null, renderSummaryCell)}</tr>}
          {rows.reduce((acc, row, rowIndex, arr) => {
            const isFirstRow = !rowIndex;
            const isPrecededByDifferentGroup =
              isFirstRow || row[groupedByColumnId] !== arr[rowIndex - 1][groupedByColumnId];
            const groupedRow =
              groupedByColumnId && isPrecededByDifferentGroup
                ? renderGroupedRow(props, columns, row, renderCells)
                : [];

            return acc.concat(
              [groupedRow],
              [
                <tr
                  key={row[rowId]}
                  className={bemClass('Table__row', {
                    collapsed: collapsedGroups[row[groupedByColumnId]],
                  })}
                >
                  {renderCells(columns, row, rowIndex)}
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
  modifiers: () => {},
  showError: () => false,
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
  isFirstColumnFrozen: PropTypes.bool,
  renderSummaryCell: PropTypes.func,
  groupedByColumnId: PropTypes.string,
  collapsedGroups: PropTypes.object,
  columnSorted: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.any.isRequired,
      title: PropTypes.any.isRequired,
      description: PropTypes.string,
      type: PropTypes.string,
      width: PropTypes.number,
      formula: PropTypes.string,
    })
  ),
  sortDirection: PropTypes.number,
  onSort: PropTypes.func,
};

export default Table;
