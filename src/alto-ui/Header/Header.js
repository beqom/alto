import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Spinner from '../Spinner';
import Link from '../Link';

import './Header.scss';

const Header = ({ className, children, title, loading, id, superTitle, superUrl }) => (
  <header id={id} className={classnames('Header', className)}>
    <div>
      <h1 className="Header__title-group">
        <div className="Header__super-title">
          {superUrl ? (
            <Link className="Header__super-title-link" href={superUrl}>
              {superTitle}
            </Link>
          ) : (
            superTitle
          )}
        </div>
        <div className="Header__title">{title}</div>
      </h1>
    </div>

    {loading && (
      <Spinner id={id ? `Header--${id}__loader` : undefined} className="Header__loader" />
    )}
    <div className="Header__actions">{children}</div>
  </header>
);

Header.displayName = 'Header';

Header.defaultProps = {};

Header.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.any,
  children: PropTypes.any,
  loading: PropTypes.bool,
  superTitle: PropTypes.any,
  superUrl: PropTypes.string,
};

export default Header;
