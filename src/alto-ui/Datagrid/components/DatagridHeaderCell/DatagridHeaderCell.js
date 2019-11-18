/* eslint-disable jsx-a11y/aria-role */
import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

import DataGridHeaderCellContent from './DatagridHeaderCellContent';

import { bemClass } from '../../../helpers/bem';

import './DatagridHeaderCell.scss';

const DatagridHeaderCell = ({
  column,
  context: {
    wrapHeader,
    columnSorted,
    onSort,
    onMouseEnterResizeHandle,
    sortDirection,
    id,
    labels,
  },
  rowIndex,
  colIndex,
  last,
  width,
  firstCellInRow,
  lastCellInRow,
  firstRow,
}) => {
  const wrapped = wrapHeader;
  const style = {
    width,
    minWidth: column.editable ? '4.625rem' : '2rem',
    maxWidth: width,
  };

  const sorted = column.key === columnSorted || [1, -1].includes(column.sortDirection);

  const handleMouseEnterResizeHandle = e => {
    onMouseEnterResizeHandle(e, column);
  };

  return (
    <div
      key={column.key}
      className={bemClass('DatagridHeaderCell', {
        sortable: !!onSort && column.sortable !== false,
        sorted,
        filtered: column.filtered,
        'first-row': firstRow,
        'first-in-row': firstCellInRow,
        'last-in-row': lastCellInRow,
        last,
        wrapped,
      })}
      style={style}
      role="columheader"
      aria-rowindex={rowIndex}
      aria-colindex={colIndex}
    >
      <DataGridHeaderCellContent
        style={style}
        sorted={sorted}
        wrapped={wrapped}
        onSort={onSort}
        sortDirection={sortDirection}
        id={id}
        labels={labels}
        column={column}
      />
      <div
        className="DatagridHeaderCell__resize-handle"
        onMouseEnter={handleMouseEnterResizeHandle}
      />
    </div>
  );
};

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.width === nextProps.width &&
    prevProps.colIndex === nextProps.colIndex &&
    prevProps.rowIndex === nextProps.rowIndex &&
    prevProps.first === nextProps.first &&
    prevProps.last === nextProps.last &&
    isEqual(prevProps.column, nextProps.column)
  );
};

DatagridHeaderCell.defaultProps = {
  first: false,
  last: false,
  width: 150,
};

DatagridHeaderCell.propTypes = {
  context: PropTypes.shape({
    labels: PropTypes.shape({
      a11ySortLabel: PropTypes.string.isRequired,
    }).isRequired,
    onMouseEnterResizeHandle: PropTypes.func.isRequired,
    sortDirection: PropTypes.number,
    onSort: PropTypes.func,
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
  }).isRequired,
  column: PropTypes.shape({
    key: PropTypes.any.isRequired,
    title: PropTypes.any.isRequired,
    description: PropTypes.string,
    type: PropTypes.string,
    width: PropTypes.number,
    formula: PropTypes.string,
  }),
  rowIndex: PropTypes.number.isRequired,
  colIndex: PropTypes.number.isRequired,
  last: PropTypes.bool,
  width: PropTypes.number,
};

export default React.memo(DatagridHeaderCell, areEqual);
