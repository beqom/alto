import React from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../../../helpers/bem';
import ChevronRightIcon from '../../../Icons/ChevronRight';
import Spinner from '../../../Spinner';
import Tree from '../../Tree';
import { getKey } from '../../helpers';
import Link from '../../../Link';

import './TreeItem.scss';

const renderChildren = (open, children, props) => {
  if (!open) return null;
  if (!children || !children.length) return null;

  return (
    <div className={bemClass('TreeItem__subtree', { close: !open })}>
      <Tree {...props} items={children} />
    </div>
  );
};

const renderTreeItem = (item, selected, renderItem, href, onClick, handleClick) => {
  const ButtonOrLink = typeof href === 'function' ? Link : 'button';
  const props = Object.assign(
    {},
    typeof href === 'function' ? { href: href(item, selected) } : {},
    typeof onClick === 'function' ? { onClick: handleClick } : {}
  );
  return (
    <ButtonOrLink
      {...props}
      className={bemClass('TreeItem__button', {
        active: selected,
      })}
    >
      {renderItem(item, selected)}
    </ButtonOrLink>
  );
};
const TreeItem = props => {
  const {
    item,
    hasChildren,
    keyField,
    renderIcon,
    state,
    selected,
    handleToggle,
    handleClick,
    renderItem,
    href,
    onClick,
  } = props;
  const isSelected = selected === item || selected === getKey(item, keyField);
  const Icon = renderIcon ? renderIcon(item, isSelected) : null;

  return (
    <li className="TreeItem">
      <div className={bemClass('TreeItem__title', { final: !hasChildren(item) })}>
        {!state.fetching &&
          !!hasChildren(item) && (
            <button
              className={bemClass('TreeItem__toggle-button', { open: state.open })}
              onClick={handleToggle}
            >
              <ChevronRightIcon />
            </button>
          )}
        <div>{state.fetching && <Spinner className="TreeItem__spinner" small />}</div>
        {Icon && (
          <div className={bemClass('TreeItem__icon', { isSelected })}>
            <Icon outline={!isSelected} />
          </div>
        )}
        {renderTreeItem(item, isSelected, renderItem, href, onClick, handleClick)}
      </div>
      {renderChildren(state.open, state.children, props)}
    </li>
  );
};

TreeItem.propTypes = {
  item: PropTypes.object,
  hasChildren: PropTypes.func,
  keyField: PropTypes.any,
  renderIcon: PropTypes.func,
  state: PropTypes.shape({
    open: PropTypes.bool,
    fetching: PropTypes.bool,
    children: PropTypes.any,
  }),
  selected: PropTypes.string,
  handleToggle: PropTypes.func,
  handleClick: PropTypes.func,
  renderItem: PropTypes.func,
  href: PropTypes.any,
  onClick: PropTypes.func,
};

export default TreeItem;
