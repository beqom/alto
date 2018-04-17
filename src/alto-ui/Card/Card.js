import React from 'react';
import PropTypes from 'prop-types';
import { bemClass } from '../helpers/bem';

import './Card.scss';

const Card = ({ className, children, title, small, large, filled }) => (
  <div className={bemClass('Card', { small, large, filled }, className)}>
    {title && (
      <div className="Card__header">
        <div className="Card__title">{title}</div>
      </div>
    )}
    <div className="Card__body">{children}</div>
  </div>
);

Card.displayName = 'Card';

Card.defaultProps = {};

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  title: PropTypes.any,
  small: PropTypes.bool,
  large: PropTypes.bool,
  filled: PropTypes.bool,
};

export default Card;
