import React from 'react';
import PropTypes from 'prop-types';

import DatagridHeaderCell from '../DatagridHeaderCell';

import './DatagridHeaderRow.scss';

const DatagridHeaderRow = ({ columns }) => (
  <div className="DatagridHeaderRow">
    {columns.map(column => <DatagridHeaderCell key={column.key} column={column} />)}
  </div>
);

DatagridHeaderRow.displayName = 'DatagridHeaderRow';

DatagridHeaderRow.defaultProps = {};

DatagridHeaderRow.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default DatagridHeaderRow;
