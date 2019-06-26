import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const DashboardOutline = props => (
  <g>
    <path
      {...props}
      d="M16,32H5a1,1,0,0,1-1-1V20a1,1,0,0,1,1-1H16a1,1,0,0,1,1,1V31A1,1,0,0,1,16,32ZM6,30h9V21H6Z"
    />
    <path
      {...props}
      d="M16,17H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4H16a1,1,0,0,1,1,1V16A1,1,0,0,1,16,17ZM6,15h9V6H6Z"
    />
    <path
      {...props}
      d="M31,17H20a1,1,0,0,1-1-1V5a1,1,0,0,1,1-1H31a1,1,0,0,1,1,1V16A1,1,0,0,1,31,17ZM21,15h9V6H21Z"
    />
    <path
      {...props}
      d="M29,25.5a1,1,0,0,1-1,1H26.5V28a1,1,0,0,1-2,0V26.5H23a1,1,0,0,1,0-2h1.5V23a1,1,0,0,1,2,0v1.5H28A1,1,0,0,1,29,25.5Z"
    />
  </g>
);

const DashboardSolid = props => (
  <g>
    <rect {...props} x="2" y="2" width="15" height="15" rx="1" />
    <rect {...props} x="19" y="2" width="15" height="15" rx="1" />
    <rect {...props} x="2" y="19" width="15" height="15" rx="1" />
    <path
      {...props}
      d="M32,26v1a1,1,0,0,1-1,1H28v3a1,1,0,0,1-1,1H26a1,1,0,0,1-1-1V28H22a1,1,0,0,1-1-1V26a1,1,0,0,1,1-1h3V22a1,1,0,0,1,1-1h1a1,1,0,0,1,1,1v3h3A1,1,0,0,1,32,26Z"
    />
  </g>
);

const Dashboard = props => (
  <Icon {...props}>
    {props.outline
      ? ownProps => <DashboardOutline {...ownProps} />
      : ownProps => <DashboardSolid {...ownProps} />}
  </Icon>
);

Dashboard.displayName = 'Dashboard';

Dashboard.defaultProps = {
  outline: false,
};

Dashboard.propTypes = {
  outline: PropTypes.bool,
};

export default Dashboard;
