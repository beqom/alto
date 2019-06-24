import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import context from './context';
import './Group.scss';

const GroupItem = forwardRef(({ items, index, column, splitted, ...props }, ref) => (
  <context.Provider
    value={{
      first: index === 0,
      last: index === items.length - 1,
      row: !column,
      column: !!column,
      splitted: !!splitted,
      stacked: !splitted,
    }}
  >
    <li {...props} ref={ref} />
  </context.Provider>
));

GroupItem.defaultProps = {};

GroupItem.displayName = 'GroupItem';

GroupItem.propTypes = {
  items: PropTypes.array.isRequired,
};

export default GroupItem;
