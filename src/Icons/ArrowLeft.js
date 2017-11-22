import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const ArrowLeft = props => (
  <Icon {...props}>
    {ownProps => (
      <g transform="rotate(-90, 18, 18)">
        <path
          {...ownProps}
          d="M27.66,15.61,18,6,8.34,15.61A1,1,0,1,0,9.75,17L17,9.81V28.94a1,1,0,1,0,2,0V9.81L26.25,17a1,1,0,0,0,1.41-1.42Z"
        />
      </g>
    )}
  </Icon>
);

ArrowLeft.displayName = 'ArrowLeft';

export default ArrowLeft;
