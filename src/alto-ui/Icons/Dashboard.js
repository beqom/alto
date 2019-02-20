import React from 'react';
import Icon from './Icon';

const Dashboard = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <rect {...ownProps} x="2.9" y="3.01" width="7.3" height="7.3" rx="1.42" />
        <rect {...ownProps} x="12.65" y="3.01" width="7.3" height="7.3" rx="1.42" />
        <rect {...ownProps} x="22.4" y="3.01" width="7.3" height="7.3" rx="1.42" />
        <rect {...ownProps} x="2.9" y="12.65" width="7.3" height="7.3" rx="1.42" />
        <rect {...ownProps} x="12.65" y="12.65" width="7.3" height="7.3" rx="1.42" />
        <rect {...ownProps} x="22.4" y="12.65" width="7.3" height="7.3" rx="1.42" />
        <rect {...ownProps} x="2.9" y="22.3" width="7.3" height="7.3" rx="1.42" />
        <rect {...ownProps} x="12.65" y="22.3" width="7.3" height="7.3" rx="1.42" />
        <rect {...ownProps} x="22.4" y="22.3" width="7.3" height="7.3" rx="1.42" />
      </g>
    )}
  </Icon>
);

Dashboard.displayName = 'Dashboard';

export default Dashboard;
