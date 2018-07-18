import React from 'react';
import PropTypes from 'prop-types';

import DatagridCell from '../DatagridCell';
import './DatagridRow.scss';

const DatagridRow = ({ index, rowIndex, columns, columnIndexStart, row, context }) => (
  <div role="row" aria-rowindex={index + 1} className="DatagridRow">
    {columns.map((column, colIndex) => {
      const editable = context.editable(column, row) && !column.formula;
      const edited = context.edited(column, row, colIndex, index);
      return (
        <DatagridCell
          id={
            context.id
              ? `${context.id}__cell--${column.key}-${context.rowKeyField(row)}`
              : undefined
          }
          key={column.key}
          row={row}
          rowIndex={rowIndex + 1}
          column={column}
          colIndex={colIndex + columnIndexStart + 1}
          context={context}
          editable={editable}
          edited={edited}
        />
      );
    })}
  </div>
);

DatagridRow.displayName = 'DatagridRow';

DatagridRow.defaultProps = {
  columnIndexStart: 0,
};

DatagridRow.propTypes = {
  row: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  columnIndexStart: PropTypes.number,
  context: PropTypes.shape({
    id: PropTypes.string,
    rowKeyField: PropTypes.func.isRequired,
  }).isRequired,
};

export default DatagridRow;
