import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const ChevronRight = props => (
  <Icon {...props}>
    <g transform="rotate(90, 18, 18)">
      <path
        fill={props.color}
        d="M29.52,22.52,18,10.6,6.48,22.52a1.7,1.7,0,0,0,2.45,2.36L18,15.49l9.08,9.39a1.7,1.7,0,0,0,2.45-2.36Z"
      />
    </g>
  </Icon>
);

ChevronRight.displayName = 'ChevronRight';

ChevronRight.defaultProps = {
  color: 'currentColor',
};

ChevronRight.propTypes = {
  color: PropTypes.string,
};

export default ChevronRight;
