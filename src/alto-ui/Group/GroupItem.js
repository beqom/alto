import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import context from './context';
import './Group.scss';

export function GroupItemComponent({ items, index, column, splitted, groupRef, ...props }) {
  return (
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
      <li {...props} ref={groupRef} />
    </context.Provider>
  );
}

GroupItemComponent.defaultProps = {};

GroupItemComponent.displayName = 'GroupItem';

GroupItemComponent.propTypes = {
  items: PropTypes.array.isRequired,
};

export default forwardRef(({ ...props }, ref) => <GroupItemComponent {...props} groupRef={ref} />);
