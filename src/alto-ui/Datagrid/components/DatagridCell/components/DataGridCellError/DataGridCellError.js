import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '../../../../../Tooltip';
import ExclamationTriangleIcon from '../../../../../Icons/ExclamationTriangle';
import ExclamationCircleIcon from '../../../../../Icons/ExclamationCircle';

const DataGridCellError = ({ column, row, value, showError, isWarningError, replaceRowValues }) => {
  const error = typeof showError === 'function' ? showError(value, column, row) : false;
  if (!error) {
    return null;
  }
  const warning = typeof isWarningError === 'function' ? isWarningError(value, column, row) : false;
  const tooltipContent = replaceRowValues(error);
  const tooltipIcon = warning ? (
    <ExclamationTriangleIcon className="DatagridCell__warning-icon" />
  ) : (
    <ExclamationCircleIcon className="DatagridCell__error-icon" />
  );
  return <Tooltip content={tooltipContent}>{tooltipIcon}</Tooltip>;
};
DataGridCellError.propTypes = {
  column: PropTypes.shape({
    key: PropTypes.any.isRequired,
    title: PropTypes.any.isRequired,
    description: PropTypes.string,
    type: PropTypes.string,
    formula: PropTypes.string,
    formatter: PropTypes.func,
  }),
  row: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showError: PropTypes.func,
  isWarningError: PropTypes.func,
  replaceRowValues: PropTypes.func,
};

export default DataGridCellError;
