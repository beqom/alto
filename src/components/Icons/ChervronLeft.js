import React from 'react';
import PropTypes from 'prop-types';

const ChevronLeft = ({ size, color }) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 256 256"
  >
    <polygon fill={color} points="207.093,30.187 176.907,0 48.907,128 176.907,256 207.093,225.813 109.28,128" />
  </svg>
);


ChevronLeft.displayName = 'ChevronLeft';

ChevronLeft.defaultProps = {
  size: '1em',
  color: 'currentColor',
};

ChevronLeft.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};

export default ChevronLeft;
