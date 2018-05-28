import React from 'react';
import PropTypes from 'prop-types';
import Link from '../../Link';
import ChevronRightIcon from '../../Icons/ChevronRight';
import { bemClass } from '../../helpers/bem';

import './MenuItem.scss';

const renderIcons = icons =>
  (icons || []).map(({ key, Icon, onClick, className, outline }) => (
    <Icon key={key} onClick={onClick} className={className} outline={outline} />
  ));

const renderTitle = (collapsible, handleClick, open, title, icons) => {
  if (!collapsible)
    return (
      <div className={bemClass('MenuItem__title', { 'not-collapsible': true, open })}>
        <span className="MenuItem__title-text">{title}</span>
        {renderIcons(icons)}
      </div>
    );
  return (
    <div className={bemClass('MenuItem__title', { open })}>
      <button className="MenuItem-title-button" onClick={handleClick}>
        <ChevronRightIcon className={bemClass('MenuItem__title-icon', { open })} />
        <span className="MenuItem__title-text">{title}</span>
      </button>
      {renderIcons(icons)}
    </div>
  );
};

const MenuItem = ({
  handleClick,
  title,
  icons,
  items,
  url,
  open,
  activeListItemId,
  collapsible,
}) => (
  <div className="MenuItem">
    {renderTitle(collapsible && !!items.length, handleClick, open, title, icons)}
    {!!(items && items.length) && (
      <ul
        className={bemClass('MenuItem__details', {
          close: collapsible && !open,
        })}
      >
        {items.map(item => (
          <li
            key={item.id}
            className={bemClass('MenuItem__item', {
              active: activeListItemId === item.id,
            })}
          >
            <Link
              className="MenuItem__item-link"
              href={typeof url === 'function' ? url(item) : url}
            >
              {item.title}
            </Link>
            <span>{renderIcons(item.icons)}</span>
          </li>
        ))}
      </ul>
    )}
  </div>
);

MenuItem.defaultPoops = {
  url: x => x.href || x.url,
};

const iconsPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    Icon: PropTypes.object.required,
    onClick: PropTypes.func,
    className: PropTypes.string,
    outline: PropTypes.bool,
  })
);

MenuItem.propTypes = {
  handleClick: PropTypes.func,
  icons: iconsPropTypes,
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.number,
      icons: iconsPropTypes,
    })
  ),
  url: PropTypes.func,
  open: PropTypes.bool,
  activeListItemId: PropTypes.number,
  collapsible: PropTypes.bool,
};

export default MenuItem;
