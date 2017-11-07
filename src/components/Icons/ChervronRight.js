import React from 'react';
import PropTypes from 'prop-types';

const ChevronRight = ({ size, color }) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 256 256"
  >
    <polygon fill={color} points="79.093,0 48.907,30.187 146.72,128 48.907,225.813 79.093,256 207.093,128" />
  </svg>
);


ChevronRight.displayName = 'ChevronRight';

ChevronRight.defaultProps = {
  size: '1em',
  color: 'currentColor',
};

ChevronRight.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};

export default ChevronRight;
