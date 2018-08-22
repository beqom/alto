import React from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { DateTime } from 'luxon';

import CheckIcon from '../Icons/Check';
import ErrorIcon from '../Icons/ErrorIcon';
import Avatar from '../Avatar';

import { bemClass } from '../helpers/bem';
import DatagridHeaderRow from './components/DatagridHeaderRow';
import DatagridGroupedRow from './components/DatagridGroupedRow';
import DatagridRow from './components/DatagridRow';

import './Datagrid.scss';

const DEFAULT_LABELS = {
  errorFormula: 'There is an error in formula',
  a11ySortLabel: 'Click to sort this column by Ascending or Descending',
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
  error: x => <ErrorIcon outline title={x.message} />,
};

// Needed in case of the node is not provided as soon as needed
const fakeNode = document.createElement('div');

const HEADER_ROW_INDEX = 1;

class Datagrid extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      loaded: false,
      collapsedGroups: {},
    };

    this.setStaticHeaderNode = this.setStaticHeaderNode.bind(this);
    this.setFrozenRowsNode = this.setFrozenRowsNode.bind(this);
    this.setStaticRowsNode = this.setStaticRowsNode.bind(this);
    this.handleScrollXStaticHeader = this.handleScrollXStaticHeader.bind(this);
    this.handleScrollYFrozenRows = this.handleScrollYFrozenRows.bind(this);
    this.handleScrollXStaticRows = this.handleScrollXStaticRows.bind(this);
    this.handleScrollYStaticRows = this.handleScrollYStaticRows.bind(this);
    this.handleScrollStaticRows = this.handleScrollStaticRows.bind(this);
    this.handleToggleGroup = this.handleToggleGroup.bind(this);
  }

  componentDidMount() {
    // fix scroll initial value
    setTimeout(() => {
      this.staticHeaderNode.setAttribute('style', '');
      this.frozenRowsNode.setAttribute('style', '');
      this.staticHeaderNode.scrollLeft = 0;
      this.frozenRowsNode.scrollTop = 0;
      this.staticRowsNode.scrollLeft = 0;
      this.staticRowsNode.scrollTop = 0;
      this.trackDimensions();
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
    this.staticHeaderNode.style.width = `${this.staticRowsNode.clientWidth}px`;
    this.frozenRowsNode.style.height = `${this.staticRowsNode.clientHeight}px`;
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
    this.staticRowsNode.scrollLeft = this.staticHeaderNode.scrollLeft;
  }

  handleScrollYFrozenRows() {
    this.staticRowsNode.scrollTop = this.frozenRowsNode.scrollTop;
  }

  handleScrollXStaticRows() {
    this.staticHeaderNode.scrollLeft = this.staticRowsNode.scrollLeft;
    this.frozenRowsNode.scrollTop = this.staticRowsNode.scrollTop;
  }

  handleScrollYStaticRows() {
    this.frozenRowsNode.scrollTop = this.staticRowsNode.scrollTop;
  }

  handleScrollStaticRows() {
    this.staticHeaderNode.scrollLeft = this.staticRowsNode.scrollLeft;
    this.frozenRowsNode.scrollTop = this.staticRowsNode.scrollTop;
  }

  renderHeaderRows(columns, columnIndexStart = 0) {
    return (
      <DatagridHeaderRow
        rowIndex={HEADER_ROW_INDEX}
        columns={columns}
        columnIndexStart={columnIndexStart}
        context={this.getContext()}
      />
    );
  }

  renderSummaryRow(columns, numberOfRows, headersCount = 1, columnIndexStart = 0) {
    const { renderSummaryCell } = this.props;
    if (!renderSummaryCell || !numberOfRows) return null;

    return (
      <DatagridRow
        columns={columns}
        index={0}
        header
        rowIndex={headersCount + 1}
        context={this.getContext()}
        render={renderSummaryCell}
        columnIndexStart={columnIndexStart}
      />
    );
  }

  renderRows(columns, headersCount = 1, columnIndexStart = 0) {
    const { rowKeyField, renderSummaryCell, groupedByColumnKey } = this.props;
    const summaryRowsCount = renderSummaryCell ? 1 : 0;

    return this.props.rows.reduce((acc, row, index, arr) => {
      const isFirstRow = index === 0;
      const isPrecededByDifferentGroup =
        isFirstRow || row[groupedByColumnKey] !== arr[index - 1][groupedByColumnKey];

      const key = rowKeyField(row);
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
            key={`${key}--group`}
            firstRowInGroup={row}
            rowIndex={rowIndex}
            onToggle={this.handleToggleGroup}
          />
        ) : null;

      const groupedRowArr = groupedRow ? [groupedRow] : [];

      return [
        ...acc,
        ...groupedRowArr,
        <DatagridRow
          {...sharedProps}
          key={key}
          row={row}
          rowIndex={rowIndex + groupedRowArr.length + 1}
        />,
      ];
    }, []);
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

    return (
      <div
        id={id}
        role="grid"
        aria-rowcount={headersCount + rows.length}
        className={bemClass('Datagrid', { loaded: this.state.loaded }, className)}
      >
        <div role="rowgroup" className="Datagrid__head">
          <div role="presentation" className={bemClass('Datagrid__header-row', { frozen: true })}>
            {this.renderHeaderRows(frozenColumnHeaders)}
            {this.renderSummaryRow(
              frozenColumns,
              staticColumns.length,
              HEADER_ROW_INDEX + 1,
              frozenColumns.length
            )}
          </div>
          <div role="presentation" className={bemClass('Datagrid__header-row', { static: true })}>
            <PerfectScrollbar
              containerRef={this.setStaticHeaderNode}
              onScrollX={this.handleScrollXStaticHeader}
              option={{ suppressScrollY: true }}
              className="DataGrid__perfect-scrollbar"
            >
              {this.renderHeaderRows(staticColumnHeaders, frozenColumns.length)}
              {this.renderSummaryRow(
                staticColumns,
                staticColumns.length,
                HEADER_ROW_INDEX + 1,
                frozenColumns.length
              )}
            </PerfectScrollbar>
          </div>
        </div>

        <div role="rowgroup" className="Datagrid__body">
          <div role="presentation" className={bemClass('Datagrid__rows', { frozen: true })}>
            <PerfectScrollbar
              containerRef={this.setFrozenRowsNode}
              onScrollY={this.handleScrollYFrozenRows}
              option={{ suppressScrollX: true }}
              className="DataGrid__perfect-scrollbar"
            >
              {this.renderRows(frozenColumns, headersCount)}
            </PerfectScrollbar>
          </div>
          <div role="presentation" className={bemClass('Datagrid__rows', { static: true })}>
            {/* <PerfectScrollbar
              containerRef={this.setStaticRowsNode}
              onScrollX={this.handleScrollXStaticRows}
              onScrollY={this.handleScrollYStaticRows}
            > */}
            <div
              className="Datagrid__rows-container"
              ref={this.setStaticRowsNode}
              onScroll={this.handleScrollStaticRows}
            >
              {this.renderRows(staticColumns, headersCount, frozenColumns.length)}
            </div>
            {/* </PerfectScrollbar> */}
          </div>
        </div>
      </div>
    );
  }
}

Datagrid.displayName = 'Datagrid';

Datagrid.defaultProps = {
  editable: col => col.editable,
  edited: () => false,
  modifiers: () => {},
  showError: () => false,
  locale: 'en-US',
  wrapHeader: () => false,
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
  wrapHeader: PropTypes.func,
  // --- implicit props => context ---
  // eslint-disable-next-line react/no-unused-prop-types
  locale: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  onSort: PropTypes.func,
  // eslint-disable-next-line react/no-unused-prop-types
  columnSorted: PropTypes.object,
};

export default Datagrid;
