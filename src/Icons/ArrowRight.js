import React from 'react';
import PropTypes from 'prop-types';

const ArrowRight = ({ size, color }) => (
  <svg
    version="1.1"
    viewBox="0 0 36 36"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    width={size}
    height={size}
    transform="rotate(90)"
  >
    <path
      fill={color}
      d="M27.66,15.61,18,6,8.34,15.61A1,1,0,1,0,9.75,17L17,9.81V28.94a1,1,0,1,0,2,0V9.81L26.25,17a1,1,0,0,0,1.41-1.42Z"
    />
  </svg>
);

ArrowRight.displayName = 'ArrowRight';

ArrowRight.defaultProps = {
  size: '1em',
  color: 'currentColor',
};

ArrowRight.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};

export default ArrowRight;
