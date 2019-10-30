import React from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../helpers/bem';
import Avatar from '../Avatar';

import './Media.scss';

const Media = ({
  className,
  src,
  alt,
  title,
  subtitle,
  description,
  small,
  large,
  white,
  wrap,
  active,
  getDefaultAvatarIcon,
}) => (
  <div className={bemClass('Media', { large, small, white, wrap, active }, className)}>
    {src && (
      <Avatar
        className="Media__image"
        src={src}
        alt={alt}
        small={small}
        large={large}
        getDefaultAvatarIcon={getDefaultAvatarIcon}
      />
    )}
    <div className="Media__content">
      <div className="Media__title">{title}</div>
      {!small && subtitle && <div className="Media__subtitle">{subtitle}</div>}
      {!small && description && <div className="Media__description">{description}</div>}
    </div>
  </div>
);

Media.displayName = 'Media';

Media.defaultProps = {};

Media.propTypes = {
  className: PropTypes.string,
  title: PropTypes.any.isRequired,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  small: PropTypes.bool,
  large: PropTypes.bool,
  white: PropTypes.bool,
  wrap: PropTypes.bool,
  active: PropTypes.bool,
  getDefaultAvatarIcon: PropTypes.func,
};

export default Media;
