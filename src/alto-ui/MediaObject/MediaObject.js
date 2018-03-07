import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { bemClass } from '../helpers/bem';
import Avatar from '../Avatar';
import Image from '../Image';
import ImageIcon from '../Icons/Image';

import './MediaObject.scss';

const MediaObject = ({
  className,
  src,
  alt,
  title,
  subtitle,
  small,
  large,
  white,
  danger,
  success,
  avatar,
  top,
  wrap,
  imageWidth,
  imageHeight,
}) => (
  <div
    className={bemClass(
      'MediaObject',
      { large, small, white, danger, success, top, wrap },
      className
    )}
  >
    {src &&
      (avatar ? (
        <Avatar className="MediaObject__image" src={src} alt={alt} small={small} large={large} />
      ) : (
        <Image
          className="MediaObject__image"
          src={src}
          alt={alt}
          style={Object.assign(
            {},
            imageWidth ? { maxWidth: imageWidth } : {},
            imageHeight ? { maxHeight: imageHeight } : {}
          )}
        >
          <div
            className="MediaObject__image-placeholder"
            style={Object.assign(
              {},
              imageWidth ? { width: imageWidth } : {},
              imageHeight ? { height: imageHeight } : {}
            )}
          >
            <ImageIcon className="MediaObject__image-placeholder-icon" />
          </div>
        </Image>
      ))}
    <div className="MediaObject__content">
      <div className="MediaObject__title">{title}</div>
      {subtitle && <div className="MediaObject__subtitle">{subtitle}</div>}
    </div>
  </div>
);

MediaObject.displayName = 'MediaObject';

MediaObject.defaultProps = {};

MediaObject.propTypes = {
  className: PropTypes.string,
  title: PropTypes.any.isRequired,
};

export default MediaObject;
