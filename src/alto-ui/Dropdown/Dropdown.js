import React from 'react';
import PropTypes from 'prop-types';

import Popover from '../Popover';
import Line from '../Line';
import ChevronDown from '../Icons/ChevronDown';
import Button from '../Button';
import { bemClass } from '../helpers/bem';

import DropdownItem from './components/DropdownItem';
import './Dropdown.scss';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line react/no-unused-state
      previousPropOpen: props.open,
      open: props.open,
    };

    this.close = this.close.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (state.previousPropOpen !== props.open) {
      return {
        previousPropOpen: props.open,
        open: props.open,
      };
    }
    return null;
  }

  isSelected(key) {
    const { selected } = this.props;
    return Array.isArray(selected) ? selected.includes(key) : key === selected;
  }

  close() {
    this.toggle(false);
  }

  handleClose() {
    const { onClose } = this.props;
    if (onClose) {
      onClose(this.close);
    } else {
      this.close();
    }
  }

  toggle(open) {
    this.setState({ open: typeof open === 'boolean' ? open : !this.state.open });
  }

  renderTrigger() {
    const { renderTrigger, defaultLabel, label, items } = this.props;
    if (typeof renderTrigger === 'function') {
      return renderTrigger(this.toggle, this.state.open);
    }

    const text =
      label ||
      (items.find(({ key }) => this.isSelected(key)) || {}).title ||
      defaultLabel ||
      'undefined label';

    return (
      <Button flat onClick={this.toggle} active={this.state.open}>
        {text} <ChevronDown right />
      </Button>
    );
  }

  renderItem(popoverProps) {
    return (item, selected) => (
      <DropdownItem
        item={item}
        selected={selected}
        dropdownProps={this.props}
        popoverProps={popoverProps}
        onClose={this.handleClose}
      />
    );
  }

  render() {
    const {
      className,
      items,
      onClose,
      renderTrigger,
      children,
      selected,
      onClick,
      getItems,
      defaultLabel,
      ...popoverProps
    } = this.props;

    const renderItem = typeof children === 'function' ? children : this.renderItem(popoverProps);
    const hasItems = Array.isArray(items) && !!items.length;

    return (
      <Popover
        start={!renderTrigger}
        {...popoverProps}
        className={bemClass('Dropdown', {}, className)}
        baseClassName="Dropdown"
        open={this.state.open}
        target={this.renderTrigger()}
        onClose={this.handleClose}
      >
        {hasItems && (
          <ul className="Dropdown__list">
            {items.map(item => (
              <li key={item.key} className="Dropdown__item">
                {renderItem(item, this.isSelected(item.key))}
              </li>
            ))}
          </ul>
        )}
        {hasItems && !!children && <Line />}
        {children}
      </Popover>
    );
  }
}

Dropdown.displayName = 'Dropdown';

Dropdown.defaultProps = {
  open: false,
  getItems: () => null,
};

const keyPropType = PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired;

Dropdown.propTypes = {
  // id is required for checkboxes
  id: PropTypes.string,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.any,
  renderTrigger: PropTypes.func,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: keyPropType,
    }).isRequired
  ),
  onSelect: PropTypes.func,
  label: PropTypes.any,
  defaultLabel: PropTypes.string,
  selected: PropTypes.oneOfType([PropTypes.arrayOf(keyPropType), keyPropType]),
  getItems: PropTypes.func,
};

export default Dropdown;
