import React from 'react';
import Icon from './Icon';

const Dashboard = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <path
          {...ownProps}
          d="M16,32H5a1,1,0,0,1-1-1V20a1,1,0,0,1,1-1H16a1,1,0,0,1,1,1V31A1,1,0,0,1,16,32ZM6,30h9V21H6Z"
        />
        <path
          {...ownProps}
          d="M16,17H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4H16a1,1,0,0,1,1,1V16A1,1,0,0,1,16,17ZM6,15h9V6H6Z"
        />
        <path
          {...ownProps}
          d="M31,17H20a1,1,0,0,1-1-1V5a1,1,0,0,1,1-1H31a1,1,0,0,1,1,1V16A1,1,0,0,1,31,17ZM21,15h9V6H21Z"
        />
        <path
          {...ownProps}
          d="M29,25.5a1,1,0,0,1-1,1H26.5V28a1,1,0,0,1-2,0V26.5H23a1,1,0,0,1,0-2h1.5V23a1,1,0,0,1,2,0v1.5H28A1,1,0,0,1,29,25.5Z"
        />
      </g>
    )}
  </Icon>
);

Dashboard.displayName = 'Dashboard';

export default Dashboard;
