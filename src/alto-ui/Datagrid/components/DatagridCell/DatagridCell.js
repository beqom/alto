import React from 'react';
import PropTypes from 'prop-types';

import './DatagridCell.scss';

const DatagridCell = ({ row, rowIndex, column, colIndex }) => (
  <div role="gridcell" aria-rowindex={rowIndex} aria-colindex={colIndex} className="DatagridCell">
    {row[column.key]}
  </div>
);

DatagridCell.displayName = 'DatagridCell';

DatagridCell.defaultProps = {};

DatagridCell.propTypes = {
  row: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  column: PropTypes.shape({
    key: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  colIndex: PropTypes.number.isRequired,
};

export default DatagridCell;
