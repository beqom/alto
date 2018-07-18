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
    };

    this.setStaticHeaderNode = this.setStaticHeaderNode.bind(this);
    this.setFrozenRowsNode = this.setFrozenRowsNode.bind(this);
    this.setStaticRowsNode = this.setStaticRowsNode.bind(this);
    this.handleScrollXStaticHeader = this.handleScrollXStaticHeader.bind(this);
    this.handleScrollYFrozenRows = this.handleScrollYFrozenRows.bind(this);
    this.handleScrollXStaticRows = this.handleScrollXStaticRows.bind(this);
    this.handleScrollYStaticRows = this.handleScrollYStaticRows.bind(this);
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

  renderRows(columns, headersCount, columnIndexStart = 0) {
    const { rowKeyField } = this.props;
    return this.props.rows.map((row, index) => (
      <DatagridRow
        key={rowKeyField(row)}
        columns={columns}
        row={row}
        rowIndex={index + headersCount}
        index={index}
        context={this.getContext()}
        columnIndexStart={columnIndexStart}
      />
    ));
  }

  render() {
    const { className, columns, rows, id } = this.props;
    const staticColumns = columns.filter(({ frozen }) => !frozen);
    const frozenColumns = columns.filter(({ frozen }) => frozen);
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
            {this.renderHeaderRows(frozenColumns)}
          </div>
          <div role="presentation" className={bemClass('Datagrid__header-row', { static: true })}>
            <PerfectScrollbar
              containerRef={this.setStaticHeaderNode}
              onScrollX={this.handleScrollXStaticHeader}
            >
              {this.renderHeaderRows(staticColumns, frozenColumns.length)}
            </PerfectScrollbar>
          </div>
        </div>

        <div role="rowgroup" className="Datagrid__body">
          <div role="presentation" className={bemClass('Datagrid__rows', { frozen: true })}>
            <PerfectScrollbar
              containerRef={this.setFrozenRowsNode}
              onScrollY={this.handleScrollYFrozenRows}
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
  // --- implicit props => context ---
  // eslint-disable-next-line react/no-unused-prop-types
  locale: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  onSort: PropTypes.func,
  // eslint-disable-next-line react/no-unused-prop-types
  columnSorted: PropTypes.object,
};

export default Datagrid;

/*
iv(role="grid")
  div(role="presentation")
  div(role="row")
    div(role="columheader") foo
    div(role="columnheader") bar
  div(role="presentation")
  each cols, i in Array(50)
    div(role="row")
      each cols, j in Array(20)
        div(role="gridcell") #{i} - #{j}

*/
