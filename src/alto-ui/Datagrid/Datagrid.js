import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { bemClass } from '../helpers/bem';

import sum from '../helpers/sum';
import { isMacOS as isMacOSHelper } from '../helpers/navigator';
import CheckBox from '../Form/CheckBox';

import DatagridHeaderRow from './components/DatagridHeaderRow';
import DatagridGroupedRow from './components/DatagridGroupedRow';
import DatagridRow from './components/DatagridRow';
import DatagridResizer from './components/DatagridResizer';

import './Datagrid.scss';
import { FORMATTERS, PARSERS, RENDERERS } from './helpers';
import {
  DATAGRID_CHECKBOX_WIDTH,
  DEFAULT_LABELS,
  DATAGRID_HEADER_ROW_INDEX,
  DATAGRID_SCROLLBAR_SIZE,
  DATAGRID_INITIAL_STATE_RESIZER,
} from './constants';

// Needed in case of the node is not provided as soon as needed
const fakeNode = document.createElement('div');

const IS_MAC_OS = isMacOSHelper();

function Datagrid({ compact, comfortable, onChangeWidth, onSelectRow }) {
  const [collapsedGroups, setCollapsedGroups] = useState({});
  const [resizer, setResizer] = useState(DATAGRID_INITIAL_STATE_RESIZER);
  const [columnsWidth, setColumnsWidth] = useState({});
  const [initializedScrollListener, setInitializedScrollListener] = useState(false);
  const [containerRef, setContainerRef] = useRef();
  const staticRowsNode = useRef();
  const scrollNode = useRef();
  const frozenRows = useRef();
  const scrollHeaderNode = useRef();

  useEffect(() => {
    const scrollListener = IS_MAC_OS ? scrollMacOSListener : defaultScrollListener;
    if (initializedScrollListener || !scrollNode) {
      return;
    }
    scrollNode.addEventListener('scroll', scrollListener);
    setInitializedScrollListener(true);
    return () => {
      scrollNode.removeEventListener('scroll', scrollListener);
      setInitializedScrollListener(false);
    };
  }, []);

  function defaultScrollListener() {
    const { scrollLeft } = scrollNode;
    staticRowsNode.scrollLeft = scrollLeft;
    scrollHeaderNode.scrollLeft = scrollLeft;
  }

  function scrollMacOSListener() {
    const { scrollLeft } = staticRowsNode;
    scrollHeaderNode.scrollLeft = scrollLeft;
  }

  function handleToggleGroup(groupId) {
    const stateGroupId = collapsedGroups[groupId];
    const collapsedGroups = {
      ...collapsedGroups,
      [groupId]: !stateGroupId,
    };
    setCollapsedGroups(collapsedGroups);
  }

  function handleMouseEnterResizeHandle(e, column) {
    if (resizer.resizing) return;
    const target = e.target.getBoundingClientRect();
    const parent = e.target.parentNode.getBoundingClientRect();
    const container = containerRef.current.getBoundingClientRect();
    setResizer({ column, target, parent, container, resizing: false });
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

  function renderHeaderRows(columns, frozen, columnIndexStart = 0) {
    const hasCheckbox = typeof onSelectRow === 'function' && frozen;
    return (
      <DatagridHeaderRow
        rowIndex={DATAGRID_HEADER_ROW_INDEX}
        columns={columns}
        columnIndexStart={columnIndexStart}
        context={this.getContext()}
        hasCheckBox={hasCheckbox}
        frozen={frozen}
      />
    );
  }

}

class Datagrid extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      collapsedGroups: {},
      resizer: DATAGRID_INITIAL_STATE_RESIZER,
      columnsWidth: {},
      initializedScrollListener: false,
    };

    this.setStaticHeaderNode = this.setStaticHeaderNode.bind(this);
    this.setFrozenRowsNode = this.setFrozenRowsNode.bind(this);
    this.setStaticRowsNode = this.setStaticRowsNode.bind(this);
    this.handleMouseEnterResizeHandle = this.handleMouseEnterResizeHandle.bind(this);
    this.handleToggleGroup = this.handleToggleGroup.bind(this);
    this.handleStopResize = this.handleStopResize.bind(this);
    this.handleStartResize = this.handleStartResize.bind(this);

    this.containerRef = React.createRef();

    this.setScrollNode = this.setScrollNode.bind(this);
    this.setScrollHeaderNode = this.setScrollHeaderNode.bind(this);
    this.scrollListener = IS_MAC_OS
      ? this.scrollMacOSListener.bind(this)
      : this.scrollListener.bind(this);
  }

  componentDidMount() {
    this.initializeScrollListener();
  }

  componentDidUpdate() {
    this.initializeScrollListener();
  }

  componentWillUnmount() {
    const scrollNode = this.getScrollNode();
    if (scrollNode) {
      scrollNode.removeEventListener('scroll', this.scrollListener);
    }
  }

  getContext() {
    const renderers = { ...RENDERERS, ...this.props.renderers };
    const parsers = { ...PARSERS, ...this.props.parsers };
    const formatters = { ...FORMATTERS, ...this.props.formatters };
    const labels = {
      ...DEFAULT_LABELS,
      ...this.props.labels,
    };

    return {
      ...this.props,
      renderers,
      parsers,
      formatters,
      labels,
      onMouseEnterResizeHandle: this.handleMouseEnterResizeHandle,
      columnsWidth: this.state.columnsWidth,
    };
  }

  getModifiers() {
    return {
      compact: this.props.compact,
      comfortable: this.props.comfortable,
    };
  }

  getScrollNode() {
    return IS_MAC_OS ? this.staticRowsNode : this.scrollNode;
  }

  setStaticHeaderNode(node) {
    this.staticHeaderNode = node || fakeNode;
  }

  setScrollNode(node) {
    this.scrollNode = node;
  }

  setScrollHeaderNode(node) {
    this.scrollHeaderNode = node;
  }

  setFrozenRowsNode(node) {
    this.frozenRowsNode = node || fakeNode;
  }

  setStaticRowsNode(node) {
    this.staticRowsNode = node;
  }

  initializeScrollListener() {
    const scrollNode = this.getScrollNode();
    const { initializedScrollListener } = this.state;

    if (initializedScrollListener || !scrollNode) {
      return;
    }

    scrollNode.addEventListener('scroll', this.scrollListener);
    this.setState({ initializedScrollListener: true });
  }

  scrollListener() {
    const { scrollLeft } = this.scrollNode;
    this.staticRowsNode.scrollLeft = scrollLeft;
    this.scrollHeaderNode.scrollLeft = scrollLeft;
  }

  scrollMacOSListener() {
    const { scrollLeft } = this.staticRowsNode;
    this.scrollHeaderNode.scrollLeft = scrollLeft;
  }

  handleToggleGroup(groupId) {
    const stateGroupId = this.state.collapsedGroups[groupId];
    const collapsedGroups = {
      ...this.state.collapsedGroups,
      [groupId]: !stateGroupId,
    };
    this.setState({ collapsedGroups });
  }

  handleMouseEnterResizeHandle(e, column) {
    if (this.state.resizer.resizing) return;
    const target = e.target.getBoundingClientRect();
    const parent = e.target.parentNode.getBoundingClientRect();
    const container = this.containerRef.current.getBoundingClientRect();
    this.setState({ resizer: { column, target, parent, container, resizing: false } });
  }

  handleStartResize() {
    this.setState(({ resizer }) => ({ resizer: { ...resizer, resizing: true } }));
  }

  handleStopResize(deltaX) {
    const { onChangeWidth } = this.props;
    if (typeof onChangeWidth === 'function') {
      const value = this.state.resizer.parent.width + deltaX;
      onChangeWidth(value, this.state.resizer.column);
    }
    this.setState(({ columnsWidth, resizer }) => ({
      resizer: DATAGRID_INITIAL_STATE_RESIZER,
      columnsWidth: { ...columnsWidth, [resizer.column.key]: resizer.parent.width + deltaX },
    }));
  }

  renderHeaderRows(columns, frozen, columnIndexStart = 0) {
    const hasCheckbox = typeof this.props.onSelectRow === 'function' && frozen;
    return (
      <DatagridHeaderRow
        rowIndex={DATAGRID_HEADER_ROW_INDEX}
        columns={columns}
        columnIndexStart={columnIndexStart}
        context={this.getContext()}
        hasCheckBox={hasCheckbox}
        frozen={frozen}
      />
    );
  }

  renderSummaryRow(columns, frozen, numberOfRows, headersCount = 1, columnIndexStart = 0) {
    const { renderSummaryCell, onSelectRow } = this.props;
    const hasCheckbox = typeof onSelectRow === 'function' && frozen;

    if (!renderSummaryCell || !numberOfRows) return null;

    const modifiers = this.getModifiers();

    return (
      <DatagridRow
        columns={columns}
        index={0}
        header
        summary
        rowIndex={headersCount + 1}
        context={this.getContext()}
        render={renderSummaryCell}
        columnIndexStart={columnIndexStart}
        frozen={frozen}
        detached
        lastRow
      >
        {cells => (
          <>
            {hasCheckbox && (
              <div
                className={bemClass('DataGrid__row-checkbox-container', {
                  ...modifiers,
                  header: true,
                  summary: true,
                  last: !columns.length,
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

  renderRows(columns, frozen, headersCount = 1, columnIndexStart = 0) {
    const {
      rowKeyField,
      renderSummaryCell,
      groupedByColumnKey,
      rows,
      id,
      selectedRows,
      onSelectRow,
    } = this.props;

    const hasCheckbox = typeof onSelectRow === 'function' && frozen;
    const firstColumnWidth =
      this.state.columnsWidth[(columns[0] || {}).key] || (columns[0] || {}).width;

    const summaryRowsCount = renderSummaryCell ? 1 : 0;
    const groupingColumn =
      groupedByColumnKey && this.props.columns.find(col => col.key === groupedByColumnKey);
    const displayGroupToggle =
      (frozen && columns.length) || (!frozen && columns.length === this.props.columns.length);
    const modifiers = this.getModifiers();

    return rows.reduce((acc, row, index, arr) => {
      const isFirstRow = index === 0;
      const isLastRow = index === arr.length - 1;
      const isPrecededByDifferentGroup =
        isFirstRow || row[groupedByColumnKey] !== arr[index - 1][groupedByColumnKey];

      const isFollowedByDifferentGroup =
        isLastRow || row[groupedByColumnKey] !== arr[index + 1][groupedByColumnKey];

      const key = rowKeyField(row);
      const uniqueId = `${key}__${index}`;
      const rowIndex = headersCount + summaryRowsCount + 1 + acc.length;
      const collapsed = groupedByColumnKey && !!this.state.collapsedGroups[row[groupedByColumnKey]];

      const sharedProps = {
        collapsed,
        columns,
        context: this.getContext(),
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
            onToggle={this.handleToggleGroup}
            subRows={rows.filter(r => r[groupedByColumnKey] === row[groupedByColumnKey])}
            frozen={frozen}
            groupingColumn={displayGroupToggle ? groupingColumn : undefined}
            groupingColumnWidth={
              columns.length && hasCheckbox
                ? firstColumnWidth + DATAGRID_CHECKBOX_WIDTH
                : firstColumnWidth
            }
            lastRow={collapsed}
          >
            {cells => (
              <>
                {!columns.length && hasCheckbox && (
                  <div
                    className={bemClass('DataGrid__row-checkbox-container', {
                      ...modifiers,
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
      const { labels } = this.getContext();
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
          hasCheckbox={hasCheckbox}
          detached={index === 0 && !groupedRow}
          lastRow={isFollowedByDifferentGroup}
        >
          {cells => (
            <>
              {hasCheckbox && (
                <div
                  className={bemClass('DataGrid__row-checkbox-container', {
                    'first-row': index + groupedRowArr.length === 0,
                    'last-row': index === rows.length - 1,
                    ...modifiers,
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

  renderResizer() {
    const { target, container, parent, resizing, column } = this.state.resizer;
    const minWidth = column && column.editable ? 74 : 64;

    return (
      <DatagridResizer
        left={target.left}
        top={target.top}
        handleHeight={target.height}
        height={container.bottom - target.top}
        maxLeft={parent.left + minWidth}
        maxRight={column && column.frozen ? container.right - minWidth : container.right}
        onStart={this.handleStartResize}
        onStop={this.handleStopResize}
        resizing={resizing}
      />
    );
  }

  renderHorizontalScroll(rowsWidth = 0) {
    if (IS_MAC_OS || !rowsWidth) {
      return null;
    }

    const { offsetWidth: frozenRowsWidth = 0 } = this.frozenRowsNode || {};

    return (
      <div
        className="Datagrid__horizontal-scroll-container"
        ref={this.setScrollNode}
        style={{ width: `calc(100% - ${frozenRowsWidth + DATAGRID_SCROLLBAR_SIZE}px)` }}
      >
        <div className="Datagrid__horizontal-scroll-element" style={{ width: `${rowsWidth}px` }} />
      </div>
    );
  }

  render() {
    const { className, columns, columnHeaders, rows, id } = this.props;
    const staticColumns = columns.filter(({ frozen }) => !frozen);
    const frozenColumns = columns.filter(({ frozen }) => frozen);
    const staticColumnHeaders = columnHeaders
      ? columnHeaders.filter(({ frozen }) => !frozen)
      : staticColumns;
    const frozenColumnHeaders = columnHeaders
      ? columnHeaders.filter(({ frozen }) => frozen)
      : frozenColumns;
    const headersCount = 1;
    const hasCheckbox = typeof this.props.onSelectRow === 'function';

    const { labels } = this.getContext();
    const { offsetWidth: frozenRowsWidth = 0 } = this.frozenRowsNode || {};

    const rowsWidth = sum(staticColumns, 'width');

    return (
      <>
        {this.renderResizer()}
        <div role="rowgroup" className="Datagrid__head">
          {(!!frozenColumns.length || hasCheckbox) && (
            <div role="presentation" className={bemClass('Datagrid__header-row', { frozen: true })}>
              {this.renderHeaderRows(frozenColumnHeaders, true)}
              {this.renderSummaryRow(
                frozenColumns,
                true,
                staticColumns.length,
                DATAGRID_HEADER_ROW_INDEX + 1
              )}
            </div>
          )}
          <div ref={this.setScrollHeaderNode} className="Datagrid__header-row-container">
            <div
              role="presentation"
              ref={this.setStaticHeaderNode}
              className={bemClass('Datagrid__header-row', { static: true })}
              style={{ width: rowsWidth }}
            >
              {this.renderHeaderRows(staticColumnHeaders, false, frozenColumns.length)}
              {this.renderSummaryRow(
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
          aria-rowcount={headersCount + rows.length}
          className={bemClass(
            'Datagrid',
            { 'with-summary': !!this.props.renderSummaryCell },
            className
          )}
          ref={this.containerRef}
        >
          {this.renderHorizontalScroll(rowsWidth)}

          <div role="rowgroup" className="Datagrid__body">
            {this.props.rows.length ? (
              <>
                {(!!frozenColumns.length || hasCheckbox) && (
                  <div
                    role="presentation"
                    ref={this.setFrozenRowsNode}
                    className={bemClass('Datagrid__rows', { frozen: true })}
                  >
                    {this.renderRows(frozenColumns, true, headersCount)}
                  </div>
                )}
                <div
                  role="presentation"
                  className={bemClass('Datagrid__rows', { static: true })}
                  style={{ width: `calc(100% - ${frozenRowsWidth}px)` }}
                >
                  <div
                    className={bemClass('Datagrid__rows-container', { isMacOS: IS_MAC_OS })}
                    ref={this.setStaticRowsNode}
                  >
                    {this.renderRows(staticColumns, false, headersCount, frozenColumns.length)}
                  </div>
                </div>
              </>
            ) : (
              <div className="Datagrid__no-data-label">{labels.errorNoData}</div>
            )}
          </div>
        </div>
      </>
    );
  }
}

Datagrid.displayName = 'Datagrid';

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
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  rowKeyField: PropTypes.func.isRequired,
  labels: PropTypes.shape({
    errorFormula: PropTypes.string,
    a11ySortLabel: PropTypes.string,
    checkboxLabel: PropTypes.string,
    booleanTrue: PropTypes.string,
    booleanFalse: PropTypes.string,
  }),
  renderers: PropTypes.object,
  formatters: PropTypes.object,
  parsers: PropTypes.object,
  renderSummaryCell: PropTypes.func,
  groupedByColumnKey: PropTypes.string,
  selectedRows: PropTypes.array,
  groupedSummaryColumnKeys: PropTypes.arrayOf(PropTypes.string),
  columnHeaders: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
      children: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
        }).isRequired
      ).isRequired,
    }).isRequired
  ),
  onSelectRow: PropTypes.func,
  wrapHeader: PropTypes.bool,
  compact: PropTypes.bool,
  comfortable: PropTypes.bool,
  onChangeWidth: PropTypes.func,
  // --- implicit props => context ---
  // eslint-disable-next-line react/no-unused-prop-types
  locale: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  onSort: PropTypes.func,
  // eslint-disable-next-line react/no-unused-prop-types
  columnSorted: PropTypes.object,
  // eslint-disable-next-line react/no-unused-prop-types
  onClickCellDropdownItem: PropTypes.func,
  getInputProps: PropTypes.func,
};

export default Datagrid;
