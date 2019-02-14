import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Link from '../Link';

import CopyIcon from '../Icons/Copy';
import CogIcon from '../Icons/Cog';
import DeleteIcon from '../Icons/Delete';

import { bemClass } from '../helpers/bem';

import './List.scss';

const renderItemContent = (listId, item, selected, render) => {
  const active = typeof item === 'string' ? selected === item : selected === item.id;
  const link = !!item.url;
  const Component = link ? Link : 'div';
  const props = link ? { href: item.url } : {};
  return (
    <Component
      {...props}
      id={link ? `${listId}__list-item--${item.id}` : undefined}
      className={bemClass('list__item-content', { active, link })}
    >
      {render(item, active)}
    </Component>
  );
};

const List = ({
  id,
  items,
  children,
  selected,
  className,
  onCloneItem,
  onCustomizeItem,
  onCustomizeItemSelected,
  onDeleteItem,
}) => (
  <ul id={id} className={classnames('list', className)}>
    {items.map(item => (
      <li
        key={item.id || item}
        className={bemClass('list__item', { active: onCustomizeItemSelected === item.id })}
      >
        <div
          className={bemClass('list__item-item', {
            icons: onDeleteItem || onCloneItem || onCustomizeItem,
          })}
        >
          <div
            className={bemClass('list__item-item-text', {
              active: onCustomizeItemSelected === item.id,
            })}
          >
            {renderItemContent(id, item, selected, children)}
          </div>
          {(onDeleteItem || onCloneItem || onCustomizeItem) && (
            <div
              className={bemClass('list__item-item-icons', {
                active: onCustomizeItemSelected === item.id,
              })}
            >
              {onCloneItem && <CopyIcon outline />}
              {onCustomizeItem && (
                <CogIcon
                  className={bemClass('list_item-item-icons', {
                    active: onCustomizeItemSelected === item.id,
                  })}
                  onClick={() => onCustomizeItem(item.id)}
                  outline
                />
              )}
              {onDeleteItem && <DeleteIcon outline />}
            </div>
          )}
        </div>
      </li>
    ))}
  </ul>
);

List.displayName = 'List';

List.defaultProps = {
  children: item => item.title || item.name || item,
};

const idPropType = PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]);

List.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.func,
  selected: idPropType,
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        id: idPropType.isRequired,
        url: PropTypes.string,
        title: PropTypes.string,
      }),
    ])
  ).isRequired,
  onCloneItem: PropTypes.func,
  onCustomizeItem: PropTypes.func,
  onCustomizeItemSelected: PropTypes.string,
  onDeleteItem: PropTypes.func,
};

export default List;
