import React from 'react';
import PropTypes from 'prop-types';

import DatagridCell from '../DatagridCell';
import './DatagridRow.scss';

const DatagridRow = ({
  index,
  rowIndex,
  columns,
  columnIndexStart,
  row,
  render,
  header,
  context,
}) => (
  <div role="row" aria-rowindex={rowIndex} className="DatagridRow">
    {columns.map((column, colIndex) => {
      const editable = !render && context.editable(column, row) && !column.formula;
      const edited = !render && context.edited(column, row, colIndex, index);
      const id =
        context.id && row
          ? `${context.id}__cell--${column.key}-${context.rowKeyField(row)}`
          : undefined;
      return (
        <DatagridCell
          id={id}
          key={column.key}
          row={row}
          rowIndex={rowIndex}
          column={column}
          colIndex={colIndex + columnIndexStart}
          editable={editable}
          edited={edited}
          render={render}
          header={header}
          context={context}
        />
      );
    })}
  </div>
);

DatagridRow.displayName = 'DatagridRow';

DatagridRow.defaultProps = {
  columnIndexStart: 1,
  index: 0,
};

DatagridRow.propTypes = {
  row: PropTypes.object,
  rowIndex: PropTypes.number.isRequired,
  index: PropTypes.number,
  render: PropTypes.func,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  columnIndexStart: PropTypes.number,
  header: PropTypes.bool,
  context: PropTypes.shape({
    id: PropTypes.string,
    rowKeyField: PropTypes.func.isRequired,
  }).isRequired,
};

export default DatagridRow;
