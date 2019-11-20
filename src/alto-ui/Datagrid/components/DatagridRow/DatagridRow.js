import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../../../helpers/bem';

import DatagridCell from '../DatagridCell';
import './DatagridRow.scss';
import { DataGridContext } from '../../Datagrid';

const DatagridRow = ({
  index,
  rowIndex,
  columns,
  columnIndexStart,
  row,
  render,
  header,
  summary,
  children,
  collapsed,
  frozen,
  hasCheckbox,
  className,
  detached,
  cellClassName,
  lastRow,
}) => {
  const {
    id,
    editable,
    edited,
    disabled,
    onRowClick,
    rowKeyField,
    selectedRowKey,
    columnsWidth,
    compact,
    comfortable,
    ...contextProps
  } = useContext(DataGridContext);

  const clickable = typeof onRowClick === 'function';
  return (
    <div
      role="row"
      aria-rowindex={rowIndex}
      className={bemClass(
        'DatagridRow',
        { collapsed, clickable, frozen, detached, compact, comfortable },
        className
      )}
      {...(clickable && !hasCheckbox ? { onClick: () => onRowClick(row), tabIndex: '0' } : {})}
    >
      {children(
        columns.map((column, colIndex) => {
          const cellEditable =
            !clickable && !header && !render && editable(column, row) && !column.formula;
          const cellEdited =
            !header && !render && edited(column, row, columnIndexStart + colIndex, index);
          const cellDisabled =
            !header && !render && typeof disabled === 'function' && disabled(column, row);

          const cellId = id && row ? `${id}__cell--${column.key}-${rowKeyField(row)}` : undefined;

          return (
            <DatagridCell
              id={cellId}
              key={column.key}
              row={row}
              rowIndex={index}
              column={column}
              colIndex={colIndex + columnIndexStart}
              editable={cellEditable}
              edited={cellEdited}
              disabled={cellDisabled}
              render={render}
              header={header}
              summary={summary}
              aria={{ rowIndex, colIndex: colIndex + columnIndexStart + 1 }}
              selectedRowKey={selectedRowKey}
              width={columnsWidth[column.key] || column.width}
              detached={detached}
              className={cellClassName}
              lastRow={lastRow}
              context={{
                id,
                editable,
                edited,
                disabled,
                onRowClick,
                rowKeyField,
                selectedRowKey,
                columnsWidth,
                compact,
                comfortable,
                ...contextProps,
              }}
            />
          );
        })
      )}
      {!frozen && <div className="DatagridRow__last-cell" />}
    </div>
  );
};

DatagridRow.displayName = 'DatagridRow';

DatagridRow.defaultProps = {
  columnIndexStart: 0,
  index: 0,
  children: x => x,
  collapsed: false,
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
  summary: PropTypes.bool,
  children: PropTypes.func,
  collapsed: PropTypes.bool,
  extraCell: PropTypes.bool,
  hasCheckbox: PropTypes.bool,
};

export default DatagridRow;
