import React from 'react';
import PropTypes from 'prop-types';

import { evaluateFormula } from '../../../helpers/formula';
import { bemClass } from '../../../helpers/bem';

import DatagridRow from '../DatagridRow';
import ChevronDownIcon from '../../../Icons/ChevronDown';

import { getFormattedValue } from '../../helpers';

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

const getModifiers = context => ({
  compact: context.compact,
  comfortable: context.comfortable,
});

const DatagridGroupedRow = ({
  firstRowInGroup,
  collapsed,
  onToggle,
  context,
  columns,
  subRows,
  children,
  groupingColumn,
  groupingColumnWidth,
  ...datagridRowProps
}) => {
  const { id, rowKeyField, groupedByColumnKey, groupedSummaryColumnKeys, labels } = context;
  const labelValue = Object.keys(firstRowInGroup).includes(`${groupedByColumnKey}_lbl`)
    ? firstRowInGroup[`${groupedByColumnKey}_lbl`]
    : firstRowInGroup[groupedByColumnKey];

  const key = rowKeyField(firstRowInGroup);
  const value = firstRowInGroup[groupedByColumnKey];

  const row = columns
    .filter(col => groupedSummaryColumnKeys.includes(col.key))
    .reduce(
      (acc, col) => ({
        ...acc,
        [col.key]: getGroupColumnSummary(col, subRows, labels),
      }),
      {}
    );

  const modifiers = getModifiers(context);
  const style = { width: groupingColumnWidth, maxWidth: groupingColumnWidth };

  const formatValue = getFormattedValue(context);

  return (
    <DatagridRow {...datagridRowProps} row={row} header columns={columns} context={context}>
      {cells =>
        children(
          <>
            {groupingColumn && (
              <button
                id={id ? `${id}__${key}-grouped` : undefined}
                className={bemClass('DatagridGroupedRow__button', modifiers)}
                onClick={() => onToggle(value)}
                style={style}
              >
                <div className="DatagridGroupedRow__toggle-wrapper">
                  <ChevronDownIcon
                    className={bemClass('DatagridGroupedRow__toggle-icon', { collapsed })}
                  />
                </div>
                <div className="DatagridGroupedRow__toggle-content">
                  <div className="DatagridGroupedRow__toggle-name">{groupingColumn.title}</div>
                  <div className="DatagridGroupedRow__toggle-value">
                    {formatValue(labelValue, groupingColumn, row)}
                  </div>
                </div>
              </button>
            )}
            {cells.slice(groupingColumn ? 1 : 0)}
          </>
        )
      }
    </DatagridRow>
  );
};

DatagridGroupedRow.displayName = 'DatagridGroupedRow';

DatagridGroupedRow.defaultProps = {
  children: x => x,
};

const columnPropType = PropTypes.shape({
  key: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  width: PropTypes.number,
});

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
  columns: PropTypes.arrayOf(columnPropType.isRequired).isRequired,
  groupingColumn: columnPropType,
  groupingColumnWidth: PropTypes.number,
  subRows: PropTypes.arrayOf(PropTypes.object).isRequired,
  children: PropTypes.func,
  // ... and other DatagridRow Props
};

export default DatagridGroupedRow;
