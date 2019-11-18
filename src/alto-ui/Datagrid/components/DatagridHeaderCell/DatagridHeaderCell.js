/* eslint-disable jsx-a11y/aria-role */
import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

import DataGridHeaderCellContent from './DatagridHeaderCellContent';

import { bemClass } from '../../../helpers/bem';

import './DatagridHeaderCell.scss';

class DatagridHeaderCell extends React.Component {
  constructor(props) {
    super(props);

    this.handleMouseEnterResizeHandle = this.handleMouseEnterResizeHandle.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.width !== nextProps.width ||
      this.props.colIndex !== nextProps.colIndex ||
      this.props.rowIndex !== nextProps.rowIndex ||
      this.props.first !== nextProps.first ||
      this.props.last !== nextProps.last ||
      !isEqual(this.props.column, nextProps.column)
    );
  }

  handleMouseEnterResizeHandle(e) {
    this.props.context.onMouseEnterResizeHandle(e, this.props.column);
  }

  render() {
    const {
      column,
      context,
      rowIndex,
      colIndex,
      last,
      width,
      firstCellInRow,
      lastCellInRow,
      firstRow,
    } = this.props;
    const wrapped = context.wrapHeader;
    const style = {
      width,
      minWidth: column.editable ? '4.625rem' : '2rem',
      maxWidth: width,
    };

    const sorted = column.key === context.columnSorted || [1, -1].includes(column.sortDirection);

    return (
      <div
        key={column.key}
        className={bemClass('DatagridHeaderCell', {
          sortable: !!context.onSort && column.sortable !== false,
          sorted,
          filtered: column.filtered,
          'first-row': firstRow,
          'first-in-row': firstCellInRow,
          'last-in-row': lastCellInRow,
          last,
          wrapped,
        })}
        style={style}
        role="columheader"
        aria-rowindex={rowIndex}
        aria-colindex={colIndex}
      >
        <DataGridHeaderCellContent
          style={style}
          sorted={sorted}
          wrapped={wrapped}
          context={context}
          column={column}
        />
        <div
          className="DatagridHeaderCell__resize-handle"
          onMouseEnter={this.handleMouseEnterResizeHandle}
        />
      </div>
    );
  }
}

DatagridHeaderCell.defaultProps = {
  first: false,
  last: false,
  width: 150,
};

DatagridHeaderCell.propTypes = {
  context: PropTypes.shape({
    labels: PropTypes.shape({
      a11ySortLabel: PropTypes.string.isRequired,
    }).isRequired,
    onMouseEnterResizeHandle: PropTypes.func.isRequired,
    sortDirection: PropTypes.number,
    onSort: PropTypes.func,
    columnSorted: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.any.isRequired,
        title: PropTypes.any.isRequired,
        description: PropTypes.string,
        type: PropTypes.string,
        width: PropTypes.number,
        formula: PropTypes.string,
      })
    ),
  }).isRequired,
  column: PropTypes.shape({
    key: PropTypes.any.isRequired,
    title: PropTypes.any.isRequired,
    description: PropTypes.string,
    type: PropTypes.string,
    width: PropTypes.number,
    formula: PropTypes.string,
  }),
  rowIndex: PropTypes.number.isRequired,
  colIndex: PropTypes.number.isRequired,
  first: PropTypes.bool,
  last: PropTypes.bool,
  width: PropTypes.number,
};

export default DatagridHeaderCell;
