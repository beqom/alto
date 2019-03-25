import React from 'react';
import Icon from './Icon';

const Details = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <path
          {...ownProps}
          d="M31,14H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4H31a1,1,0,0,1,1,1v8A1,1,0,0,1,31,14ZM6,12H30V6H6Z"
        />
        <path
          {...ownProps}
          d="M16,23H5a1,1,0,0,1-1-1V17a1,1,0,0,1,1-1H16a1,1,0,0,1,1,1v5A1,1,0,0,1,16,23ZM6,21h9V18H6Z"
        />
        <path
          {...ownProps}
          d="M31,23H20a1,1,0,0,1-1-1V17a1,1,0,0,1,1-1H31a1,1,0,0,1,1,1v5A1,1,0,0,1,31,23ZM21,21h9V18H21Z"
        />
        <path
          {...ownProps}
          d="M16,32H5a1,1,0,0,1-1-1V26a1,1,0,0,1,1-1H16a1,1,0,0,1,1,1v5A1,1,0,0,1,16,32ZM6,30h9V27H6Z"
        />
        <path
          {...ownProps}
          d="M31,32H20a1,1,0,0,1-1-1V26a1,1,0,0,1,1-1H31a1,1,0,0,1,1,1v5A1,1,0,0,1,31,32ZM21,30h9V27H21Z"
        />
      </g>
    )}
  </Icon>
);

Details.displayName = 'Details';

export default Details;
