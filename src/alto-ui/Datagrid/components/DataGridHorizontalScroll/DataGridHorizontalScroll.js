import React, { forwardRef, useMemo } from 'react';
import { DATAGRID_SCROLLBAR_SIZE } from '../../constants';
import { isMacOS } from '../../../helpers/navigator';

const DataGridHorizontalScroll = forwardRef(
  ({ rowsScrollWidth, frozenRowsWidth }, scrollNodeRef) => {
    const IS_MAC = useMemo(isMacOS, []);
    if (IS_MAC || !rowsScrollWidth) {
      return null;
    }

    return (
      <div
        className="Datagrid__horizontal-scroll-container"
        ref={scrollNodeRef}
        style={{ width: `calc(100% - ${frozenRowsWidth + DATAGRID_SCROLLBAR_SIZE}px)` }}
      >
        <div
          className="Datagrid__horizontal-scroll-element"
          style={{ width: `${rowsScrollWidth}px` }}
        />
      </div>
    );
  }
);

export default DataGridHorizontalScroll;
