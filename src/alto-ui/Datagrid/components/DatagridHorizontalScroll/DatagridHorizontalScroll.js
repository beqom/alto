import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { DATAGRID_SCROLLBAR_SIZE } from '../../constants';

const DatagridHorizontalScroll = forwardRef(
  ({ rowsScrollWidth, frozenRowsWidth }, scrollNodeRef) => {
    if (!rowsScrollWidth) {
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

DatagridHorizontalScroll.propTypes = {
  rowsScrollWidth: PropTypes.number,
  frozenRowsWidth: PropTypes.number,
};

DatagridHorizontalScroll.displayName = 'DatagridHorizontalScroll';
export default DatagridHorizontalScroll;
