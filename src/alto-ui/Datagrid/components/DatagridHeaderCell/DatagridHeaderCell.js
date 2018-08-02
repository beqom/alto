/* eslint-disable jsx-a11y/aria-role */
import React from 'react';
import PropTypes from 'prop-types';

import ChevronUpIcon from '../../../Icons/ChevronUp';
import ChevronDownIcon from '../../../Icons/ChevronDown';
import FilterIcon from '../../../Icons/Filter';
import VisuallyHidden from '../../../VisuallyHidden';
import { bemClass } from '../../../helpers/bem';

import './DatagridHeaderCell.scss';

class DatagridHeaderCell extends React.Component {
  renderContent(style, sorted, wrapped) {
    const { context, column } = this.props;

    const titleStyle = {
      ...(wrapped && wrapped !== true ? { maxHeight: `${wrapped * 1.2}em` } : {}),
    };

    if (!context.onSort) {
      return (
        <div
          className={bemClass('DatagridHeaderCell__content', { wrapped })}
          title={column.title}
          style={style}
        >
          <span className={bemClass('DatagridHeaderCell__title', { wrapped })} style={titleStyle}>
            {column.title}
          </span>
        </div>
      );
    }

    const sortedASC = (sorted && context.sortDirection === 1) || column.sortDirection === 1;
    const sortedDESC = (sorted && context.sortDirection === -1) || column.sortDirection === -1;

    return (
      <button
        id={context.id ? `${context.id}__header-button--${column.key}` : undefined}
        className={bemClass('DatagridHeaderCell__content', { button: true, wrapped })}
        onClick={() => context.onSort(column)}
        style={style}
        title={column.title}
      >
        <VisuallyHidden>{context.labels.a11ySortLabel}</VisuallyHidden>
        {column.filtered ? (
          <FilterIcon className={bemClass('DatagridHeaderCell__icon', { filter: true })} />
        ) : null}
        <span
          className={bemClass('DatagridHeaderCell__title', { sortable: true, wrapped })}
          style={titleStyle}
        >
          {column.title}
        </span>
        <div className="DatagridHeaderCell__sortable-icons">
          <div
            className={bemClass('DatagridHeaderCell__icon', {
              active: sortedASC,
            })}
          >
            <ChevronUpIcon />
          </div>
          <div
            className={bemClass('DatagridHeaderCell__icon', {
              active: sortedDESC,
            })}
          >
            <ChevronDownIcon />
          </div>
        </div>
      </button>
    );
  }

  render() {
    const { column, context, rowIndex, colIndex, first, last } = this.props;

    const wrapped = context.wrapHeader(column);
    const { width } = column;

    const style = {
      ...(width || width === 0 ? { width, maxWidth: width } : {}),
      ...(wrapped && wrapped !== true ? { maxHeight: `${wrapped * 1.2 + 1.8}em` } : {}),
    };

    const sorted = column.key === context.columnSorted || [1, -1].includes(column.sortDirection);

    return (
      <div
        key={column.key}
        className={bemClass('DatagridHeaderCell', {
          sortable: !!context.onSort,
          sorted,
          filtered: column.filtered,
          first,
          last,
          wrapped,
        })}
        style={style}
        role="columheader"
        aria-rowindex={rowIndex}
        aria-colindex={colIndex}
      >
        {this.renderContent(style, sorted, wrapped)}
      </div>
    );
  }
}

DatagridHeaderCell.defaultProps = {
  first: false,
  last: false,
};

DatagridHeaderCell.propTypes = {
  context: PropTypes.shape({
    labels: PropTypes.shape({
      a11ySortLabel: PropTypes.string.isRequired,
    }).isRequired,
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
};

export default DatagridHeaderCell;
