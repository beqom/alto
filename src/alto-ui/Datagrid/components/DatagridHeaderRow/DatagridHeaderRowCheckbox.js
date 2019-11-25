import React from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../../../helpers/bem';
import CheckBox from '../../../Form/CheckBox';

const DatagridHeaderRowCheckbox = ({ context, columns }) => {
  const { columnHeaders, labels, id, onSelectAllRows, isDisplayedRowsSelected } = context;

  const column = (columnHeaders || [])[0] || {};
  const checkboxId = `${id}__header-checkbox`;

  if (column.children && column.children.length) {
    return (
      <div
        className={bemClass('DatagridHeaderRow__group', {
          last: !columns.length,
          'first-in-row': true,
        })}
      >
        <div
          className={bemClass('DatagridHeaderRow__group-title', {
            empty: true,
            'followed-by-empty': !column.title,
          })}
        />
        <div className="DatagridHeaderRow__group-columns">
          <div
            className={bemClass('DatagridHeaderRow__checkbox-container', { last: !columns.length })}
          >
            <CheckBox
              id={checkboxId}
              className="DatagridHeaderRow__checkbox"
              checked={isDisplayedRowsSelected}
              onChange={onSelectAllRows}
              hideLabel
              label={labels.checkboxLabel}
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      className={bemClass('DatagridHeaderRow__checkbox-container', {
        last: !columns.length,
        'first-row': true,
      })}
    >
      <CheckBox
        id={checkboxId}
        className="DatagridHeaderRow__checkbox"
        checked={isDisplayedRowsSelected}
        onChange={onSelectAllRows}
        hideLabel
        label={labels.checkboxLabel}
      />
    </div>
  );
};

DatagridHeaderRowCheckbox.propTypes = {
  context: PropTypes.object,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
      children: PropTypes.array,
    }).isRequired
  ).isRequired,
};

export default DatagridHeaderRowCheckbox;
