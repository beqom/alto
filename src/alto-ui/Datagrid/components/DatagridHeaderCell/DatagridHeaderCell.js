/* eslint-disable jsx-a11y/aria-role */
import React from 'react';
import PropTypes from 'prop-types';

import './DatagridHeaderCell.scss';

const DatagridHeaderCell = ({ rowIndex, column, colIndex }) => (
  <div
    role="columheader"
    aria-rowindex={rowIndex}
    aria-colindex={colIndex}
    className="DatagridHeaderCell"
  >
    {column.title}
  </div>
);

DatagridHeaderCell.displayName = 'DatagridHeaderCell';

DatagridHeaderCell.defaultProps = {};

DatagridHeaderCell.propTypes = {
  column: PropTypes.shape({
    key: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  rowIndex: PropTypes.number.isRequired,
  colIndex: PropTypes.number.isRequired,
};

export default DatagridHeaderCell;
