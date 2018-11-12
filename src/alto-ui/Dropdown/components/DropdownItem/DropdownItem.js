import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../../../helpers/bem';
import Link from '../../../Link';
import CheckBox from '../../../Form/CheckBox';
import ChevronRightIcon from '../../../Icons/ChevronRight';
import MoreIcon from '../../../Icons/More';

import DropdownItemEditInput from '../DropdownItemEditInput';
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
  constructor(props) {
    super(props);

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
    const { id, item, selected, dropdownProps } = this.props;
    const { title, className, disabled } = item;

    if (dropdownProps.onSelect) {
      return (
        <CheckBox
          className={bemClass('DropdownItem__checkbox', {}, className)}
          id={`${id}__checkbox`}
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
    const { id, item, selected } = this.props;
    const { title, items, onClick, editable, className, Icon, ...itemProps } = item;
    const hasItems = this.hasItems();
    const hasOnClick = this.hasOnClick();
    const LinkOrButton = itemProps.href ? Link : 'button';

    return (
      <LinkOrButton
        {...itemProps}
        id={id}
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

  renderEditableInput() {
    const { item, dropdownProps } = this.props;
    if (!item.editable) return null;

    return items => (
      <Fragment>
        <DropdownItemEditInput
          id={`${this.props.id}__editable-input`}
          label="Edit"
          value={item.title}
          onSave={dropdownProps.onSaveEdit}
          invalidate={dropdownProps.invalidateEdit}
          item={item}
          inputMaxLength={this.props.inputMaxLength}
        />
        {items}
      </Fragment>
    );
  }

  renderDropdown(renderTrigger) {
    const { id, dropdownProps, popoverProps } = this.props;

    return (
      <Dropdown
        {...dropdownProps}
        {...(this.hasOnClick() ? { margin: 0 } : getPopoverProps(popoverProps))}
        id={`${id}__dropdown`}
        items={this.getItems()}
        onClose={undefined}
        renderTrigger={renderTrigger}
      >
        {this.renderEditableInput()}
      </Dropdown>
    );
  }

  render() {
    const { item } = this.props;
    const hasItems = this.hasItems();
    const hasOnClick = this.hasOnClick();

    if (hasItems) {
      if (hasOnClick || item.editable) {
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
  id: PropTypes.string.isRequired,
  item: PropTypes.shape({
    title: PropTypes.any.isRequired,
    items: PropTypes.array,
    className: PropTypes.string,
    onClick: PropTypes.func,
    href: PropTypes.string,
    Icon: PropTypes.func,
    content: PropTypes.any,
    editable: PropTypes.bool,
  }).isRequired,
  dropdownProps: PropTypes.object.isRequired,
  popoverProps: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  inputMaxLength: PropTypes.number,
};

export default DropdownItem;
