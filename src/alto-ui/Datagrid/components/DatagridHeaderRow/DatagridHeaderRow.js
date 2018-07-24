import React from 'react';
import PropTypes from 'prop-types';

import DatagridHeaderCell from '../DatagridHeaderCell';

import './DatagridHeaderRow.scss';

const DatagridHeaderRow = ({ columns, rowIndex, columnIndexStart, context }) => (
  <div role="row" aria-rowindex={rowIndex} className="DatagridHeaderRow">
    {columns.map((column, colIndex) => (
      <DatagridHeaderCell
        key={column.key}
        column={column}
        colIndex={colIndex + columnIndexStart + 1}
        rowIndex={rowIndex}
        context={context}
      />
    ))}
  </div>
);

DatagridHeaderRow.displayName = 'DatagridHeaderRow';

DatagridHeaderRow.defaultProps = {
  columnIndexStart: 1,
};

DatagridHeaderRow.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  rowIndex: PropTypes.number.isRequired,
  columnIndexStart: PropTypes.number,
  context: PropTypes.object.isRequired,
};

export default DatagridHeaderRow;
