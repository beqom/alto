import React from 'react';
import PropTypes from 'prop-types';

import TreeItem from './TreeItem';

class TreeItemContainer extends React.Component {
  constructor(props) {
    super(props);

    const open = typeof props.open === 'function' ? props.open(props.item) : props.open;

    this.state = {
      open,
      children: null,
      fetching: false,
    };

    this.toggle = this.toggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.checkChildren(this.state.open);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.props.open) {
      const open =
        typeof nextProps.open === 'function' ? nextProps.open(nextProps.item) : nextProps.open;
      this.setState({ open });
      this.checkChildren(open);
    }
  }

  checkChildren(open) {
    const { item, items, index, getChildren, hasChildren } = this.props;
    if (open && !this.state.children && !this.state.fetching && hasChildren(item)) {
      if (this.state.children) return;

      const children = getChildren(item, index, items);
      // promise ?
      if (typeof children.then === 'function') {
        this.setState({ fetching: true });
        children.then(asyncChildren =>
          this.setState(() => ({
            children: asyncChildren || [],
            fetching: false,
          }))
        );
      } else {
        this.setState({ children });
      }
    }
  }

  handleClick() {
    this.props.onClick(this.props.item);
  }

  toggle() {
    const open = !this.state.open;
    this.setState(() => ({ open }));
    this.checkChildren(open);
    if (this.props.onToggle) this.props.onToggle(this.props.item, open);
  }

  render() {
    return (
      <TreeItem
        {...this.props}
        state={this.state}
        handleToggle={this.toggle}
        handleClick={this.handleClick}
      />
    );
  }
}

TreeItemContainer.defaultProps = {
  hasChildren: item => !!item.children && !!item.children.length,
  getChildren: item => item.children,
  renderItem: item => item.title || item.name,
  keyField: 'id',
  open: false,
};

TreeItemContainer.propTypes = {
  item: PropTypes.object,
  items: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    // promise
    PropTypes.object,
  ]).isRequired,
  index: PropTypes.number.isRequired,
  className: PropTypes.string,
  hasChildren: PropTypes.func,
  getChildren: PropTypes.func,
  renderItem: PropTypes.func,
  renderIcon: PropTypes.func,
  onClick: PropTypes.func,
  href: PropTypes.func,
  keyField: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  open: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  selected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    // promise
    PropTypes.object,
  ]),
  onToggle: PropTypes.func,
};

export default TreeItemContainer;
