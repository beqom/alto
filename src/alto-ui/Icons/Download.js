import React from 'react';
import Icon from './Icon';

const Download = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <path {...ownProps} d="M31,31H5a1,1,0,0,0,0,2H31a1,1,0,0,0,0-2Z" />
        <path
          {...ownProps}
          d="M18,29.48,28.61,18.87a1,1,0,0,0-1.41-1.41L19,25.65V5a1,1,0,0,0-2,0V25.65L8.81,17.46a1,1,0,1,0-1.41,1.41Z"
        />
      </g>
    )}
  </Icon>
);

Download.displayName = 'Download';

export default Download;
