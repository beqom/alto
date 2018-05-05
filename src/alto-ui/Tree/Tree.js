import React from 'react';
import PropTypes from 'prop-types';
import { bemClass } from '../helpers/bem';

import ChevronRightIcon from '../Icons/ChevronRight';
import Spinner from '../Spinner';
import Link from '../Link';

import './Tree.scss';

class TreeItem extends React.Component {
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

  renderChildren() {
    const { open, children } = this.state;

    if (!open) return null;
    if (!children || !children.length) return null;

    return (
      <div className={bemClass('Tree__subtree', { close: !open })}>
        <Tree {...this.props} items={children} />
      </div>
    );
  }

  renderItem(item, selected) {
    const { renderItem, href, onClick } = this.props;
    const ButtonOrLink = typeof href === 'function' ? Link : 'button';
    const props = Object.assign(
      {},
      typeof href === 'function' ? { href: href(item, selected) } : {},
      typeof onClick === 'function' ? { onClick: this.handleClick } : {}
    );
    return (
      <ButtonOrLink
        {...props}
        className={bemClass('Tree__item-button', {
          active: selected,
        })}
      >
        {renderItem(item, selected)}
      </ButtonOrLink>
    );
  }

  render() {
    const { item, hasChildren, keyField, renderIcon } = this.props;
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
          {this.renderItem(item, selected)}
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
  href: PropTypes.func,
  keyField: PropTypes.string,
  open: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  selected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    // promise
    PropTypes.object,
  ]),
  onToggle: PropTypes.func,
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
