import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

import CheckIcon from '../Icons/Check';
import ErrorIcon from '../Icons/ErrorIcon';
import Avatar from '../Avatar';
import { isIE11 } from '../helpers/navigator';
import { bemClass } from '../helpers/bem';
import CheckBox from '../Form/CheckBox';
import Tooltip from '../Tooltip';

import DatagridHeaderRow from './components/DatagridHeaderRow';
import DatagridGroupedRow from './components/DatagridGroupedRow';
import DatagridRow from './components/DatagridRow';
import DatagridResizer from './components/DatagridResizer';

import './Datagrid.scss';

const DEFAULT_LABELS = {
  errorFormula: 'There is an error in formula',
  a11ySortLabel: 'Click to sort this column by Ascending or Descending',
  checkboxLabel: 'Check to select a row',
};

const PARSERS = {};

const FORMATTERS = {
  date: (x, col, row, { locale }) =>
    x instanceof Date
      ? DateTime.fromJSDate(x)
          .setLocale(locale)
          .toLocaleString(DateTime.DATE_SHORT)
      : x,
  float: x =>
    typeof x === 'number'
      ? x.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : '',
  number: x =>
    typeof x === 'number'
      ? x.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })
      : '',
  integer: x =>
    typeof x === 'number'
      ? x.toLocaleString(undefined, {
          maximumFractionDigits: 0,
        })
      : '',
  int: x => FORMATTERS.integer(x),
};

const RENDERERS = {
  boolean: x => (x ? <CheckIcon className="Table__cell-centered-content" /> : null),
  bit: x => RENDERERS.boolean(x),
  image: (x, col, row, { comfortable, compact }) => (
    <Avatar small={compact} large={comfortable} src={x || ''} alt={col.title} />
  ),
  error: x => (
    <Tooltip content={x.message}>
      <ErrorIcon outline />
    </Tooltip>
  ),
};

// Needed in case of the node is not provided as soon as needed
const fakeNode = document.createElement('div');

const HEADER_ROW_INDEX = 1;

const emptyBoundingClientRect = { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };

const initialStateResizer = {
  column: null,
  parent: emptyBoundingClientRect,
  target: emptyBoundingClientRect,
  container: emptyBoundingClientRect,
  resizing: false,
};

