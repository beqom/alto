import React from 'react';
import PropTypes from 'prop-types';

const ChevronDown = ({ size, color }) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 306 306"
  >
    <polygon fill={color} points="270.3,58.65 153,175.95 35.7,58.65 0,94.35 153,247.35 306,94.35" />
  </svg>
);


ChevronDown.displayName = 'ChevronDown';

ChevronDown.defaultProps = {
  size: '1em',
  color: 'currentColor',
};

ChevronDown.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};

export default ChevronDown;
