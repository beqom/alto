import React from 'react';
import PropTypes from 'prop-types';
import { bemClass } from '../helpers/bem';

import ChevronRightIcon from '../Icons/ChevronRight';
import Spinner from '../Spinner';

import './Tree.scss';

class TreeItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: props.open,
      children: null,
      fetching: false,
      haveBeenOpen: false,
    };

    this.checkChildren(props.open);

    this.toggle = this.toggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.props.open) {
      this.setState({ open: nextProps.open });
      this.checkChildren(nextProps.open);
    }
  }

  checkChildren(open) {
    if (open && !this.state.children && !this.state.fetching) {
      const { item, items, index, getChildren } = this.props;
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
  }

  renderChildren() {
    const { open, haveBeenOpen, children } = this.state;

    if (!haveBeenOpen && !open) return null;
    if (!children || !children.length) return null;

    return (
      <div className={bemClass('Tree__subtree', { close: !open })}>
        <Tree {...this.props} items={children} />
      </div>
    );
  }

  render() {
    const { item, hasChildren, renderItem, keyField, renderIcon } = this.props;
    const { open, fetching } = this.state;

    const selected = this.props.selected === item || this.props.selected === item[keyField];
    const Icon = renderIcon ? renderIcon(item, selected) : null;
    return (
      <li className="Tree__item">
        <div className={bemClass('Tree__title', { final: !hasChildren(item) })}>
          {!fetching &&
            !!hasChildren(item) && (
              <button className={bemClass('Tree__toggle-button', { open })} onClick={this.toggle}>
                <ChevronRightIcon />
              </button>
            )}
          <div>{fetching && <Spinner className="Tree__item-spinner" small />}</div>
          {Icon && (
            <div className={bemClass('Tree__item-icon', { selected })}>
              <Icon outline={!selected} />
            </div>
          )}
          <button
            onClick={this.handleClick}
            className={bemClass('Tree__item-button', { active: selected })}
          >
            {renderItem(item)}
          </button>
        </div>
        {this.renderChildren()}
      </li>
    );
  }
}

TreeItem.propTypes = {
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
  keyField: PropTypes.string,
  open: PropTypes.bool,
  selected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    // promise
    PropTypes.object,
  ]).isRequired,
};

const Tree = props => (
  <ul className="Tree">
    {props.items.map((child, index) => (
      <TreeItem key={child[props.keyField]} {...props} item={child} index={index} />
    ))}
  </ul>
);

Tree.displayName = 'Tree';

Tree.defaultProps = {
  hasChildren: item => !!item.children && !!item.children.length,
  getChildren: item => item.children,
  renderItem: item => item.title || item.name,
  keyField: 'id',
  open: false,
  index: 0,
  noCache: false,
};

Tree.propTypes = {
  items: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    // promise
    PropTypes.object,
  ]).isRequired,
  keyField: PropTypes.string,
};

export default Tree;
