import React from 'react';
import PropTypes from 'prop-types';

import './DatagridCell.scss';

const DatagridCell = ({ row, column }) => <div className="DatagridCell">{row[column.key]}</div>;

DatagridCell.displayName = 'DatagridCell';

DatagridCell.defaultProps = {};

DatagridCell.propTypes = {
  row: PropTypes.object.isRequired,
  column: PropTypes.shape({
    key: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default DatagridCell;
