import React from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../../../helpers/bem';
import ChevronRightIcon from '../../../Icons/ChevronRight';
import Button from '../../../Button';
import Spinner from '../../../Spinner';
import Tree from '../../Tree';
import { getKey } from '../../helpers';
import Link from '../../../Link';

import './TreeItem.scss';

const renderChildren = (open, children, itemProps) => {
  if (!open) return null;
  if (!children || !children.length) return null;

  const { id, loadMore, labels, childrenPerPage } = itemProps;
  const items = childrenPerPage
    ? children.slice(0, itemProps.state.page * childrenPerPage)
    : children;

  return (
    <div className={bemClass('TreeItem__subtree', { close: !open })}>
      <Tree {...itemProps} items={items} />
      {items.length < children.length && (
        <Button
          flat
          small
          id={id ? `${id}__load-more` : undefined}
          onClick={loadMore}
          className="TreeItem__button-load-more"
        >
          {labels.loadMore}
        </Button>
      )}
    </div>
  );
};

const TreeItem = props => {
  const {
    id,
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
    isClickable,
  } = props;
  const isSelected = selected === item || selected === getKey(item, keyField);
  const Icon = renderIcon ? renderIcon(item, isSelected) : null;
  const ButtonOrLink = typeof href === 'function' ? Link : 'button';

  return (
    <li id={id} className="TreeItem">
      <div className={bemClass('TreeItem__title', { final: !hasChildren(item) })}>
        {!state.fetching &&
          !!hasChildren(item) && (
            <button
              id={id ? `${id}__toggle-button` : undefined}
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
        {isClickable ? (
          <ButtonOrLink
            id={id ? `${id}__button` : undefined}
            {...(typeof href === 'function' ? { href: href(item, selected) } : {})}
            {...(typeof onClick === 'function' ? { onClick: handleClick } : {})}
            className={bemClass('TreeItem__button', {
              active: isSelected,
            })}
          >
            {renderItem(item, isSelected)}
          </ButtonOrLink>
        ) : (
          <div>{renderItem(item, isSelected)}</div>
        )}
      </div>
      {renderChildren(state.open, state.children, props)}
    </li>
  );
};

TreeItem.propTypes = {
  id: PropTypes.string,
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
  isClickable: PropTypes.func,
};

export default TreeItem;
