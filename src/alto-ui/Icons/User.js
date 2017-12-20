import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const UserOutline = props => (
  <g>
    <path {...props} d="M18,17a7,7,0,1,0-7-7A7,7,0,0,0,18,17ZM18,5a5,5,0,1,1-5,5A5,5,0,0,1,18,5Z" />
    <path
      {...props}
      d="M30.47,24.37a17.16,17.16,0,0,0-24.93,0A2,2,0,0,0,5,25.74V31a2,2,0,0,0,2,2H29a2,2,0,0,0,2-2V25.74A2,2,0,0,0,30.47,24.37ZM29,31H7V25.73a15.17,15.17,0,0,1,22,0h0Z"
    />
  </g>
);

const UserSolid = props => (
  <g>
    <path
      {...props}
      d="M30.61,24.52a17.16,17.16,0,0,0-25.22,0,1.51,1.51,0,0,0-.39,1v6A1.5,1.5,0,0,0,6.5,33h23A1.5,1.5,0,0,0,31,31.5v-6A1.51,1.51,0,0,0,30.61,24.52Z"
    />
    <circle {...props} cx="18" cy="10" r="7" />
  </g>
);

const User = props => (
  <Icon {...props}>
    {props.outline
      ? ownProps => <UserOutline {...ownProps} />
      : ownProps => <UserSolid {...ownProps} />}
  </Icon>
);

User.displayName = 'User';

User.defaultProps = {
  outline: false,
};

User.propTypes = {
  outline: PropTypes.bool,
};

export default User;
