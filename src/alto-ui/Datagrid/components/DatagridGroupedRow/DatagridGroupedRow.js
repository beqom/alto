import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { evaluateFormula } from '../../../helpers/formula';
import { bemClass } from '../../../helpers/bem';

import DatagridRow from '../DatagridRow';
import ChevronDownIcon from '../../../Icons/ChevronDown';

import './DatagridGroupedRow.scss';

const sum = xs => xs.reduce((a, b) => a + b);

const getGroupColumnSummary = (column, rows, labels) => {
  if (column.formula) {
    const rowResults = rows.map(r => evaluateFormula(column.formula, r, labels.errorFormula));
    const error = rowResults.find(res => res instanceof Error);
    if (error) return error;
    return sum(rowResults);
  }
  return sum(rows.map(r => parseFloat(r[column.key] || 0)));
};

const DatagridGroupedRow = ({
  firstRowInGroup,
  collapsed,
  onToggle,
  context,
  columns,
  subRows,
  ...datagridRowProps
}) => {
  const { id, rowKeyField, groupedByColumnKey, groupedSummaryColumnKeys, labels } = context;

  const key = rowKeyField(firstRowInGroup);
  const value = firstRowInGroup[groupedByColumnKey];
  const column = columns.find(col => col.key === groupedByColumnKey);

  const row = columns.filter(col => groupedSummaryColumnKeys.includes(col.key)).reduce(
    (acc, col) => ({
      ...acc,
      [col.key]: getGroupColumnSummary(col, subRows, labels),
    }),
    {}
  );

  return (
    <DatagridRow
      {...datagridRowProps}
      row={row}
      header
      columns={columns.filter(col => col.key !== groupedByColumnKey)}
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
    groupedSummaryColumnKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
    labels: PropTypes.object.isRequired,
  }),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  subRows: PropTypes.arrayOf(PropTypes.object).isRequired,
  // ... and other DatagridRow Props
};

export default DatagridGroupedRow;
