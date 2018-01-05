import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Link from '../Link';
import ChevronLeft from '../Icons/ChevronLeft';
import ChevronRight from '../Icons/ChevronRight';
import './Breadcrumb.scss';

const renderItems = items => {
  if (items.length === 1) {
    const { title, url } = items[0];
    return (
      <li className="breadcrumb__item">
        <ChevronLeft className="breadcrumb__chevron breadcrumb__chevron--solo" />
        <Link className="breadcrumb__link" href={url}>
          Back to {title}
        </Link>
      </li>
    );
  }

  return items.map(({ title, url }, i) => (
    <li className="breadcrumb__item" key={url}>
      {i !== 0 && <ChevronRight className="breadcrumb__chevron" />}
      <a className="breadcrumb__link" href={url}>
        {title}
      </a>
    </li>
  ));
};

const Breadcrumb = ({ items, className }) => {
  if (!items || !items.length) return null;

  return <ul className={classnames('breadcrumb', className)}>{renderItems(items)}</ul>;
};

Breadcrumb.displayName = 'Breadcrumb';

Breadcrumb.defaultProps = {};

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ),
  className: PropTypes.string,
};

export default Breadcrumb;
