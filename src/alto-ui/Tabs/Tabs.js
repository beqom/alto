import React from 'react';
import PropTypes from 'prop-types';

import Link from '../Link';
import { bemClass } from '../helpers/bem';

import './Tabs.scss';

const Tabs = ({ id, items, children, className, currentUrl, panel }) => (
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
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Tabs;
