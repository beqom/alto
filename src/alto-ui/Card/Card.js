import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import './Card.scss';

const Card = ({ className, children, title }) => (
  <div className={classnames('Card', className)}>
    {title && (
      <header className="Card__header">
        <div className="Card__title">{title}</div>
      </header>
    )}
    <div className="Card__body">{children}</div>
  </div>
);

Card.displayName = 'Card';

Card.defaultProps = {};

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

export default Card;
