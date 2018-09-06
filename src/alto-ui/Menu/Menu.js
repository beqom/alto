import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from '../Dropdown';
import DropdownWrapper from '../Dropdown/DropdownWrapper';

import './Menu.scss';
import MenuItem from './MenuItem';
import { bemClass } from '../helpers/bem';

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line react/no-unused-state
      previousPropOpen: props.open,
      open: props.open,
    };

    this.open = this.open.bind(this);
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

  open() {
    this.setState({ open: true });
  }

  close() {
    this.setState({ open: false });
  }

  toggle() {
    this.setState(state => ({ open: !state.open }));
  }

  render() {
    const { className, children, items, right, onClose, ...dropdownProps } = this.props;
    const trigger =
      typeof children === 'function'
        ? children(this.toggle, this.open, this.close, this.state.open)
        : children;
    return (
      <DropdownWrapper className={bemClass('Menu', { right }, className)}>
        {trigger}
        <Dropdown {...dropdownProps} open={this.state.open} onClose={onClose || this.close}>
          <ul className={bemClass('Menu', { right })}>
            {items.map(item => (
              <li key={item.key} className="Menu__item">
                <MenuItem item={item} menuProps={this.props} />
              </li>
            ))}
          </ul>
        </Dropdown>
      </DropdownWrapper>
    );
  }
}

Menu.displayName = 'Menu';

Menu.defaultProps = {
  open: false,
};

Menu.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
  right: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default Menu;
