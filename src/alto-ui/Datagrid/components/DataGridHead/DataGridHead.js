import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../../../helpers/bem';
import { DATAGRID_HEADER_ROW_INDEX } from '../../constants';
import DatagridHeaderRow from '../DatagridHeaderRow';
import { DataGridHeadSummaryRow } from './components/DataGridHeadSummaryRow';

const DataGridHead = ({
  context,
  frozenColumnHeaders,
  frozenColumns,
  hasCheckbox,
  headerClassModifiers,
  renderSummaryCell,
  rowsWidth,
  staticColumnHeaders,
  staticColumns,
}) => {
  const isFrozenColumnsAvailable = frozenColumns.length || hasCheckbox;
  const scrollHeaderNode = useRef();
  const staticHeaderNode = useRef();

  return (
    <div role="rowgroup" className="Datagrid__head">
      {isFrozenColumnsAvailable && (
        <div role="presentation" className={bemClass('Datagrid__header-row', { frozen: true })}>
          <DatagridHeaderRow
            context={context}
            columns={frozenColumnHeaders}
            rowIndex={DATAGRID_HEADER_ROW_INDEX}
            frozen
            hasCheckBox={hasCheckbox}
          />
          <DataGridHeadSummaryRow
            isFrozen
            columns={frozenColumns}
            numberOfRows={staticColumns.length}
            rowHasCheckbox={hasCheckbox && true}
            renderSummaryCell={renderSummaryCell}
            headerClassModifiers={headerClassModifiers}
          />
        </div>
      )}
      <div ref={scrollHeaderNode} className="Datagrid__header-row-container">
        <div
          role="presentation"
          ref={staticHeaderNode}
          className={bemClass('Datagrid__header-row', { static: true })}
          style={{ width: rowsWidth }}
        >
          <DatagridHeaderRow
            context={context}
            columns={staticColumnHeaders}
            rowIndex={DATAGRID_HEADER_ROW_INDEX}
            columnIndexStart={frozenColumns.length}
            frozen={false}
          />
          <DataGridHeadSummaryRow
            columns={staticColumns}
            isFrozen={false}
            rowHasCheckbox={hasCheckbox && false}
            numberOfRows={staticColumns.length}
            rowHeadersCount={1}
            columnIndexStart={frozenColumns.length}
            renderSummaryCell={renderSummaryCell}
            headerClassModifiers={headerClassModifiers}
          />
        </div>
      </div>
    </div>
  );
};

DataGridHead.propTypes = {
  context: PropTypes.object,
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
};

export default DataGridHead;
