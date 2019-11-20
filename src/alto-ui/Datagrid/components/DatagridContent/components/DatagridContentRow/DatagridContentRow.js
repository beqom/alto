import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { DataGridContext } from '../../../../Datagrid';
import { DATAGRID_CHECKBOX_WIDTH } from '../../../../constants';
import { bemClass } from '../../../../../helpers';
import DatagridRow from '../../../DatagridRow';
import DatagridGroupedRow from '../../../DatagridGroupedRow';
import DatagridRowCheckbox from '../../../DatagridRowCheckbox';

const DatagridContentRow = ({
  columns,
  isFrozen,
  rowHasCheckbox,
  summaryRowsCount,
  columnIndexStart,
}) => {
  const {
    id,
    collapsedGroups,
    columns: datagridColumns,
    columnsWidth,
    comfortable,
    compact,
    groupedByColumnKey,
    onToggleGroup,
    rowKeyField,
    rows,
  } = useContext(DataGridContext);
  const groupingColumn = useMemo(() => {
    return groupedByColumnKey && columns.find(c => c.key === groupedByColumnKey);
  }, [groupedByColumnKey]);

  const firstColumnWidth = columnsWidth[(columns[0] || {}).key] || (columns[0] || {}).width;
  const displayGroupToggle =
    (isFrozen && columns.length) || (!isFrozen && columns.length === datagridColumns.length);

  return rows.reduce((acc, row, index, arr) => {
    const isFirstRow = index === 0;
    const isLastRow = index === arr.length - 1;
    const isPrecededByDifferentGroup =
      isFirstRow || row[groupedByColumnKey] !== arr[index - 1][groupedByColumnKey];

    const isFollowedByDifferentGroup =
      isLastRow || row[groupedByColumnKey] !== arr[index + 1][groupedByColumnKey];

    const rowKey = rowKeyField(row);
    const uniqueId = `${rowKey}__${index}`;
    const rowIndex = summaryRowsCount + 1 + acc.length;
    const collapsed = groupedByColumnKey && !!collapsedGroups[row[groupedByColumnKey]];
    const rowCheckboxContainerClasses = bemClass('DataGrid__row-checkbox-container', {
      comfortable,
      compact,
      header: true,
      'first-row': true,
      'last-row': collapsed,
    });

    const groupedRow =
      groupedByColumnKey && isPrecededByDifferentGroup ? (
        <DatagridGroupedRow
          collapsed={collapsed}
          key={`${uniqueId}--group`}
          firstRowInGroup={row}
          rowIndex={rowIndex}
          onToggle={onToggleGroup}
          subRows={rows.filter(r => r[groupedByColumnKey] === row[groupedByColumnKey])}
          frozen={isFrozen}
          groupingColumn={displayGroupToggle ? groupingColumn : undefined}
          groupingColumnWidth={
            columns.length && rowHasCheckbox
              ? firstColumnWidth + DATAGRID_CHECKBOX_WIDTH
              : firstColumnWidth
          }
          lastRow={collapsed}
        >
          {cells => (
            <>
              {!columns.length && rowHasCheckbox && <div className={rowCheckboxContainerClasses} />}
              {cells}
            </>
          )}
        </DatagridGroupedRow>
      ) : null;

    const groupedRowArr = groupedRow && groupingColumn ? [groupedRow] : [];
    const ariaRowIndex = rowIndex + groupedRowArr.length + 1;
    return [
      ...acc,
      ...groupedRowArr,
      <DatagridRow
        columns={columns}
        columnIndexStart={columnIndexStart}
        collapsed={collapsed}
        index={index}
        key={uniqueId}
        row={row}
        rowIndex={ariaRowIndex}
        frozen={isFrozen}
        hasCheckbox={rowHasCheckbox}
        detached={index === 0 && !groupedRow}
        lastRow={isFollowedByDifferentGroup}
      >
        {cells => (
          <>
            {rowHasCheckbox && (
              <DatagridRowCheckbox
                id={`${id || 'Datagrid'}__${rowKey}-checkbox`}
                classNameModifiers={{
                  'first-row': index + groupedRowArr.length === 0,
                  'last-row': index === rows.length - 1,
                  compact,
                  comfortable,
                }}
                title={ariaRowIndex}
                row={row}
                rowKey={rowKey}
              />
            )}
            {cells}
          </>
        )}
      </DatagridRow>,
    ];
  }, []);
};

DatagridContentRow.defaultProps = {
  isFrozen: false,
};

DatagridContentRow.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({ key: PropTypes.string.isRequired, title: PropTypes.string.isRequired })
  ),
  isFrozen: PropTypes.bool,
  rowHasCheckbox: PropTypes.bool,
  summaryRowsCount: PropTypes.number,
};

export default DatagridContentRow;
