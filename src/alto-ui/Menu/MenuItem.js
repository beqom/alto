import React from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../helpers/bem';
import Menu from './Menu';

const getPopoverProps = propoverProps => {
  const { top, left, right, end, ...otherProps } = propoverProps;
  // left or right ?
  if (left || right) return propoverProps;
  // top
  if (top && end) return { ...otherProps, left: true, end: true };
  if (top) return { ...otherProps, right: true, end: true };
  // bottom
  if (end) return { ...otherProps, left: true, start: true };
  return { ...otherProps, right: true, start: true };
};

const MenuItem = ({ item, menuProps, popoverProps }) => {
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
    <Menu {...menuProps} {...getPopoverProps(popoverProps)} items={items} onClose={undefined}>
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
  popoverProps: PropTypes.object.isRequired,
};

export default MenuItem;
