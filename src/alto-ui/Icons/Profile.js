import React from 'react';
import Icon from './Icon';

const Profile = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <path
          {...ownProps}
          d="M18.5,18C12,18,6,22.69,6,27v6a1,1,0,0,0,1,1H30a1,1,0,0,0,1-1V27C31,22.69,25,18,18.5,18Z"
        />
        <circle {...ownProps} cx="18.5" cy="8.5" r="6.5" />
      </g>
    )}
  </Icon>
);

Profile.displayName = 'Profile';

export default Profile;
