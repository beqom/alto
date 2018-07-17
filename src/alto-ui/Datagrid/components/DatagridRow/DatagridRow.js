import React from 'react';
import PropTypes from 'prop-types';

import DatagridCell from '../DatagridCell';
import './DatagridRow.scss';

const DatagridRow = ({ row, index, columns, columnIndexStart }) => (
  <div role="row" aria-rowindex={index + 1} className="DatagridRow">
    {columns.map((column, colIndex) => (
      <DatagridCell
        key={column.key}
        column={column}
        row={row}
        rowIndex={index + 1}
        colIndex={colIndex + columnIndexStart + 1}
      />
    ))}
  </div>
);

DatagridRow.displayName = 'DatagridRow';

DatagridRow.defaultProps = {
  columnIndexStart: 0,
};

DatagridRow.propTypes = {
  row: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  columnIndexStart: PropTypes.number,
};

export default DatagridRow;
