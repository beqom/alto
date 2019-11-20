import React, { memo } from 'react';
import PropTypes from 'prop-types';

import DatagridRow from '../../../DatagridRow';
import { bemClass } from '../../../../../helpers/bem';

const DatagridHeadSummaryRow = memo(
  ({
    columnIndexStart,
    columns,
    context,
    headerClassModifiers,
    isFrozen,
    renderSummaryCell,
    rowHasCheckbox,
    rowHeadersCount,
  }) => {
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
  }
);

DatagridHeadSummaryRow.defaultProps = {
  columnIndexStart: 0,
  rowHeadersCount: 0,
  rowHasCheckbox: false,
  isFrozen: false,
};

DatagridHeadSummaryRow.propTypes = {
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
  renderSummaryCell: PropTypes.func,
  rowHasCheckbox: PropTypes.bool,
  rowHeadersCount: PropTypes.number,
};
DatagridHeadSummaryRow.displayName = 'DataGridHeadSummaryRow';
export default DatagridHeadSummaryRow;
