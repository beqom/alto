import React from 'react';
import Icon from './Icon';

const Analytics = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <path {...ownProps} d="M6.38,19H3.08A12,12,0,1,1,26,14H21.55L17.42,7.51l-4.57,8.63-3-4Z" />
        <path
          {...ownProps}
          d="M33.16,31.16,31,33.36,21.2,23.61A12,12,0,0,1,4.25,21H7.62l2.55-5.11,3,4,4.43-8.37L20.45,16h5.38a12.05,12.05,0,0,1-2.4,5.43Z"
        />
        <path {...ownProps} d="M34,15v0a1,1,0,0,1-1,1H25.83A12,12,0,0,0,26,14h7A1,1,0,0,1,34,15Z" />
      </g>
    )}
  </Icon>
);

Analytics.displayName = 'Analytics';

export default Analytics;
