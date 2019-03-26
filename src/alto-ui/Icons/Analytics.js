import React from 'react';
import Icon from './Icon';

const Analytics = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <path
          {...ownProps}
          d="M10,28H5a1,1,0,0,1-1-1V17.83a1,1,0,0,1,1-1h5a1,1,0,0,1,1,1V27A1,1,0,0,1,10,28ZM6,26H9V18.83H6Z"
        />
        <path
          {...ownProps}
          d="M20.5,28h-5a1,1,0,0,1-1-1V12.33a1,1,0,0,1,1-1h5a1,1,0,0,1,1,1V27A1,1,0,0,1,20.5,28Zm-4-2h3V13.33h-3Z"
        />
        <path
          {...ownProps}
          d="M31,28H26a1,1,0,0,1-1-1V5a1,1,0,0,1,1-1h5a1,1,0,0,1,1,1V27A1,1,0,0,1,31,28Zm-4-2h3V6H27Z"
        />
        <path {...ownProps} d="M31,32H5a1,1,0,0,1,0-2H31a1,1,0,0,1,0,2Z" />
      </g>
    )}
  </Icon>
);

Analytics.displayName = 'Analytics';

export default Analytics;
