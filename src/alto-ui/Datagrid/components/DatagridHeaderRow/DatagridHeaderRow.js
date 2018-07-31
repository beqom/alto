import React from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../../../helpers/bem';
import DatagridHeaderCell from '../DatagridHeaderCell';

import './DatagridHeaderRow.scss';

const DatagridHeaderRow = ({ columns, rowIndex, columnIndexStart, context }) => (
  <div role="row" aria-rowindex={rowIndex} className="DatagridHeaderRow">
    {columns.map((column, colIndex) => {
      if (!column.children) {
        return (
          <DatagridHeaderCell
            key={column.key}
            column={column}
            colIndex={colIndex + columnIndexStart + 1}
            rowIndex={rowIndex}
            context={context}
            last={colIndex === columns.length - 1}
            first={colIndex === 0}
          />
        );
      }

      if (!column.children.length) return null;
      return (
        <div key={column.children[0].key} className="DatagridHeaderRow__group">
          <div className={bemClass('DatagridHeaderRow__group-title', { empty: !column.title })}>
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
              />
            ))}
          </div>
        </div>
      );
    })}
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
      childrem: PropTypes.array,
    }).isRequired
  ).isRequired,
  rowIndex: PropTypes.number.isRequired,
  columnIndexStart: PropTypes.number,
  context: PropTypes.object.isRequired,
};

export default DatagridHeaderRow;
