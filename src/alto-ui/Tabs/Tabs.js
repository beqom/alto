import React from 'react';
import PropTypes from 'prop-types';

import Link from '../Link';
import Button from '../Button';
import { bemClass } from '../helpers/bem';

import './Tabs.scss';

const getHandleChange = (items, index, active, onChange) => () => {
  if (!active) return onChange(items[index].value);
  return null;
};

const renderLinks = (items, children, panel, className, currentUrl, id) => (
  <ul id={id} className={bemClass('tabs', { panel }, className)} role="tablist">
    {items.map((item, index) => (
      <li key={item.url} className="tabs__tab">
        <Link
          id={id ? `${id}__link--${index}` : undefined}
          className={bemClass('tabs__link', { active: item.url === currentUrl, panel })}
          href={item.url}
        >
          {children(item)}
        </Link>
      </li>
    ))}
  </ul>
);

const renderButtons = (items, value, id, onChange) =>
  items.map((item, index) => (
    <Button
      key={item.value}
      id={id ? `${id}__button--${index}` : undefined}
      className={bemClass('tabs__button', { active: item.value === value })}
      onClick={getHandleChange(items, index, item.value === value, onChange)}
      flat
    >
      {item.title}
    </Button>
  ));

const Tabs = ({ id, items, children, className, currentUrl, panel, onChange, value }) =>
  value
    ? renderButtons(items, value, id, onChange)
    : renderLinks(items, children, panel, className, currentUrl, id);

Tabs.displayName = 'Tabs';

Tabs.defaultProps = {
  children: x => x.title,
};

Tabs.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  panel: PropTypes.bool,
  children: PropTypes.func,
  currentUrl: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
    })
  ).isRequired,
};

export default Tabs;
