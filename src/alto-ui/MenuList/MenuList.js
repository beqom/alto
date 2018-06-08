import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import MenuItem from './components/MenuItem';

import './MenuList.scss';

const MenuList = ({ className, items, activeItemId, activeListItemId, collapsible, url }) => (
  <ul className={classnames('MenuList', className)}>
    {(items || []).map(item => (
      <li className="MenuList__item" key={item.id}>
        <MenuItem
          id={item.id}
          icons={item.icons}
          title={item.title}
          items={item.items}
          url={typeof url === 'function' ? url(item) : url}
          activeItemId={activeItemId}
          activeListItemId={activeListItemId}
          collapsible={collapsible}
        />
      </li>
    ))}
  </ul>
);

const iconsPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    Icon: PropTypes.object.required,
    onClick: PropTypes.func,
    className: PropTypes.string,
    outline: PropTypes.bool,
  })
);

MenuList.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      icons: iconsPropTypes,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired,
          type: PropTypes.number,
          icons: iconsPropTypes,
        })
      ),
    })
  ),
  activeItemId: PropTypes.number,
  activeListItemId: PropTypes.number,
  collapsible: PropTypes.bool,
  url: PropTypes.func,
};

export default MenuList;
