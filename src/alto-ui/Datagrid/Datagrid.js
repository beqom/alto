import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { bemClass } from '../helpers/bem';

import sum from '../helpers/sum';
import { isMacOS as isMacOSHelper } from '../helpers/navigator';
import { FORMATTERS, PARSERS, RENDERERS } from './helpers';
import CheckBox from '../Form/CheckBox';

import DatagridHeaderRow from './components/DatagridHeaderRow';
import DatagridGroupedRow from './components/DatagridGroupedRow';
import DatagridRow from './components/DatagridRow';
import DatagridResizer from './components/DatagridResizer';

import './Datagrid.scss';
import {
  DATAGRID_CHECKBOX_WIDTH,
  DATAGRID_DEFAULT_HEADER_COUNT,
  DATAGRID_HEADER_ROW_INDEX,
  DATAGRID_INITIAL_STATE_RESIZER,
  DATAGRID_SCROLLBAR_SIZE,
  DEFAULT_LABELS,
} from './constants';

const IS_MAC_OS = isMacOSHelper();

export const DataGridContext = React.createContext({
  renderers: RENDERERS,
  parsers: PARSERS,
  formatters: FORMATTERS,
  labels: DEFAULT_LABELS,
  columnsWidth: {},
});

DataGridContext.displayName = 'DataGridContext';

