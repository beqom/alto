import React, { forwardRef, useRef } from 'react';
import PropTypes from 'prop-types';
import { bemClass } from '../../../helpers/bem';
import DatagridHorizontalScroll from '../DatagridHorizontalScroll';
import DatagridContentRow from './components/DatagridContentRow';

const DatagridContent = ({
  frozenColumns,
  hasCheckbox,
  hasRenderSummaryCell,
  id,
  isMacOS,
  labels,
  rows,
  rowsWidth,
  staticColumns,
  refs,
}) => {
  const { containerRef, scrollNode, staticRowsNode } = refs;
  const frozenRowsNode = useRef();

  const { offsetWidth: frozenRowsWidth = 0 } = frozenRowsNode || {};
  const isFrozenRowsAvailable = !!frozenColumns.length || hasCheckbox;

  const contentClassName = bemClass('Datagrid', { 'with-summary': hasRenderSummaryCell });
  const frozenRowsClassName = bemClass('Datagrid__rows', { frozen: true });
  const staticRowsClassName = bemClass('Datagrid__rows', { static: true });
  const staticRowsContainerClassName = bemClass('Datagrid__rows-container', { isMacOS });

  const staticNodeStyle = { width: `calc(100% - ${frozenRowsWidth}px)` };
  const summaryRowsCount = hasRenderSummaryCell ? 1 : 0;

  return (
    <div
      id={id}
      role="grid"
      aria-rowcount={rows.length}
      className={contentClassName}
      ref={containerRef}
    >
      {!isMacOS && (
        <DatagridHorizontalScroll
          ref={scrollNode}
          rowsScrollWidth={rowsWidth}
          frozenRowsWidth={frozenRowsWidth}
        />
      )}

      <div role="rowgroup" className="Datagrid__body">
        {rows.length ? (
          <>
            {isFrozenRowsAvailable && (
              <div role="presentation" ref={frozenRowsNode} className={frozenRowsClassName}>
                <DatagridContentRow
                  columns={frozenColumns}
                  isFrozen
                  rowHasCheckbox={hasCheckbox && true}
                  summaryRowsCount={summaryRowsCount}
                />
              </div>
            )}
            <div role="presentation" className={staticRowsClassName} style={staticNodeStyle}>
              <div className={staticRowsContainerClassName} ref={staticRowsNode}>
                <DatagridContentRow
                  columns={staticColumns}
                  rowHasCheckbox={hasCheckbox && false}
                  summaryRowsCount={summaryRowsCount}
                  columnIndexStart={frozenColumns.length}
                />
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

DatagridContent.propTypes = {
  frozenColumns: PropTypes.arrayOf(
    PropTypes.shape({ key: PropTypes.string.isRequired, title: PropTypes.string.isRequired })
  ),
  hasCheckbox: PropTypes.bool,
  hasRenderSummaryCell: PropTypes.bool,
  id: PropTypes.string,
  isMacOS: PropTypes.bool,
  labels: PropTypes.shape({
    errorFormula: PropTypes.string,
    a11ySortLabel: PropTypes.string,
    checkboxLabel: PropTypes.string,
    booleanTrue: PropTypes.string,
    booleanFalse: PropTypes.string,
    errorNoData: PropTypes.string,
  }),
  rows: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  rowsWidth: PropTypes.number,
  staticColumns: PropTypes.arrayOf(
    PropTypes.shape({ key: PropTypes.string.isRequired, title: PropTypes.string.isRequired })
  ),
  refs: PropTypes.shape({
    containerRef: PropTypes.node,
    scrollNode: PropTypes.node,
    staticRowsNode: PropTypes.node,
  }),
};

export default forwardRef(({ ...props }, ref) => <DatagridContent {...props} refs={ref} />);
