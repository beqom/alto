import React from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../../../helpers/bem';
import { DATAGRID_HEADER_ROW_INDEX } from '../../constants';

const DataGridHead = ({staticColumns, frozenColumns, staticColumnHeaders, frozenColumnHeaders, hasCheckbox}) => {
  return (
    <div role="rowgroup" className="Datagrid__head">
      {(!!frozenColumns.length || hasCheckbox) && (
        <div role="presentation" className={bemClass('Datagrid__header-row', { frozen: true })}>
          {renderHeaderRows(frozenColumnHeaders, true)}
          {renderSummaryRow(
            frozenColumns,
            true,
            staticColumns.length,
            DATAGRID_HEADER_ROW_INDEX + 1
          )}
        </div>
      )}
      <div ref={scrollHeaderNode} className="Datagrid__header-row-container">
        <div
          role="presentation"
          ref={staticHeaderNode}
          className={bemClass('Datagrid__header-row', { static: true })}
          style={{ width: rowsWidth }}
        >
          {renderHeaderRows(staticColumnHeaders, false, frozenColumns.length)}
          {renderSummaryRow(
            staticColumns,
            false,
            staticColumns.length,
            DATAGRID_HEADER_ROW_INDEX + 1,
            frozenColumns.length
          )}
        </div>
      </div>
    </div>
  );
};

DataGridHead.propTypes = {};

export default DataGridHead;
