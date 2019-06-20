import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../helpers/bem';
import UserIcon from '../Icons/User';
import Image from '../Image';

import './Avatar.scss';
import Tooltip from '../Tooltip';

function Avatar({ className, src, alt, tooltip, large, small, big }) {
  const ref = useRef();

  return (
    <div ref={ref} className={bemClass('Avatar', { big, large, small }, className)}>
      <Image className="Avatar__image" src={src} alt={alt || tooltip}>
        <div className="Avatar__placeholder">
          <div className="Avatar__placeholder-icon-container">
            <UserIcon className="Avatar__placeholder-icon" />
          </div>
        </div>
      </Image>
      {!!tooltip && <Tooltip content={tooltip} targetRef={ref} />}
    </div>
  );
}

Avatar.displayName = 'Avatar';

Avatar.defaultProps = {};

Avatar.propTypes = {
  className: PropTypes.string,
  tooltip: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  big: PropTypes.bool,
  large: PropTypes.bool,
  small: PropTypes.bool,
};

export default Avatar;
