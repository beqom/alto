import React from 'react';
import PropTypes from 'prop-types';

import Popover from '../Popover';
import PopoverWrapper from '../Popover/PopoverWrapper';

import './Dropdown.scss';
import DropdownItem from './DropdownItem';
import { bemClass } from '../helpers/bem';

class Dropdown extends React.Component {
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
      <PopoverWrapper className={bemClass('Dropdown', {}, className)}>
        {trigger}
        <Popover {...popoverProps} open={this.state.open} onClose={onClose || this.close}>
          <ul className="Dropdown">
            {items.map(item => (
              <li key={item.key} className="Dropdown__item">
                <DropdownItem item={item} dropdownProps={this.props} popoverProps={popoverProps} />
              </li>
            ))}
          </ul>
        </Popover>
      </PopoverWrapper>
    );
  }
}

Dropdown.displayName = 'Dropdown';

Dropdown.defaultProps = {
  open: false,
};

Dropdown.propTypes = {
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

export default Dropdown;
