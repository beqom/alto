import React, { useState, memo, forwardRef, useContext } from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../../../helpers/bem';
import { DATAGRID_HEADER_ROW_INDEX, DATAGRID_INITIAL_STATE_RESIZER } from '../../constants';
import DatagridHeaderRow from '../DatagridHeaderRow';
import { DatagridHeadSummaryRow } from './components/DatagridHeadSummaryRow';
import DatagridResizer from '../DatagridResizer';
import { DatagridContext } from '../../Datagrid';

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
    containerRef,
    setColumnsWidth,
    onChangeWidth,
    scrollHeaderRef,
  }) => {
    const context = useContext(DatagridContext);
    const { columnsWidth } = context;
    const [resizer, setResizer] = useState(DATAGRID_INITIAL_STATE_RESIZER);
    const isFrozenColumnsAvailable = frozenColumns.length || hasCheckbox;

    const { target, container, parent, resizing, column } = resizer;
    const minWidth = column && column.editable ? 74 : 64;

    const handleMouseEnterResizeHandle = (e, col) => {
      if (resizer.resizing) return;
      const resizerTarget = e.target.getBoundingClientRect();
      const resizerParent = e.target.parentNode.getBoundingClientRect();
      const resizerContainer = containerRef.current.getBoundingClientRect();
      setResizer({
        column: col,
        target: resizerTarget,
        parent: resizerParent,
        container: resizerContainer,
        resizing: false,
      });
    };

    const handleStartResize = () => {
      setResizer({ ...resizer, resizing: true });
    };

    const handleStopResize = deltaX => {
      if (typeof onChangeWidth === 'function') {
        const value = resizer.parent.width + deltaX;
        onChangeWidth(value, resizer.column);
      }
      setResizer(DATAGRID_INITIAL_STATE_RESIZER);
      setColumnsWidth({ ...columnsWidth, [resizer.column.key]: resizer.parent.width + deltaX });
    };

    return (
      <>
        <DatagridResizer
          left={target.left}
          top={target.top}
          handleHeight={target.height}
          height={container.bottom - target.top}
          maxLeft={parent.left + minWidth}
          maxRight={column && column.frozen ? container.right - minWidth : container.right}
          onStart={handleStartResize}
          onStop={handleStopResize}
          resizing={resizing}
        />
        <div role="rowgroup" className="Datagrid__head">
          {isFrozenColumnsAvailable && (
            <div role="presentation" className={bemClass('Datagrid__header-row', { frozen: true })}>
              <DatagridHeaderRow
                columns={frozenColumnHeaders}
                rowIndex={DATAGRID_HEADER_ROW_INDEX}
                frozen
                hasCheckBox={hasCheckbox}
                onMouseEnterResizeHandle={handleMouseEnterResizeHandle}
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
                onMouseEnterResizeHandle={handleMouseEnterResizeHandle}
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
      </>
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
  containerRef: PropTypes.object,
  setColumnsWidth: PropTypes.func,
  onChangeWidth: PropTypes.func,
};

export default forwardRef(({ ...props }, ref) => <DatagridHead {...props} scrollHeaderRef={ref} />);
