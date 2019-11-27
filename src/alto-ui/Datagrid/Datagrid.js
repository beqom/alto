import React, { useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import sum from '../helpers/sum';
import { isMacOS as isMacOSHelper } from '../helpers/navigator';
import { mapStaticFrozenColumns, mapStaticFrozenColumnsHeaders } from './helpers';

import './Datagrid.scss';
import {
  DEFAULT_LABELS,
  FORMATTERS,
  PARSERS,
  RENDERERS,
  DATAGRID_DEFAULT_COL_WIDTH,
} from './constants';
import DatagridHead from './components/DatagridHead';
import DatagridContent from './components/DatagridContent';

const IS_MAC_OS = isMacOSHelper();

export const DatagridContext = React.createContext({
  renderers: RENDERERS,
  parsers: PARSERS,
  formatters: FORMATTERS,
  labels: DEFAULT_LABELS,
  columnsWidth: {},
});

DatagridContext.displayName = 'DataGridContext';

export default function Datagrid({
  columnHeaders,
  columns,
  comfortable,
  compact,
  disabled,
  editable,
  edited,
  formatters,
  getInputProps,
  groupedByColumnKey,
  groupedSummaryColumnKeys,
  id,
  isDisplayedRowsSelected,
  isWarningError,
  labels,
  locale,
  modifiers,
  onChange,
  onChangeDebounceTime,
  onChangeWidth,
  onClickCellDropdownItem,
  onRowClick,
  onSelectAllRows,
  onSelectRow,
  onSort,
  onStartEditing,
  onStopEditing,
  parsers,
  renderSummaryCell,
  renderers,
  rowKeyField,
  rows,
  selectedRowKey,
  selectedRows,
  showError,
  sortDirection,
  visible,
  wrapHeader,
}) {
  const [collapsedGroups, setCollapsedGroups] = useState({});
  const [columnsWidth, setColumnsWidth] = useState({});
  const [horizontalScrollPosition, setHorizontalScrollPosition] = useState(0);

  const scrollHeaderRef = useRef();

  const containerRef = useRef();
  const hasCheckbox = typeof onSelectRow === 'function';

  const { staticColumns, frozenColumns, rowsWidth } = useMemo(() => {
    const { staticColumns: staticCols, frozenColumns: frozenCols } = mapStaticFrozenColumns(
      columns
    );
    return {
      staticColumns: staticCols,
      frozenColumns: frozenCols,
      rowsWidth: sum(staticCols, 'width', DATAGRID_DEFAULT_COL_WIDTH),
    };
  }, [columns]);

  const { staticColumnHeaders, frozenColumnHeaders } = useMemo(
    () => mapStaticFrozenColumnsHeaders(columnHeaders, staticColumns, frozenColumns),
    [columnHeaders]
  );

  function onToggleGroup(groupId) {
    setCollapsedGroups({
      ...collapsedGroups,
      [groupId]: !collapsedGroups[groupId],
    });
  }

  function getInitContextValue() {
    const contextRenderers = { ...RENDERERS, ...renderers };
    const contextParsers = { ...PARSERS, ...parsers };
    const contextFormatters = { ...FORMATTERS, ...formatters };
    const contextLabels = {
      ...DEFAULT_LABELS,
      ...labels,
    };

    return {
      collapsedGroups,
      columnHeaders,
      columns,
      columnsWidth,
      comfortable,
      compact,
      disabled,
      editable,
      edited,
      formatters: contextFormatters,
      getInputProps,
      groupedByColumnKey,
      groupedSummaryColumnKeys,
      id,
      isDisplayedRowsSelected,
      isWarningError,
      labels: contextLabels,
      locale,
      modifiers,
      onChange,
      onChangeDebounceTime,
      onClickCellDropdownItem,
      onRowClick,
      onSelectAllRows,
      onSelectRow,
      onSort,
      onStartEditing,
      onStopEditing,
      onToggleGroup,
      parsers: contextParsers,
      renderers: contextRenderers,
      rowKeyField,
      rows,
      selectedRowKey,
      selectedRows: selectedRows || [],
      showError,
      sortDirection,
      visible,
      wrapHeader,
    };
  }

  return (
    <DatagridContext.Provider value={getInitContextValue()}>
      <DatagridHead
        frozenColumnHeaders={frozenColumnHeaders}
        frozenColumns={frozenColumns}
        staticColumnHeaders={staticColumnHeaders}
        staticColumns={staticColumns}
        hasCheckbox={hasCheckbox}
        headerClassModifiers={{ comfortable, compact }}
        renderSummaryCell={renderSummaryCell}
        rowsWidth={rowsWidth}
        id={id}
        horizontalScrollPosition={horizontalScrollPosition}
        containerRef={containerRef}
        columnsWidth={columnsWidth}
        setColumnsWidth={setColumnsWidth}
        onChangeWidth={onChangeWidth}
      />
      <DatagridContent
        hasCheckbox={hasCheckbox}
        frozenColumns={frozenColumns}
        staticColumns={staticColumns}
        id={id}
        labels={labels}
        isMacOS={IS_MAC_OS}
        rows={rows}
        rowsWidth={rowsWidth}
        columnsWidth={columnsWidth}
        ref={{ containerRef, scrollHeaderRef }}
        setHorizontalScrollPosition={setHorizontalScrollPosition}
      />
    </DatagridContext.Provider>
  );
}

Datagrid.defaultProps = {
  disabled: col => col.disabled,
  editable: col => col.editable,
  visible: () => true,
  edited: () => false,
  modifiers: () => {},
  showError: () => false,
  locale: 'en-US',
  wrapHeader: false,
  groupedSummaryColumnKeys: [],
  onClickCellDropdownItem: () => {},
  getInputProps: () => ({}),
};

Datagrid.propTypes = {
  columnHeaders: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
      children: PropTypes.arrayOf(
        PropTypes.shape({ key: PropTypes.string.isRequired, title: PropTypes.string.isRequired })
          .isRequired
      ).isRequired,
    }).isRequired
  ),
  columns: PropTypes.arrayOf(
    PropTypes.shape({ key: PropTypes.string.isRequired, title: PropTypes.string.isRequired })
      .isRequired
  ).isRequired,
  comfortable: PropTypes.bool,
  compact: PropTypes.bool,
  disabled: PropTypes.func,
  editable: PropTypes.func,
  edited: PropTypes.func,
  formatters: PropTypes.object,
  getInputProps: PropTypes.func,
  groupedByColumnKey: PropTypes.string,
  groupedSummaryColumnKeys: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string.isRequired,
  isDisplayedRowsSelected: PropTypes.bool,
  isWarningError: PropTypes.func,
  labels: PropTypes.shape({
    errorFormula: PropTypes.string,
    a11ySortLabel: PropTypes.string,
    checkboxLabel: PropTypes.string,
    booleanTrue: PropTypes.string,
    booleanFalse: PropTypes.string,
  }),
  locale: PropTypes.string,
  modifiers: PropTypes.func,
  onChange: PropTypes.func,
  onChangeDebounceTime: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  onChangeWidth: PropTypes.func,
  onClickCellDropdownItem: PropTypes.func,
  onRowClick: PropTypes.func,
  onSelectAllRows: PropTypes.func,
  onSelectRow: PropTypes.func,
  onSort: PropTypes.func,
  onStartEditing: PropTypes.func,
  onStopEditing: PropTypes.func,
  parsers: PropTypes.object,
  renderSummaryCell: PropTypes.func,
  renderers: PropTypes.object,
  rowKeyField: PropTypes.func.isRequired,
  rows: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  selectedRowKey: PropTypes.string,
  selectedRows: PropTypes.array,
  showError: PropTypes.func,
  sortDirection: PropTypes.number,
  visible: PropTypes.func,
  wrapHeader: PropTypes.bool,
};
