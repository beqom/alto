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
  renderContent(style, sorted) {
    const { context, column } = this.props;
    if (!context.onSort) {
      return (
        <div className="DatagridHeaderCell__content" title={column.title}>
          {column.title}
        </div>
      );
    }

    const sortedASC = (sorted && context.sortDirection === 1) || column.sortDirection === 1;
    const sortedDESC = (sorted && context.sortDirection === -1) || column.sortDirection === -1;

    return (
      <button
        id={context.id ? `${context.id}__header-button--${column.key}` : undefined}
        className={bemClass('DatagridHeaderCell__content', { button: true })}
        onClick={() => context.onSort(column)}
        style={style}
        title={column.title}
      >
        <VisuallyHidden>{context.labels.a11ySortLabel}</VisuallyHidden>
        {column.filtered ? (
          <FilterIcon className={bemClass('DatagridHeaderCell__icon', { filter: true })} />
        ) : null}
        <span className="DatagridHeaderCell__title">{column.title}</span>
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

    const style =
      column.width || column.width === 0 ? { width: column.width, maxWidth: column.width } : {};

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
        })}
        style={style}
        role="columheader"
        aria-rowindex={rowIndex}
        aria-colindex={colIndex}
      >
        {this.renderContent(style, sorted)}
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
