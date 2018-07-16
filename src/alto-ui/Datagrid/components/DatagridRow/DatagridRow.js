import React from 'react';
import PropTypes from 'prop-types';

import DatagridCell from '../DatagridCell';

import './DatagridRow.scss';

const DatagridRow = ({ row, columns }) => (
  <div className="DatagridRow">
    {columns.map(column => <DatagridCell key={column.key} column={column} row={row} />)}
  </div>
);

DatagridRow.displayName = 'DatagridRow';

DatagridRow.defaultProps = {};

DatagridRow.propTypes = {
  row: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default DatagridRow;
