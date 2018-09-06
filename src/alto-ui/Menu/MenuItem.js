import React from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../helpers/bem';
import Menu from './Menu';

const MenuItem = ({ item, menuProps }) => {
  const { title, items, className, ...buttonProps } = item;

  if (!items || !items.length) {
    return (
      <button
        {...buttonProps}
        className={bemClass('MenuItem', { disabled: item.disabled }, className)}
      >
        {title}
      </button>
    );
  }

  return (
    <Menu {...menuProps} right items={items} onClose={undefined}>
      {(toggle, open, close, isOpen) => (
        <button
          {...buttonProps}
          className={bemClass(
            'MenuItem',
            { submenu: true, active: isOpen, disabled: item.disabled },
            className
          )}
          onClick={toggle}
        >
          {title}
        </button>
      )}
    </Menu>
  );
};

MenuItem.displayName = 'MenuItem';

MenuItem.defaultProps = {};

MenuItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.any.isRequired,
    items: PropTypes.array,
    className: PropTypes.string,
    onClick: PropTypes.func,
  }).isRequired,
  menuProps: PropTypes.object.isRequired,
};

export default MenuItem;
