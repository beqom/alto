import React, { memo, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { bemClass } from '../../../helpers';
import { DatagridContext } from '../../Datagrid';
import CheckBox from '../../../Form/CheckBox';

const DatagridRowCheckbox = memo(({ classNameModifiers, row, title, rowKey, id }) => {
  const { labels, onSelectRow, selectedRows } = useContext(DatagridContext);
  const checked = selectedRows.includes(rowKey);
  const onCheckboxChange = useCallback(() => {
    onSelectRow(row);
  }, [row]);

  return (
    <div className={bemClass('DataGrid__row-checkbox-container', classNameModifiers)}>
      <CheckBox
        id={id}
        className="DataGrid__row-checkbox"
        title={title}
        label={labels.checkboxLabel}
        hideLabel
        checked={checked}
        onChange={onCheckboxChange}
        disabled={!rowKey}
      />
    </div>
  );
});
DatagridRowCheckbox.displayName = 'DatagridRowCheckbox';

DatagridRowCheckbox.propTypes = {
  id: PropTypes.string,
  classNameModifiers: PropTypes.shape({
    firstRow: PropTypes.bool,
    lastRow: PropTypes.bool,
    comfortable: PropTypes.bool,
    compact: PropTypes.bool,
  }),
  row: PropTypes.shape(),
  title: PropTypes.string,
  rowKey: PropTypes.string,
};

export default DatagridRowCheckbox;
