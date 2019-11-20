import React, { memo } from 'react';
import PropTypes from 'prop-types';

import DatagridRow from '../../../DatagridRow';
import { bemClass } from '../../../../../helpers/bem';

const DataGridHeadSummaryRow = ({
  columnIndexStart,
  columns,
  context,
  headerClassModifiers,
  isFrozen,
  numberOfRows,
  renderSummaryCell,
  rowHasCheckbox,
  rowHeadersCount,
}) => {
  if (!renderSummaryCell || !numberOfRows) {
    return null;
  }
  return (
    <DatagridRow
      columnIndexStart={columnIndexStart}
      columns={columns}
      context={context}
      detached
      frozen={isFrozen}
      header
      index={0}
      lastRow
      render={renderSummaryCell}
      rowIndex={rowHeadersCount}
      summary
    >
      {cells => (
        <>
          {rowHasCheckbox && (
            <div
              className={bemClass('DataGrid__row-checkbox-container', {
                ...headerClassModifiers,
                header: true,
                summary: true,
                last: !columns.length,
                'first-row': true,
                'last-row': true,
              })}
            />
          )}
          {cells}
        </>
      )}
    </DatagridRow>
  );
};

DataGridHeadSummaryRow.defaultProps = {
  columnIndexStart: 0,
  rowHeadersCount: 0,
  rowHasCheckbox: false,
  isFrozen: false,
};

DataGridHeadSummaryRow.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({ key: PropTypes.string.isRequired, title: PropTypes.string.isRequired })
      .isRequired
  ).isRequired,
  columnIndexStart: PropTypes.number,
  context: PropTypes.object,
  headerClassModifiers: PropTypes.shape({
    comfortable: PropTypes.bool,
    compact: PropTypes.bool,
  }),
  isFrozen: PropTypes.bool,
  numberOfRows: PropTypes.number,
  renderSummaryCell: PropTypes.func,
  rowHasCheckbox: PropTypes.bool,
  rowHeadersCount: PropTypes.number,
};
export default memo(DataGridHeadSummaryRow);
