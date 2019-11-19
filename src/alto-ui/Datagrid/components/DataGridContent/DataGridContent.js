import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { DATAGRID_DEFAULT_HEADER_COUNT } from '../../constants';
import { bemClass } from '../../../helpers/bem';

const DataGridContent = ({ labels }) => {
  const containerRef = useRef();

  return (
    <div
      id={id}
      role="grid"
      aria-rowcount={DATAGRID_DEFAULT_HEADER_COUNT + rows.length}
      className={bemClass('Datagrid', { 'with-summary': !!renderSummaryCell }, className)}
      ref={containerRef}
    >
      {renderHorizontalScroll(rowsWidth)}

      <div role="rowgroup" className="Datagrid__body">
        {rows.length ? (
          <>
            {(!!frozenColumns.length || hasCheckbox) && (
              <div
                role="presentation"
                ref={frozenRowsNode}
                className={bemClass('Datagrid__rows', { frozen: true })}
              >
                {renderRows(frozenColumns, true, DATAGRID_DEFAULT_HEADER_COUNT)}
              </div>
            )}
            <div
              role="presentation"
              className={bemClass('Datagrid__rows', { static: true })}
              style={{ width: `calc(100% - ${frozenRowsWidth}px)` }}
            >
              <div
                className={bemClass('Datagrid__rows-container', { isMacOS: IS_MAC_OS })}
                ref={staticRowsNode}
              >
                {renderRows(
                  staticColumns,
                  false,
                  DATAGRID_DEFAULT_HEADER_COUNT,
                  frozenColumns.length
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="Datagrid__no-data-label">{labels.errorNoData}</div>
        )}
      </div>
    </div>
  );
};

DataGridContent.propTypes = {
  labels: PropTypes.shape({
    errorFormula: PropTypes.string,
    a11ySortLabel: PropTypes.string,
    checkboxLabel: PropTypes.string,
    booleanTrue: PropTypes.string,
    booleanFalse: PropTypes.string,
  }),
};

export default DataGridContent;
