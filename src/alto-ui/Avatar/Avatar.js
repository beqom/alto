import React from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../helpers/bem';
import UserIcon from '../Icons/User';
import Image from '../Image';

import './Avatar.scss';

const Avatar = ({ className, src, alt, large, small, big }) => (
  <div className={bemClass('Avatar', { big, large, small }, className)}>
    <Image className="Avatar__image" {...{ src, alt }}>
      <div className="Avatar__placeholder">
        <div className="Avatar__placeholder-icon-container">
          <UserIcon className="Avatar__placeholder-icon" />
        </div>
      </div>
    </Image>
  </div>
);

Avatar.displayName = 'Avatar';

Avatar.defaultProps = {};

Avatar.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  big: PropTypes.bool,
  large: PropTypes.bool,
  small: PropTypes.bool,
};

export default Avatar;
