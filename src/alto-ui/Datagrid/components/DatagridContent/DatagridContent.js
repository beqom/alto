import React, { forwardRef, useRef, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { bemClass } from '../../../helpers/bem';
import DatagridContentRow from './components/DatagridContentRow';

import { DATAGRID_SCROLLBAR_SIZE } from '../../constants';

function DatagridContent({
  frozenColumns,
  hasCheckbox,
  hasRenderSummaryCell,
  id,
  isMacOS,
  labels,
  rows,
  rowsWidth,
  staticColumns,
  containerRef,
  setHorizontalScrollPosition,
}) {
  const scrollNode = useRef();
  const staticRowsNode = useRef();
  const frozenRowsNode = useRef();


  const [initializedScrollListener, setInitializedScrollListener] = useState(false);

  const { offsetWidth: frozenRowsWidth = 0 } = frozenRowsNode || {};
  const summaryRowsCount = hasRenderSummaryCell ? 1 : 0;
  const isFrozenRowsAvailable = !!frozenColumns.length || hasCheckbox;

  const [scrollMacOSListener, defaultScrollListener] = useMemo(() => ([
    () => {
      const { scrollLeft } = staticRowsNode.current;
      setHorizontalScrollPosition(scrollLeft);
    },
    () => {
      const { scrollLeft } = scrollNode.current;
      staticRowsNode.current.scrollLeft = scrollLeft;
      setHorizontalScrollPosition(scrollLeft);
    },
  ]), []);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const { current: scrollingNode } = isMacOS ? staticRowsNode : scrollNode;

    if (!initializedScrollListener && scrollingNode) {
      const scrollListener = isMacOS ? scrollMacOSListener : defaultScrollListener;

      scrollingNode.addEventListener('scroll', scrollListener);
      setInitializedScrollListener(true);

      return () => {
        scrollingNode.removeEventListener('scroll', scrollListener);
        setInitializedScrollListener(false);
      };
    }
  }, [rows.length]);

  return (
    <div
      id={id}
      role="grid"
      aria-rowcount={rows.length}
      className={bemClass('Datagrid', { 'with-summary': hasRenderSummaryCell })}
      ref={containerRef}
    >
      {!isMacOS && !!rowsWidth && (
        <div
          className="Datagrid__horizontal-scroll-container"
          ref={scrollNode}
          style={{ width: `calc(100% - ${frozenRowsWidth + DATAGRID_SCROLLBAR_SIZE}px)` }}
        >
          <div
            className="Datagrid__horizontal-scroll-element"
            style={{ width: `${rowsWidth}px` }}
          />
        </div>
      )}

      <div role="rowgroup" className="Datagrid__body">
        {rows.length ? (
          <>
            {isFrozenRowsAvailable && (
              <div
                role="presentation"
                ref={frozenRowsNode}
                className={bemClass('Datagrid__rows', { frozen: true })}
              >
                <DatagridContentRow
                  columns={frozenColumns}
                  isFrozen
                  rowHasCheckbox={hasCheckbox && true}
                  summaryRowsCount={summaryRowsCount}
                />
              </div>
            )}
            <div
              role="presentation"
              className={bemClass('Datagrid__rows',
              { static: true })}
              style={{ width: `calc(100% - ${frozenRowsWidth}px)` }}
            >
              <div
                className={bemClass('Datagrid__rows-container', { isMacOS })}
                ref={staticRowsNode}
              >
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
  containerRef: PropTypes.object,
  setHorizontalScrollPosition: PropTypes.func,
};

export default forwardRef(({ ...props }, ref) => <DatagridContent {...props} containerRef={ref} />);
