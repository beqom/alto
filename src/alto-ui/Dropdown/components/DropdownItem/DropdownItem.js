import React from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../../../helpers/bem';
import Dropdown from '../../Dropdown';

import './DropdownItem.scss';

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

class DropdownItem extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (this.props.item.onClick) {
      this.props.item.onClick(e);
    }

    if (this.props.dropdownProps.onClick) {
      this.props.dropdownProps.onClick(this.props.item);
    }

    this.props.onClose();
  }

  render() {
    const { item, dropdownProps, popoverProps } = this.props;
    const { title, items, className, Icon, ...buttonProps } = item;

    if (!items || !items.length) {
      return (
        <button
          {...buttonProps}
          onClick={this.handleClick}
          className={bemClass('DropdownItem', { disabled: item.disabled }, className)}
          title={title}
        >
          {Icon && <Icon left outline />}
          {title}
        </button>
      );
    }

    return (
      <Dropdown
        {...dropdownProps}
        {...getPopoverProps(popoverProps)}
        items={items}
        onClose={undefined}
      >
        {(toggle, open, close, isOpen) => (
          <button
            {...buttonProps}
            className={bemClass(
              'DropdownItem',
              { subdropdown: true, active: isOpen, disabled: item.disabled },
              className
            )}
            onClick={toggle}
          >
            {title}
          </button>
        )}
      </Dropdown>
    );
  }
}

DropdownItem.displayName = 'DropdownItem';

DropdownItem.defaultProps = {};

DropdownItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.any.isRequired,
    items: PropTypes.array,
    className: PropTypes.string,
    onClick: PropTypes.func,
  }).isRequired,
  dropdownProps: PropTypes.object.isRequired,
  popoverProps: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DropdownItem;