class Datagrid extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      collapsedGroups: {},
      resizer: initialStateResizer,
      columnsWidth: {},
    };

    this.scrollingElt = null;
    this.timeout = null;

    this.setStaticHeaderNode = this.setStaticHeaderNode.bind(this);
    this.setFrozenRowsNode = this.setFrozenRowsNode.bind(this);
    this.setStaticRowsNode = this.setStaticRowsNode.bind(this);
    this.handleScrollXStaticHeader = this.handleScrollXStaticHeader.bind(this);
    this.handleScrollYFrozenRows = this.handleScrollYFrozenRows.bind(this);
    this.handleScrollStaticRows = this.handleScrollStaticRows.bind(this);
    this.handleMouseEnterResizeHandle = this.handleMouseEnterResizeHandle.bind(this);
    this.handleToggleGroup = this.handleToggleGroup.bind(this);
    this.handleStopResize = this.handleStopResize.bind(this);
    this.handleStartResize = this.handleStartResize.bind(this);

    this.containerRef = React.createRef();
  }

  componentDidMount() {
    // fix scroll initial value
    setTimeout(() => {
      if (this.staticHeaderNode && this.frozenRowsNode && this.staticRowsNode) {
        this.staticHeaderNode.setAttribute('style', '');
        this.frozenRowsNode.setAttribute('style', '');
        this.staticHeaderNode.scrollLeft = 0;
        this.frozenRowsNode.scrollTop = 0;
        this.staticRowsNode.scrollLeft = 0;
        this.staticRowsNode.scrollTop = 0;
        this.trackDimensions();
      }
      this.setState({ loaded: true });
    }, 0);
  }

  componentDidUpdate() {
    this.trackDimensions();
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

  setStaticHeaderNode(node) {
    this.staticHeaderNode = node || fakeNode;
  }

  setFrozenRowsNode(node) {
    this.frozenRowsNode = node || fakeNode;
  }

  setStaticRowsNode(node) {
    this.staticRowsNode = node || fakeNode;
  }

  trackDimensions() {
    if (this.staticHeaderNode && this.frozenRowsNode && this.staticRowsNode) {
      this.staticHeaderNode.style.width = `${this.staticRowsNode.clientWidth}px`;
      if (!isIE11()) {
        this.frozenRowsNode.style.height = `${this.staticRowsNode.clientHeight}px`;
      }
    }
  }
  handleToggleGroup(groupId) {
    const stateGroupId = this.state.collapsedGroups[groupId];
    const collapsedGroups = {
      ...this.state.collapsedGroups,
      [groupId]: !stateGroupId,
    };
    this.setState({ collapsedGroups });
  }

  handleScrollXStaticHeader() {
    if (!this.scrollingElt || this.scrollingElt === 'handleScrollXStaticHeader') {
      this.scrollingElt = 'handleScrollXStaticHeader';
      this.staticRowsNode.scrollLeft = this.staticHeaderNode.scrollLeft;
      this.resetScrollingElt();
    }
  }

  handleScrollYFrozenRows() {
    if (!this.scrollingElt || this.scrollingElt === 'handleScrollYFrozenRows') {
      this.scrollingElt = 'handleScrollYFrozenRows';
      this.staticRowsNode.scrollTop = this.frozenRowsNode.scrollTop;
      this.resetScrollingElt();
    }
  }

  handleScrollStaticRows() {
    if (!this.scrollingElt || this.scrollingElt === 'handleScrollStaticRows') {
      this.scrollingElt = 'handleScrollStaticRows';
      this.staticHeaderNode.scrollLeft = this.staticRowsNode.scrollLeft;
      this.frozenRowsNode.scrollTop = this.staticRowsNode.scrollTop;
      this.resetScrollingElt();
    }
  }

  resetScrollingElt() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.staticHeaderNode.scrollLeft = this.staticRowsNode.scrollLeft;
      this.frozenRowsNode.scrollTop = this.staticRowsNode.scrollTop;
      this.scrollingElt = null;
    }, 200);
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
    this.setState(({ columnsWidth, resizer }) => ({
      resizer: initialStateResizer,
      columnsWidth: { ...columnsWidth, [resizer.column.key]: resizer.parent.width + deltaX },
    }));
  }

  renderHeaderRows(columns, hasCheckBox, columnIndexStart = 0, extraCell) {
    return (
      <DatagridHeaderRow
        rowIndex={HEADER_ROW_INDEX}
        columns={columns}
        columnIndexStart={columnIndexStart}
        context={this.getContext()}
        hasCheckBox={hasCheckBox}
        extraCell={extraCell}
      />
    );
  }

  renderSummaryRow(
    columns,
    numberOfRows,
    headersCount = 1,
    columnIndexStart = 0,
    hasCheckBox,
    extraCell
  ) {
    const { renderSummaryCell } = this.props;
    if (!renderSummaryCell || !numberOfRows) return null;

    const modifiers = this.getModifiers();

    return (
      <DatagridRow
        columns={columns}
        index={0}
        header
        rowIndex={headersCount + 1}
        context={this.getContext()}
        render={renderSummaryCell}
        columnIndexStart={columnIndexStart}
        extraCell={extraCell}
      >
        {cells => (
          <Fragment>
            {hasCheckBox && <div className={bemClass('DataGrid__row-checkbox', modifiers)} />}
            {cells}
          </Fragment>
        )}
      </DatagridRow>
    );
  }

  renderRows(columns, hasCheckBox, headersCount = 1, columnIndexStart = 0, extraCell) {
    const {
      rowKeyField,
      renderSummaryCell,
      groupedByColumnKey,
      rows,
      id,
      selectedRows,
      onSelectRow,
    } = this.props;
    const summaryRowsCount = renderSummaryCell ? 1 : 0;

    return rows.reduce((acc, row, index, arr) => {
      const isFirstRow = index === 0;
      const isPrecededByDifferentGroup =
        isFirstRow || row[groupedByColumnKey] !== arr[index - 1][groupedByColumnKey];

      const key = rowKeyField(row);
      const uniqueId = `${key}__${index}`;
      const rowIndex = headersCount + summaryRowsCount + 1 + acc.length;
      const sharedProps = {
        collapsed: groupedByColumnKey && !!this.state.collapsedGroups[row[groupedByColumnKey]],
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
            extraCell={extraCell}
          />
        ) : null;

      const groupedRowArr = groupedRow ? [groupedRow] : [];
      const { labels } = this.getContext();
      const modifiers = this.getModifiers();
      return [
        ...acc,
        ...groupedRowArr,
        <DatagridRow
          {...sharedProps}
          key={uniqueId}
          row={row}
          rowIndex={rowIndex + groupedRowArr.length + 1}
          extraCell={extraCell}
        >
          {cells => (
            <Fragment>
              {hasCheckBox && (
                <CheckBox
                  id={`${id || 'Datagrid'}__${key}-checkbox`}
                  className={bemClass('DataGrid__row-checkbox', modifiers)}
                  label={labels.checkboxLabel}
                  hideLabel
                  checked={(selectedRows || []).includes(key)}
                  onChange={() => onSelectRow(row)}
                />
              )}
              {cells}
            </Fragment>
          )}
        </DatagridRow>,
      ];
    }, []);
  }

  renderResizer() {
    const { target, container, parent, resizing } = this.state.resizer;

    return (
      <DatagridResizer
        left={target.left}
        top={target.top}
        handleHeight={target.height}
        height={container.bottom - target.top}
        maxLeft={parent.left + 64}
        maxRight={container.right}
        onStart={this.handleStartResize}
        onStop={this.handleStopResize}
        resizing={resizing}
      />
    );
  }

  render() {
    const { className, columns, columnHeaders, rows, onSelectRow, id } = this.props;
    const staticColumns = columns.filter(({ frozen }) => !frozen);
    const frozenColumns = columns.filter(({ frozen }) => frozen);
    const staticColumnHeaders = columnHeaders
      ? columnHeaders.filter(({ frozen }) => !frozen)
      : staticColumns;
    const frozenColumnHeaders = columnHeaders
      ? columnHeaders.filter(({ frozen }) => frozen)
      : frozenColumns;
    const headersCount = 1;

    const { labels } = this.getContext();

    const hasCheckbox = typeof onSelectRow === 'function';
    return (
      <div
        id={id}
        role="grid"
        aria-rowcount={headersCount + rows.length}
        className={bemClass('Datagrid', { loaded: this.state.loaded }, className)}
        ref={this.containerRef}
      >
        {this.renderResizer()}
        <div role="rowgroup" className="Datagrid__head">
          <div role="presentation" className={bemClass('Datagrid__header-row', { frozen: true })}>
            {this.renderHeaderRows(frozenColumnHeaders, hasCheckbox)}
            {this.renderSummaryRow(
              frozenColumns,
              staticColumns.length,
              HEADER_ROW_INDEX + 1,
              frozenColumns.length,
              hasCheckbox
            )}
          </div>
          <div
            role="presentation"
            ref={this.setStaticHeaderNode}
            onScroll={this.handleScrollXStaticHeader}
            className={bemClass('Datagrid__header-row', { static: true })}
          >
            {this.renderHeaderRows(staticColumnHeaders, false, frozenColumns.length, true)}
            {this.renderSummaryRow(
              staticColumns,
              staticColumns.length,
              HEADER_ROW_INDEX + 1,
              frozenColumns.length,
              false,
              true
            )}
          </div>
        </div>

        <div role="rowgroup" className="Datagrid__body">
          {this.props.rows.length ? (
            <Fragment>
              <div
                role="presentation"
                ref={this.setFrozenRowsNode}
                onScroll={this.handleScrollYFrozenRows}
                className={bemClass('Datagrid__rows', { frozen: true })}
              >
                {this.renderRows(frozenColumns, hasCheckbox, headersCount)}
              </div>
              <div role="presentation" className={bemClass('Datagrid__rows', { static: true })}>
                <div
                  className="Datagrid__rows-container"
                  ref={this.setStaticRowsNode}
                  onScroll={this.handleScrollStaticRows}
                >
                  {this.renderRows(staticColumns, false, headersCount, frozenColumns.length, true)}
                </div>
              </div>
            </Fragment>
          ) : (
            <div className="Datagrid__no-data-label">{labels.errorNoData}</div>
          )}
        </div>
      </div>
    );
  }
}

Datagrid.displayName = 'Datagrid';

Datagrid.defaultProps = {
  disabled: col => col.disabled,
  editable: col => col.editable,
  edited: () => false,
  modifiers: () => {},
  showError: () => false,
  locale: 'en-US',
  wrapHeader: false,
  groupedSummaryColumnKeys: [],
  onClickCellDropdownItem: () => {},
};

Datagrid.propTypes = {
  id: PropTypes.string,
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
  // --- implicit props => context ---
  // eslint-disable-next-line react/no-unused-prop-types
  locale: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  onSort: PropTypes.func,
  // eslint-disable-next-line react/no-unused-prop-types
  columnSorted: PropTypes.object,
  // eslint-disable-next-line react/no-unused-prop-types
  onClickCellDropdownItem: PropTypes.func,
};

export default Datagrid;
