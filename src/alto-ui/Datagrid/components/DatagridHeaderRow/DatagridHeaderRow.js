import React from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../../../helpers/bem';
import CheckBox from '../../../Form/CheckBox';

import DatagridHeaderCell from '../DatagridHeaderCell';

import './DatagridHeaderRow.scss';

const renderCheckbox = (context, rowIndex) => {
  const { columnHeaders, wrapHeader, labels, id } = context;

  const column = columnHeaders[0] || {};
  const checkboxId = `${id || 'DatagridHeaderRow'}__${rowIndex}-checkbox`;
  if (column.children && column.children.length) {
    const wrapped = wrapHeader(column.children[0]);

    const style = {
      ...(wrapped && wrapped !== true ? { height: `${wrapped * 1.2 + 1.8}em` } : {}),
    };

    return (
      <div className="DatagridHeaderRow__group">
        <div className="DatagridHeaderRow__group-title DatagridHeaderRow__group-title--empty" />
        <div className="DatagridHeaderRow__group-columns">
          <CheckBox
            id={checkboxId}
            className="DatagridHeaderRow__checkbox"
            style={style}
            hideLabel
            label={labels.checkboxLabel}
          />
        </div>
      </div>
    );
  }
  return <CheckBox id={checkboxId} hideLabel label={labels.checkboxLabel} />;
};

const DatagridHeaderRow = ({ columns, rowIndex, columnIndexStart, context, hasCheckBox }) => (
  <div role="row" aria-rowindex={rowIndex} className="DatagridHeaderRow">
    {hasCheckBox && renderCheckbox(context, rowIndex)}
    {columns.map((column, colIndex) => {
      if (!column.children) {
        return (
          <DatagridHeaderCell
            key={column.key}
            column={column}
            colIndex={colIndex + columnIndexStart + 1}
            rowIndex={rowIndex}
            context={context}
            last={colIndex === columns.length - 1}
            first={colIndex === 0}
          />
        );
      }

      if (!column.children.length) return null;
      const width = column.children.map(col => col.width || '').reduce((acc, w) => acc + w);
      const style = width || width === 0 ? { width, maxWidth: width } : {};
      return (
        <div key={column.children[0].key} className="DatagridHeaderRow__group">
          <div
            className={bemClass('DatagridHeaderRow__group-title', { empty: !column.title })}
            style={style}
            title={column.title}
          >
            {column.title}
          </div>
          <div className="DatagridHeaderRow__group-columns">
            {column.children.map((subColumn, subColumnIndex) => (
              <DatagridHeaderCell
                key={subColumn.key}
                column={subColumn}
                colIndex={subColumnIndex + colIndex + columnIndexStart + 1}
                rowIndex={rowIndex}
                context={context}
                last={
                  colIndex === columns.length - 1 && subColumnIndex === column.children.length - 1
                }
                first={colIndex === 0 && subColumnIndex === 0}
              />
            ))}
          </div>
        </div>
      );
    })}
  </div>
);

DatagridHeaderRow.displayName = 'DatagridHeaderRow';

DatagridHeaderRow.defaultProps = {
  columnIndexStart: 1,
};

DatagridHeaderRow.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
      childrem: PropTypes.array,
    }).isRequired
  ).isRequired,
  rowIndex: PropTypes.number.isRequired,
  columnIndexStart: PropTypes.number,
  context: PropTypes.shape({
    columnHeaders: PropTypes.array,
    wrapHeader: PropTypes.func,
    labels: PropTypes.object,
  }).isRequired,
  hasCheckBox: PropTypes.bool,
};

export default DatagridHeaderRow;
