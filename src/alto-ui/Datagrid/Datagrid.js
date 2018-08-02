import React, { Fragment } from 'react';
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
    this.handleToggleGroup = this.handleToggleGroup.bind(this);
  }

  componentDidMount() {
    // fix scroll initial value
    setTimeout(() => {
      this.staticHeaderNode.scrollLeft = 0;
      this.frozenRowsNode.scrollTop = 0;
      this.staticRowsNode.scrollLeft = 0;
      this.staticRowsNode.scrollTop = 0;
      this.setState({ loaded: true });
    }, 0);
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
    this.staticHeaderNode = node;
  }

  setFrozenRowsNode(node) {
    this.frozenRowsNode = node;
  }

  setStaticRowsNode(node) {
    this.staticRowsNode = node;
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
  }

  handleScrollYStaticRows() {
    this.frozenRowsNode.scrollTop = this.staticRowsNode.scrollTop;
  }

  renderHeaderRows(columns, columnIndexStart = 0) {
    return (
      <DatagridHeaderRow
        rowIndex={1}
        columns={columns}
        columnIndexStart={columnIndexStart}
        context={this.getContext()}
      />
    );
  }

  renderSummuryRow(columns, headersCount = 1, columnIndexStart = 0) {
    const { renderSummaryCell } = this.props;
    if (!renderSummaryCell) return null;

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

    const rows = this.props.rows.reduce((acc, row, index, arr) => {
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

    return (
      <Fragment>
        {this.renderSummuryRow(columns, headersCount, columnIndexStart)}
        {rows}
      </Fragment>
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
          </div>
          <div role="presentation" className={bemClass('Datagrid__header-row', { static: true })}>
            <PerfectScrollbar
              containerRef={this.setStaticHeaderNode}
              onScrollX={this.handleScrollXStaticHeader}
              option={{ suppressScrollY: true }}
            >
              {this.renderHeaderRows(staticColumnHeaders, frozenColumns.length)}
            </PerfectScrollbar>
          </div>
        </div>

        <div role="rowgroup" className="Datagrid__body">
          <div role="presentation" className={bemClass('Datagrid__rows', { frozen: true })}>
            <PerfectScrollbar
              containerRef={this.setFrozenRowsNode}
              onScrollY={this.handleScrollYFrozenRows}
              option={{ suppressScrollX: true }}
            >
              {this.renderRows(frozenColumns, headersCount)}
            </PerfectScrollbar>
          </div>
          <div role="presentation" className={bemClass('Datagrid__rows', { static: true })}>
            <PerfectScrollbar
              containerRef={this.setStaticRowsNode}
              onScrollX={this.handleScrollXStaticRows}
              onScrollY={this.handleScrollYStaticRows}
            >
              {this.renderRows(staticColumns, headersCount, frozenColumns.length)}
            </PerfectScrollbar>
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
