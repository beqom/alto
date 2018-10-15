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

const renderMoreTriggerIcon = (handleClick, active) => (
  <button
    className={bemClass('DropdownItem__button', { active, more: true })}
    onClick={handleClick}
  >
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

  getItems() {
    const { item, dropdownProps } = this.props;
    return item.items !== undefined ? item.items : dropdownProps.getItems(item);
  }

  handleClick(e) {
    const { item, dropdownProps } = this.props;
    if (item.onClick) {
      item.onClick(e);
    } else if (dropdownProps.onClick) {
      dropdownProps.onClick(item);
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
    const items = this.getItems();
    return Array.isArray(items) && !!items.length;
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
          className={bemClass('DropdownItem__checkbox', {}, className)}
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
          'DropdownItem__button',
          { main: true, disabled: item.disabled, active: active || item.active, selected },
          className
        )}
        title={title}
      >
        {Icon && <Icon left outline />}
        <span className="DropdownItem__button-title">{title}</span>
        {hasItems && !hasOnClick && <ChevronRightIcon right />}
      </LinkOrButton>
    );
  }

  renderDropdown(renderTrigger) {
    const { item, dropdownProps, popoverProps } = this.props;

    return (
      <Dropdown
        {...dropdownProps}
        {...(this.hasOnClick() ? { margin: 0 } : getPopoverProps(popoverProps))}
        items={this.getItems()}
        onClose={undefined}
        renderTrigger={renderTrigger}
      >
        {item.content}
      </Dropdown>
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
    Icon: PropTypes.func,
    content: PropTypes.any,
  }).isRequired,
  dropdownProps: PropTypes.object.isRequired,
  popoverProps: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

export default DropdownItem;
