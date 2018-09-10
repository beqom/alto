import React from 'react';
import PropTypes from 'prop-types';

import Popover from '../Popover';
import PopoverWrapper from '../Popover/PopoverWrapper';

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
    const { className, children, items, onClose, ...popoverProps } = this.props;

    const trigger =
      typeof children === 'function'
        ? children(this.toggle, this.open, this.close, this.state.open)
        : children;
    return (
      <PopoverWrapper className={bemClass('Menu', {}, className)}>
        {trigger}
        <Popover {...popoverProps} open={this.state.open} onClose={onClose || this.close}>
          <ul className="Menu">
            {items.map(item => (
              <li key={item.key} className="Menu__item">
                <MenuItem item={item} menuProps={this.props} popoverProps={popoverProps} />
              </li>
            ))}
          </ul>
        </Popover>
      </PopoverWrapper>
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
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default Menu;
