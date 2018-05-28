import React from 'react';
import PropTypes from 'prop-types';

import MenuList from './MenuItem';

class MenuListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);

    this.state = { open: !props.collapsible || props.id === props.activeItemId };
  }

  handleToggle() {
    this.setState(() => ({ open: !this.state.open }));
  }

  render() {
    return <MenuList {...this.props} open={this.state.open} handleClick={this.handleToggle} />;
  }
}

MenuListContainer.propTypes = {
  onClick: PropTypes.func,
  id: PropTypes.number,
  activeItemId: PropTypes.number,
  collapsible: PropTypes.bool,
};

export default MenuListContainer;
