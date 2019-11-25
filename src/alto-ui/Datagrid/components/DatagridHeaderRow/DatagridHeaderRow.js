import React from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../../../helpers/bem';

import DatagridHeaderRowCheckbox from './DatagridHeaderRowCheckbox';
import DatagridHeaderCell from '../DatagridHeaderCell';

import './DatagridHeaderRow.scss';

const DatagridHeaderRow = ({
  columns,
  rowIndex,
  columnIndexStart,
  context,
  hasCheckBox,
  frozen,
}) => (
  <div role="row" aria-rowindex={rowIndex} className={bemClass('DatagridHeaderRow', { frozen })}>
    {hasCheckBox && <DatagridHeaderRowCheckbox context={context} columns={columns} />}
    {columns.map((column, colIndex) => {
      const { columnsWidth } = context;
      const firstCellInRow =
        typeof context.onSelectRow !== 'function' && columnIndexStart + colIndex === 0;
      if (!column.children) {
        return (
          <DatagridHeaderCell
            key={column.key}
            column={column}
            colIndex={colIndex + columnIndexStart + 1}
            rowIndex={rowIndex}
            context={context}
            last={colIndex === columns.length - 1}
            width={columnsWidth[column.key] || column.width}
            firstRow
            firstCellInRow={firstCellInRow}
            lastCellInRow={columnIndexStart + colIndex === context.columns.length - 1}
          />
        );
      }

      if (!column.children.length) return null;
      const width = column.children
        .map(col => Math.max(columnsWidth[col.key] || col.width || 150, col.editable ? 74 : 64))
        .reduce((acc, w) => acc + w);
      const style = { width, maxWidth: width };
      const lastColumnInThisGroupKey = column.children.slice(-1)[0].key;
      const lastColumnInLastGroupKey = (
        (context.columnHeaders.slice(-1)[0].children || []).slice(-1)[0] || {}
      ).key;
      return (
        <div
          key={column.children[0].key}
          className={bemClass('DatagridHeaderRow__group', {
            last: colIndex === columns.length - 1,
            'first-in-row': firstCellInRow,
            'last-in-row': lastColumnInThisGroupKey === lastColumnInLastGroupKey,
          })}
        >
          <div
            className={bemClass('DatagridHeaderRow__group-title', {
              empty: !column.title,
            })}
            style={style}
            title={column.title}
          >
            {column.title}
          </div>
          <div className="DatagridHeaderRow__group-columns">
            {column.children.map((subColumn, subColumnIndex) => (
              <DatagridHeaderCell
                key={subColumn.key}
                column={subColumn}
                colIndex={subColumnIndex + colIndex + columnIndexStart + 1}
                rowIndex={rowIndex}
                context={context}
                last={
                  colIndex === columns.length - 1 && subColumnIndex === column.children.length - 1
                }
                first={colIndex === 0 && subColumnIndex === 0}
                width={columnsWidth[subColumn.key] || subColumn.width}
                firstCellInRow={firstCellInRow && subColumnIndex === 0}
                lastCellInRow={subColumn.key === lastColumnInLastGroupKey}
              />
            ))}
          </div>
        </div>
      );
    })}
    {!frozen && <div className="DatagridHeaderRow__last-cell" />}
  </div>
);

DatagridHeaderRow.displayName = 'DatagridHeaderRow';

DatagridHeaderRow.defaultProps = {
  columnIndexStart: 1,
};

DatagridHeaderRow.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
      children: PropTypes.array,
    }).isRequired
  ).isRequired,
  rowIndex: PropTypes.number.isRequired,
  columnIndexStart: PropTypes.number,
  context: PropTypes.shape({
    columnHeaders: PropTypes.array,
    labels: PropTypes.object,
    columnsWidth: PropTypes.object.isRequired,
  }).isRequired,
  hasCheckBox: PropTypes.bool,
  frozen: PropTypes.bool,
};

export default DatagridHeaderRow;
