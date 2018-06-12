import React from 'react';
import PropTypes from 'prop-types';

import ChevronUpIcon from '../Icons/ChevronUp';
import ChevronDownIcon from '../Icons/ChevronDown';
import FilterIcon from '../Icons/Filter';
import { bemClass } from '../helpers/bem';

const TableHeader = ({
  tableId,
  columns,
  isFirstColumnFrozen,
  onSort,
  columnSorted,
  sortDirection,
}) => (
  <thead>
    <tr>
      {columns.map((col, colIndex) => {
        const style = col.width || col.width === 0 ? { width: col.width, maxWidth: col.width } : {};
        const frozen = colIndex === 0 && isFirstColumnFrozen;
        if (onSort) {
          const sorted = col.key === columnSorted || [1, -1].includes(col.sortDirection);
          const { filtered } = col;
          return (
            <th
              key={col.key}
              className={bemClass('Table__cell', {
                header: true,
                sortable: true,
                sorted,
                filtered,
                frozen,
              })}
              style={style}
            >
              <button
                id={tableId ? `${tableId}__header-button--${col.key}` : undefined}
                className="Table__cell-button Table__cell-content Table__cell-content--header"
                onClick={() => onSort(col)}
                style={style}
                title={col.title}
              >
                {filtered ? <FilterIcon className="Table__filter-icon" /> : null}
                <span className="Table__header-cell-title">{col.title}</span>
                <div className="Table__header-cell-sortable-icons">
                  <div
                    className={bemClass('Table__header-cell-sortable-icon', {
                      active: (sorted && sortDirection === 1) || col.sortDirection === 1,
                    })}
                  >
                    <ChevronUpIcon />
                  </div>
                  <div
                    className={bemClass('Table__header-cell-sortable-icon', {
                      active: (sorted && sortDirection === -1) || col.sortDirection === -1,
                    })}
                  >
                    <ChevronDownIcon />
                  </div>
                </div>
              </button>
            </th>
          );
        }

        return (
          <th
            key={col.key}
            style={style}
            className={bemClass('Table__cell', {
              header: true,
              frozen,
            })}
          >
            <div className="Table__cell-content Table__cell-content--header" title={col.title}>
              {col.title}
            </div>
          </th>
        );
      })}
    </tr>
  </thead>
);

TableHeader.propTypes = {
  tableId: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.any.isRequired,
      title: PropTypes.any.isRequired,
      description: PropTypes.string,
      type: PropTypes.string,
      width: PropTypes.number,
      formula: PropTypes.string,
    })
  ),
  isFirstColumnFrozen: PropTypes.bool,
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
  sortDirection: PropTypes.number,
};

export default TableHeader;
