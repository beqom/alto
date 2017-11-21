import React from 'react';
import PropTypes from 'prop-types';

const ChevronUp = ({ size, color }) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 256 256"
  >
    <polygon fill={color} points="128,48.907 0,176.907 30.187,207.093 128,109.28 225.813,207.093 256,176.907" />
  </svg>
);


ChevronUp.displayName = 'ChevronUp';

ChevronUp.defaultProps = {
  size: '1em',
  color: 'currentColor',
};

ChevronUp.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};

export default ChevronUp;
