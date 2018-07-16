import React from 'react';
import PropTypes from 'prop-types';

import './DatagridHeaderCell.scss';

const DatagridHeaderCell = ({ column }) => <div className="DatagridHeaderCell">{column.title}</div>;

DatagridHeaderCell.displayName = 'DatagridHeaderCell';

DatagridHeaderCell.defaultProps = {};

DatagridHeaderCell.propTypes = {
  column: PropTypes.shape({
    key: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default DatagridHeaderCell;
