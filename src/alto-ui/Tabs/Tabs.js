import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { bemClass } from '../helpers/bem';

import './Tabs.scss';

const Tabs = ({ items, children, className, currentUrl }) => (
  <ul className={classnames('tabs', className)}>
    {items.map(item => (
      <li key={item.url} className="tabs__tab">
        <a className={bemClass('tabs__link', { active: item.url === currentUrl })} href={item.url}>
          {children(item)}
        </a>
      </li>
    ))}
  </ul>
);

Tabs.displayName = 'Tabs';

Tabs.defaultProps = {
  children: x => x.title,
};

Tabs.propTypes = {
  className: PropTypes.string,
  children: PropTypes.func,
  currentUrl: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Tabs;
