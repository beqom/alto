import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../../../helpers/bem';

import DatagridRow from '../DatagridRow';
import ChevronDownIcon from '../../../Icons/ChevronDown';

import './DatagridGroupedRow.scss';

const DatagridGroupedRow = ({
  firstRowInGroup,
  collapsed,
  onToggle,
  context,
  columns,
  ...datagridRowProps
}) => {
  const { id, rowKeyField, groupedByColumnKey, renderSummaryGroupCell } = context;

  const key = rowKeyField(firstRowInGroup);
  const value = firstRowInGroup[groupedByColumnKey];
  const column = columns.find(col => col.key === groupedByColumnKey);

  return (
    <DatagridRow
      {...datagridRowProps}
      row={firstRowInGroup}
      header
      columns={columns.filter(col => col.key !== groupedByColumnKey)}
      render={renderSummaryGroupCell}
      context={context}
    >
      {cells => (
        <Fragment>
          {column && (
            <button
              id={id ? `${id}__${key}-grouped` : undefined}
              className="DatagridGroupedRow__button"
              onClick={() => onToggle(value)}
              style={{ width: column.width, maxWidth: column.width }}
            >
              <ChevronDownIcon
                className={bemClass('DatagridGroupedRow__toggle-icon', { collapsed })}
              />
              {value}
            </button>
          )}
          {cells}
        </Fragment>
      )}
    </DatagridRow>
  );
};

DatagridGroupedRow.displayName = 'DatagridGroupedRow';

DatagridGroupedRow.defaultProps = {};

DatagridGroupedRow.propTypes = {
  firstRowInGroup: PropTypes.object.isRequired,
  collapsed: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  context: PropTypes.shape({
    id: PropTypes.string,
    rowKeyField: PropTypes.func.isRequired,
    groupedByColumnKey: PropTypes.string,
    renderSummaryGroupCell: PropTypes.func.isRequired,
  }),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  // ... and other DatagridRow Props
};

export default DatagridGroupedRow;
