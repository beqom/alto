import React, { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../../../helpers/bem';
import { DATAGRID_HEADER_ROW_INDEX } from '../../constants';
import DatagridHeaderRow from '../DatagridHeaderRow';
import { DatagridHeadSummaryRow } from './components/DatagridHeadSummaryRow';


const DatagridHead = memo(
  ({
    frozenColumnHeaders,
    frozenColumns,
    hasCheckbox,
    headerClassModifiers,
    renderSummaryCell,
    rowsWidth,
    staticColumnHeaders,
    staticColumns,
    scrollHeaderRef,
  }) => {
    const isFrozenColumnsAvailable = frozenColumns.length || hasCheckbox;

    return (
      <div role="rowgroup" className="Datagrid__head">
        {isFrozenColumnsAvailable && (
          <div role="presentation" className={bemClass('Datagrid__header-row', { frozen: true })}>
            <DatagridHeaderRow
              columns={frozenColumnHeaders}
              rowIndex={DATAGRID_HEADER_ROW_INDEX}
              frozen
              hasCheckBox={hasCheckbox}
            />
            {staticColumns.length && renderSummaryCell && (
              <DatagridHeadSummaryRow
                isFrozen
                columns={frozenColumns}
                numberOfRows={staticColumns.length}
                rowHasCheckbox={hasCheckbox && true}
                renderSummaryCell={renderSummaryCell}
                headerClassModifiers={headerClassModifiers}
              />
            )}
          </div>
        )}
        <div ref={scrollHeaderRef} className="Datagrid__header-row-container">
          <div
            role="presentation"
            className={bemClass('Datagrid__header-row', { static: true })}
            style={{ width: rowsWidth }}
          >
            <DatagridHeaderRow
              columns={staticColumnHeaders}
              rowIndex={DATAGRID_HEADER_ROW_INDEX}
              columnIndexStart={frozenColumns.length}
              frozen={false}
            />
            {staticColumns.length && renderSummaryCell && (
              <DatagridHeadSummaryRow
                columns={staticColumns}
                isFrozen={false}
                rowHasCheckbox={hasCheckbox && false}
                rowHeadersCount={1}
                columnIndexStart={frozenColumns.length}
                renderSummaryCell={renderSummaryCell}
                headerClassModifiers={headerClassModifiers}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
);

DatagridHead.propTypes = {
  frozenColumnHeaders: PropTypes.arrayOf(
    PropTypes.shape({ key: PropTypes.string.isRequired, title: PropTypes.string.isRequired })
  ),
  frozenColumns: PropTypes.arrayOf(
    PropTypes.shape({ key: PropTypes.string.isRequired, title: PropTypes.string.isRequired })
  ),
  hasCheckbox: PropTypes.bool,
  headerClassModifiers: PropTypes.shape({ comfortable: PropTypes.bool, compact: PropTypes.bool }),
  renderSummaryCell: PropTypes.func,
  rowsWidth: PropTypes.number,
  staticColumnHeaders: PropTypes.arrayOf(
    PropTypes.shape({ key: PropTypes.string.isRequired, title: PropTypes.string.isRequired })
  ),
  staticColumns: PropTypes.arrayOf(
    PropTypes.shape({ key: PropTypes.string.isRequired, title: PropTypes.string.isRequired })
  ),
  scrollHeaderRef: PropTypes.object,
};

export default forwardRef(({ ...props }, ref) => <DatagridHead {...props} scrollHeaderRef={ref} />);
