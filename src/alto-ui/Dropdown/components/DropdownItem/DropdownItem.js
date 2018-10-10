import React from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../../../helpers/bem';
import Link from '../../../Link';
import CheckBox from '../../../Form/CheckBox';
import ChevronRightIcon from '../../../Icons/ChevronRight';
import MoreIcon from '../../../Icons/More';

import Dropdown from '../../Dropdown';
import './DropdownItem.scss';

const getPopoverProps = propoverProps => {
  const { top, bottom, left, right, start, middle, end, ...otherProps } = propoverProps;
  // left or right ?
  if (left || right) return propoverProps;
  // top
  if (top && end) return { ...otherProps, left: true, end: true };
  if (top) return { ...otherProps, right: true, end: true };
  // bottom
  if (end) return { ...otherProps, left: true, start: true };
  return { ...otherProps, right: true, start: true };
};

const renderMoreTriggerIcon = handleClick => (
  <button className="DropdownItem__more" onClick={handleClick}>
    <MoreIcon />
  </button>
);

class DropdownItem extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.renderFullItem = this.renderFullItem.bind(this);
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

  handleSelect() {
    const { item, selected, dropdownProps } = this.props;
    const { key } = item;
    const selection = selected
      ? dropdownProps.selected.filter(k => k !== key)
      : [...dropdownProps.selected, key];
    dropdownProps.onSelect(selection, item);
  }

  hasOnClick() {
    const { item, dropdownProps } = this.props;
    return !!(item.onClick || dropdownProps.onClick);
  }

  hasItems() {
    const {
      item: { items },
    } = this.props;
    return !!(items && items.length);
  }

  renderFullItem(...args) {
    return <div className="DropdownItem">{this.renderItem(...args)}</div>;
  }

  renderItem(handleClick, active) {
    const { item, selected, dropdownProps } = this.props;
    const { key, title, className, disabled } = item;

    if (dropdownProps.onSelect) {
      return (
        <CheckBox
          className={bemClass('DropdownItem__element', { checkbox: true }, className)}
          id={`${dropdownProps.id || title}-checkbox-${key}`}
          label={title}
          checked={selected}
          disabled={disabled}
          onChange={this.handleSelect}
        />
      );
    }

    return this.renderItemButton(handleClick, active);
  }

  renderItemButton(handleClick, active) {
    const { item, selected } = this.props;
    const { title, items, onClick, className, Icon, ...itemProps } = item;
    const hasItems = this.hasItems();
    const hasOnClick = this.hasOnClick();
    const LinkOrButton = itemProps.href ? Link : 'button';

    return (
      <LinkOrButton
        {...itemProps}
        onClick={handleClick || this.handleClick}
        className={bemClass(
          'DropdownItem__element',
          { button: true, disabled: item.disabled, active: active || item.active, selected },
          className
        )}
        title={title}
      >
        {Icon && <Icon left outline />}
        <span className="DropdownItem__element-title">{title}</span>
        {hasItems && !hasOnClick && <ChevronRightIcon right />}
      </LinkOrButton>
    );
  }

  renderDropdown(renderTrigger) {
    const { item, dropdownProps, popoverProps } = this.props;
    const { items } = item;

    return (
      <Dropdown
        {...dropdownProps}
        {...(this.hasOnClick() ? { margin: 0 } : getPopoverProps(popoverProps))}
        items={items}
        onClose={undefined}
        renderTrigger={renderTrigger}
      />
    );
  }

  render() {
    const hasItems = this.hasItems();
    const hasOnClick = this.hasOnClick();

    if (hasItems) {
      if (hasOnClick) {
        return (
          <div className="DropdownItem">
            {this.renderItem()}
            {this.renderDropdown(renderMoreTriggerIcon)}
          </div>
        );
      }
      return this.renderDropdown(this.renderFullItem);
    }
    return this.renderFullItem();
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
    href: PropTypes.string,
  }).isRequired,
  dropdownProps: PropTypes.object.isRequired,
  popoverProps: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

export default DropdownItem;
