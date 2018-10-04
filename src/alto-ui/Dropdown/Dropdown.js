import React from 'react';
import PropTypes from 'prop-types';

import Popover from '../Popover';
import PopoverWrapper from '../Popover/PopoverWrapper';
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

  toggle(open) {
    this.setState({ open: typeof open === 'boolean' ? open : !this.state.open });
  }

  renderTrigger() {
    const { renderTrigger, label, items } = this.props;
    if (typeof renderTrigger === 'function') {
      return renderTrigger(this.toggle, this.state.open);
    }

    const text =
      label || (items.find(({ key }) => this.isSelected(key)) || {}).title || 'undefined label';

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
        onClose={this.props.onClose || this.close}
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
      ...popoverProps
    } = this.props;

    const renderItem = typeof children === 'function' ? children : this.renderItem(popoverProps);

    return (
      <PopoverWrapper className={bemClass('Dropdown__wrapper', {}, className)}>
        {this.renderTrigger()}
        <Popover
          hidePointer={!renderTrigger}
          start={!renderTrigger}
          {...popoverProps}
          className="Dropdown"
          open={this.state.open}
          onClose={onClose || this.close}
        >
          {items && (
            <ul className="Dropdown__list">
              {items.map(item => (
                <li key={item.key} className="Dropdown__item">
                  {renderItem(item, this.isSelected(item.key))}
                </li>
              ))}
            </ul>
          )}
          {children}
        </Popover>
      </PopoverWrapper>
    );
  }
}

Dropdown.displayName = 'Dropdown';

Dropdown.defaultProps = {
  open: false,
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
  selected: PropTypes.oneOfType([PropTypes.arrayOf(keyPropType), keyPropType]),
};

export default Dropdown;
