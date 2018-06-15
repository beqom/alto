import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Link from '../Link';
import ChevronLeft from '../Icons/ChevronLeft';
import ChevronRight from '../Icons/ChevronRight';
import './Breadcrumb.scss';

const renderItems = (breadcrumbId, items, backToLabel) => {
  if (items.length === 1) {
    const { title, url } = items[0];
    return (
      <li className="Breadcrumb__item">
        <ChevronLeft className="Breadcrumb__chevron Breadcrumb__chevron--solo" />
        <Link
          id={breadcrumbId ? `${breadcrumbId}__item--0` : undefined}
          className="Breadcrumb__link"
          href={url}
        >
          {`${backToLabel} ${title}`}
        </Link>
      </li>
    );
  }

  return items.map(({ title, url }, i) => (
    <li className="Breadcrumb__item" key={url}>
      {i !== 0 && <ChevronRight className="Breadcrumb__chevron" />}
      <Link
        id={breadcrumbId ? `${breadcrumbId}__item--${i}` : undefined}
        className="Breadcrumb__link"
        href={url}
      >
        {title}
      </Link>
    </li>
  ));
};

const Breadcrumb = ({ id, items, className, labels }) => {
  if (!items || !items.length) return null;

  const breadcrumbLabels = { backToLabel: 'Back to', ...labels };
  return (
    <ul id={id} className={classnames('Breadcrumb', className)}>
      {renderItems(id, items, breadcrumbLabels.backToLabel)}
    </ul>
  );
};

Breadcrumb.displayName = 'Breadcrumb';

Breadcrumb.defaultProps = {};

Breadcrumb.propTypes = {
  id: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ),
  className: PropTypes.string,
  labels: PropTypes.shape({
    backToLabel: PropTypes.string.isRequired,
  }),
};

export default Breadcrumb;
