import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../helpers/bem';
import './Group.scss';
import GroupItem from './GroupItem';

const renderGroupItem = (itemKey, column, splitted, children) => (item, index, items) => (
  <GroupItem key={item[itemKey] || item} items={items} column={column} splitted={splitted}>
    {children(item, index, items)}
  </GroupItem>
);

const Group = forwardRef(
  ({ itemKey, className, children, items, column, splitted, ...props }, ref) => (
    <ul {...props} ref={ref} className={bemClass('Group', { column, splitted }, className)}>
      {typeof children === 'function'
        ? items.map(renderGroupItem(itemKey, column, splitted, children))
        : children}
    </ul>
  )
);

Group.defaultProps = {
  itemKey: 'id',
};

Group.displayName = 'Group';

Group.propTypes = {
  items: PropTypes.array.isRequired,
  children: PropTypes.any,
};

export default Group;