function Datagrid({
  className,
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
  const [initializedScrollListener, setInitializedScrollListener] = useState(false);
  const [resizer, setResizer] = useState(DATAGRID_INITIAL_STATE_RESIZER);

  const containerRef = useRef();
  const frozenRowsNode = useRef();
  const scrollHeaderNode = useRef();
  const scrollNode = useRef();
  const staticHeaderNode = useRef();
  const staticRowsNode = useRef();

  const staticColumns = useMemo(() => columns.filter(({ frozen }) => !frozen), [columns]);
  const frozenColumns = useMemo(() => columns.filter(({ frozen }) => frozen), [columns]);

  const staticColumnHeaders = useMemo(() => {
    return columnHeaders ? columnHeaders.filter(({ frozen }) => !frozen) : staticColumns;
  }, [columnHeaders]);
  const frozenColumnHeaders = useMemo(() => {
    return columnHeaders ? columnHeaders.filter(({ frozen }) => frozen) : frozenColumns;
  }, [columnHeaders]);
  const hasCheckbox = typeof onSelectRow === 'function';

  const rowsWidth = sum(staticColumns, 'width');

  const { offsetWidth: frozenRowsWidth = 0 } = frozenRowsNode || {};

  function defaultScrollListener() {
    const { scrollLeft } = scrollNode.current;
    staticRowsNode.current.scrollLeft = scrollLeft;
    scrollHeaderNode.current.scrollLeft = scrollLeft;
  }

  function scrollMacOSListener() {
    const { scrollLeft } = staticRowsNode.current;
    scrollHeaderNode.current.scrollLeft = scrollLeft;
  }

  function getScrollNode() {
    return IS_MAC_OS ? staticRowsNode : scrollNode;
  }

  useEffect(() => {
    const scrollListener = IS_MAC_OS ? scrollMacOSListener : defaultScrollListener;
    const scrollingNode = getScrollNode().current;

    if (initializedScrollListener || !scrollingNode) {
      return undefined;
    }
    scrollingNode.addEventListener('scroll', scrollListener);
    setInitializedScrollListener(true);
    return () => {
      scrollingNode.removeEventListener('scroll', scrollListener);
      setInitializedScrollListener(false);
    };
  }, []);

  function handleMouseEnterResizeHandle(e, column) {
    if (resizer.resizing) return;
    const target = e.target.getBoundingClientRect();
    const parent = e.target.parentNode.getBoundingClientRect();
    const container = containerRef.current.getBoundingClientRect();
    setResizer({ column, target, parent, container, resizing: false });
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
      columnHeaders,
      columns,
      columnsWidth,
      comfortable,
      compact,
      disabled,
      edited,
      editable,
      formatters: contextFormatters,
      getInputProps,
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
      onMouseEnterResizeHandle: handleMouseEnterResizeHandle,
      onRowClick,
      onSelectAllRows,
      onSelectRow,
      onSort,
      onStartEditing,
      onStopEditing,
      parsers: contextParsers,
      renderers: contextRenderers,
      rowKeyField,
      rows,
      selectedRowKey,
      showError,
      sortDirection,
      visible,
      wrapHeader,
    };
  }

  function handleToggleGroup(groupId) {
    setCollapsedGroups({
      ...collapsedGroups,
      [groupId]: !collapsedGroups[groupId],
    });
  }

  function handleStartResize() {
    setResizer({ ...resizer, resizing: true });
  }

  function handleStopResize(deltaX) {
    if (typeof onChangeWidth === 'function') {
      const value = resizer.parent.width + deltaX;
      onChangeWidth(value, resizer.column);
    }
    setResizer(DATAGRID_INITIAL_STATE_RESIZER);
    setColumnsWidth({ ...columnsWidth, [resizer.column.key]: resizer.parent.width + deltaX });
  }

  function renderHeaderRows(cols, frozen, columnIndexStart = 0) {
    const rowHasCheckbox = typeof onSelectRow === 'function' && frozen;
    return (
      <DatagridHeaderRow
        rowIndex={DATAGRID_HEADER_ROW_INDEX}
        columns={cols}
        columnIndexStart={columnIndexStart}
        context={getInitContextValue()}
        hasCheckBox={rowHasCheckbox}
        frozen={frozen}
      />
    );
  }

  function getModifiers() {
    return { compact, comfortable };
  }

  function renderSummaryRow(cols, frozen, numberOfRows, rowHeadersCount = 1, columnIndexStart = 0) {
    const rowHasCheckbox = typeof onSelectRow === 'function' && frozen;

    if (!renderSummaryCell || !numberOfRows) {
      return null;
    }
    const containerModifiers = getModifiers();

    return (
      <DatagridRow
        columnIndexStart={columnIndexStart}
        columns={cols}
        context={getInitContextValue()}
        detached
        frozen={frozen}
        header
        index={0}
        lastRow
        render={renderSummaryCell}
        rowIndex={rowHeadersCount + 1}
        summary
      >
        {cells => (
          <>
            {rowHasCheckbox && (
              <div
                className={bemClass('DataGrid__row-checkbox-container', {
                  ...containerModifiers,
                  header: true,
                  summary: true,
                  last: !cols.length,
                  'first-row': true,
                  'last-row': true,
                })}
              />
            )}
            {cells}
          </>
        )}
      </DatagridRow>
    );
  }

  function renderRows(col, frozen, rowHeadersCount = 1, columnIndexStart = 0) {
    const rowHasCheckbox = typeof onSelectRow === 'function' && frozen;
    const firstColumnWidth = columnsWidth[(col[0] || {}).key] || (col[0] || {}).width;
    const summaryRowsCount = renderSummaryCell ? 1 : 0;
    const groupingColumn = groupedByColumnKey && columns.find(c => c.key === groupedByColumnKey);
    const displayGroupToggle = (frozen && col.length) || (!frozen && col.length === columns.length);
    const rowModifiers = getModifiers();

    return rows.reduce((acc, row, index, arr) => {
      const isFirstRow = index === 0;
      const isLastRow = index === arr.length - 1;
      const isPrecededByDifferentGroup =
        isFirstRow || row[groupedByColumnKey] !== arr[index - 1][groupedByColumnKey];

      const isFollowedByDifferentGroup =
        isLastRow || row[groupedByColumnKey] !== arr[index + 1][groupedByColumnKey];

      const key = rowKeyField(row);
      const uniqueId = `${key}__${index}`;
      const rowIndex = rowHeadersCount + summaryRowsCount + 1 + acc.length;
      const collapsed = groupedByColumnKey && !!collapsedGroups[row[groupedByColumnKey]];

      const sharedProps = {
        collapsed,
        columns: col,
        context: getInitContextValue(),
        columnIndexStart,
        index,
      };

      const groupedRow =
        groupedByColumnKey && isPrecededByDifferentGroup ? (
          <DatagridGroupedRow
            {...sharedProps}
            key={`${uniqueId}--group`}
            firstRowInGroup={row}
            rowIndex={rowIndex}
            onToggle={handleToggleGroup}
            subRows={rows.filter(r => r[groupedByColumnKey] === row[groupedByColumnKey])}
            frozen={frozen}
            groupingColumn={displayGroupToggle ? groupingColumn : undefined}
            groupingColumnWidth={
              col.length && rowHasCheckbox
                ? firstColumnWidth + DATAGRID_CHECKBOX_WIDTH
                : firstColumnWidth
            }
            lastRow={collapsed}
          >
            {cells => (
              <>
                {!col.length && rowHasCheckbox && (
                  <div
                    className={bemClass('DataGrid__row-checkbox-container', {
                      ...rowModifiers,
                      header: true,
                      'first-row': true,
                      'last-row': collapsed,
                    })}
                  />
                )}
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
          {...sharedProps}
          key={uniqueId}
          row={row}
          rowIndex={ariaRowIndex}
          frozen={frozen}
          hasCheckbox={rowHasCheckbox}
          detached={index === 0 && !groupedRow}
          lastRow={isFollowedByDifferentGroup}
        >
          {cells => (
            <>
              {rowHasCheckbox && (
                <div
                  className={bemClass('DataGrid__row-checkbox-container', {
                    'first-row': index + groupedRowArr.length === 0,
                    'last-row': index === rows.length - 1,
                    ...rowModifiers,
                  })}
                >
                  <CheckBox
                    id={`${id || 'Datagrid'}__${key}-checkbox`}
                    className="DataGrid__row-checkbox"
                    title={ariaRowIndex}
                    label={labels.checkboxLabel}
                    hideLabel
                    checked={(selectedRows || []).includes(key)}
                    onChange={() => onSelectRow(row)}
                    disabled={!key}
                  />
                </div>
              )}
              {cells}
            </>
          )}
        </DatagridRow>,
      ];
    }, []);
  }

  function renderResizer() {
    const { target, container, parent, resizing, column } = resizer;
    const minWidth = column && column.editable ? 74 : 64;

    return (
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
    );
  }

  function renderHorizontalScroll(rowsScrollWidth = 0) {
    if (IS_MAC_OS || !rowsScrollWidth) {
      return null;
    }

    return (
      <div
        className="Datagrid__horizontal-scroll-container"
        ref={scrollNode}
        style={{ width: `calc(100% - ${frozenRowsWidth + DATAGRID_SCROLLBAR_SIZE}px)` }}
      >
        <div
          className="Datagrid__horizontal-scroll-element"
          style={{ width: `${rowsScrollWidth}px` }}
        />
      </div>
    );
  }

  return (
    <DataGridContext.Provider value={getInitContextValue()}>
      {renderResizer()}
      <div role="rowgroup" className="Datagrid__head">
        {(!!frozenColumns.length || hasCheckbox) && (
          <div role="presentation" className={bemClass('Datagrid__header-row', { frozen: true })}>
            {renderHeaderRows(frozenColumnHeaders, true)}
            {renderSummaryRow(
              frozenColumns,
              true,
              staticColumns.length,
              DATAGRID_HEADER_ROW_INDEX + 1
            )}
          </div>
        )}
        <div ref={scrollHeaderNode} className="Datagrid__header-row-container">
          <div
            role="presentation"
            ref={staticHeaderNode}
            className={bemClass('Datagrid__header-row', { static: true })}
            style={{ width: rowsWidth }}
          >
            {renderHeaderRows(staticColumnHeaders, false, frozenColumns.length)}
            {renderSummaryRow(
              staticColumns,
              false,
              staticColumns.length,
              DATAGRID_HEADER_ROW_INDEX + 1,
              frozenColumns.length
            )}
          </div>
        </div>
      </div>
      <div
        id={id}
        role="grid"
        aria-rowcount={DATAGRID_DEFAULT_HEADER_COUNT + rows.length}
        className={bemClass('Datagrid', { 'with-summary': !!renderSummaryCell }, className)}
        ref={containerRef}
      >
        {renderHorizontalScroll(rowsWidth)}

        <div role="rowgroup" className="Datagrid__body">
          {rows.length ? (
            <>
              {(!!frozenColumns.length || hasCheckbox) && (
                <div
                  role="presentation"
                  ref={frozenRowsNode}
                  className={bemClass('Datagrid__rows', { frozen: true })}
                >
                  {renderRows(frozenColumns, true, DATAGRID_DEFAULT_HEADER_COUNT)}
                </div>
              )}
              <div
                role="presentation"
                className={bemClass('Datagrid__rows', { static: true })}
                style={{ width: `calc(100% - ${frozenRowsWidth}px)` }}
              >
                <div
                  className={bemClass('Datagrid__rows-container', { isMacOS: IS_MAC_OS })}
                  ref={staticRowsNode}
                >
                  {renderRows(
                    staticColumns,
                    false,
                    DATAGRID_DEFAULT_HEADER_COUNT,
                    frozenColumns.length
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="Datagrid__no-data-label">{labels.errorNoData}</div>
          )}
        </div>
      </div>
    </DataGridContext.Provider>
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
  className: PropTypes.string,
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

export default Datagrid;
