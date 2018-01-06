import React from 'react';
import PropTypes from 'prop-types';
import { bemClass } from '../helpers/bem';

import './Table.scss';

const Table = ({ className, columns, rows, rowId, wide, compact }) => (
  <div className={bemClass('Table', { wide, compact }, className)}>
    <table className="Table__table">
      <thead>
        <tr>
          {(columns || Object.keys(rows[0])).map(col => (
            <th key={col.key || col} className="Table__cell Table__cell--header">
              {col.title || col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <tr key={row[rowId]}>
            {(columns || Object.keys(rows[0])).map(col => (
              <td
                key={col.key || col}
                className={bemClass('Table__cell', {
                  number: typeof row[col.key || col] === 'number',
                })}
              >
                {row[col.key || col]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

Table.displayName = 'Table';

Table.defaultProps = {
  rowId: 'id',
};

Table.propTypes = {
  className: PropTypes.string,
  rowId: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.any.isRequired,
      title: PropTypes.any.isRequired,
    })
  ),
  rows: PropTypes.array.isRequired,
  wide: PropTypes.bool,
  compact: PropTypes.bool,
};

export default Table;
