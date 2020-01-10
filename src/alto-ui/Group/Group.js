import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../helpers/bem';
import getDefaultItemKey from '../helpers/getItemKey';
import { GroupItemComponent as GroupItem } from './GroupItem';
import './Group.scss';

export const renderGroupItem = (itemKey, column, splitted, children) => (item, index, items) => (
  <GroupItem key={itemKey(item) || item} items={items} column={column} splitted={splitted}>
    {children(item, index, items)}
  </GroupItem>
);

const Group = forwardRef(
  ({ itemKey, className, children, items, column, splitted, ...props }, ref) => (
    <ul {...props} ref={ref} className={bemClass('Group', { column, splitted }, className)}>
      {typeof children === 'function'
        ? items.map(renderGroupItem(getDefaultItemKey(itemKey), column, splitted, children))
        : children}
    </ul>
  )
);

Group.defaultProps = {};

Group.displayName = 'Group';

Group.propTypes = {
  itemKey: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  items: PropTypes.array.isRequired,
  children: PropTypes.any,
};

export default Group;
