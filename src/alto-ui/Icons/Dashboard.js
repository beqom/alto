import React from 'react';
import Icon from './Icon';

const Dashboard = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <path {...ownProps} d="M19,4v8H5V4Zm2-2H3V14H21V2Z" />
        <path {...ownProps} d="M31,15V31H8V18H25V15Zm2-2H23v3H6V33H33V13Z" />
        <polygon
          {...ownProps}
          points="31 6 31 8 29 8 29 10 27 10 27 8 25 8 25 6 27 6 27 4 29 4 29 6 31 6"
        />
      </g>
    )}
  </Icon>
);

Dashboard.displayName = 'Dashboard';

export default Dashboard;
