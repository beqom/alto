import React from 'react';

import ChevronUpIcon from '../../../Icons/ChevronUp';
import ChevronDownIcon from '../../../Icons/ChevronDown';
import FilterIcon from '../../../Icons/Filter';
import VisuallyHidden from '../../../VisuallyHidden';
import { bemClass } from '../../../helpers/bem';

import './DatagridHeaderCellContent.scss';

const DataGridHeaderCellContent = ({
  style,
  sorted,
  wrapped,
  onSort,
  sortDirection,
  id,
  labels,
  column,
}) => {
  const titleStyle = {
    ...(wrapped && wrapped !== true ? { maxHeight: `${wrapped * 1.2}em` } : {}),
  };

  if (!onSort || column.sortable === false) {
    return (
      <div className={bemClass('DatagridHeaderCellContent', { wrapped })} style={style}>
        <span
          className={bemClass('DatagridHeaderCellContent__title', { wrapped })}
          style={titleStyle}
        >
          {column.title}
        </span>
      </div>
    );
  }

  const sortedASC = (sorted && sortDirection === 1) || column.sortDirection === 1;
  const sortedDESC = (sorted && sortDirection === -1) || column.sortDirection === -1;

  return (
    <button
      id={id ? `${id}__header-button--${column.key}` : undefined}
      className={bemClass('DatagridHeaderCellContent', { button: true, wrapped })}
      onClick={() => onSort(column)}
      style={style}
      title={column.title}
    >
      <VisuallyHidden>{labels.a11ySortLabel}</VisuallyHidden>
      {column.filtered ? (
        <FilterIcon className={bemClass('DatagridHeaderCellContent__icon', { filter: true })} />
      ) : null}
      <span
        className={bemClass('DatagridHeaderCellContent__title', { sortable: true, wrapped })}
        style={titleStyle}
      >
        {column.title}
      </span>
      <div className="DatagridHeaderCellContent__sortable-icons">
        <div
          className={bemClass('DatagridHeaderCellContent__icon', {
            active: sortedASC,
          })}
        >
          <ChevronUpIcon />
        </div>
        <div
          className={bemClass('DatagridHeaderCellContent__icon', {
            active: sortedDESC,
          })}
        >
          <ChevronDownIcon />
        </div>
      </div>
    </button>
  );
};

export default DataGridHeaderCellContent;
