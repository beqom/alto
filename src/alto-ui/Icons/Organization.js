import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const OrganizationOutline = props => (
  <g>
    <polygon
      {...props}
      points="9.8 18.8 26.2 18.8 26.2 21.88 27.8 21.88 27.8 17.2 18.8 17.2 18.8 14 17.2 14 17.2 17.2 8.2 17.2 8.2 21.88 9.8 21.88 9.8 18.8"
    />
    <path
      {...props}
      d="M14,23H4a2,2,0,0,0-2,2v6a2,2,0,0,0,2,2H14a2,2,0,0,0,2-2V25A2,2,0,0,0,14,23ZM4,31V25H14v6Z"
    />
    <path
      {...props}
      d="M32,23H22a2,2,0,0,0-2,2v6a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V25A2,2,0,0,0,32,23ZM22,31V25H32v6Z"
    />
    <path
      {...props}
      d="M13,13H23a2,2,0,0,0,2-2V5a2,2,0,0,0-2-2H13a2,2,0,0,0-2,2v6A2,2,0,0,0,13,13Zm0-8H23v6H13Z"
    />
  </g>
);

const OrganizationSolid = props => (
  <g>
    <polygon
      {...props}
      points="9.8 18.8 26.2 18.8 26.2 21.88 27.8 21.88 27.8 17.2 18.8 17.2 18.8 14 17.2 14 17.2 17.2 8.2 17.2 8.2 21.88 9.8 21.88 9.8 18.8"
    />
    <rect {...props} x="2" y="23" width="14" height="10" rx="2" ry="2" />
    <rect {...props} x="20" y="23" width="14" height="10" rx="2" ry="2" />
    <rect {...props} x="11" y="3" width="14" height="10" rx="2" ry="2" />
  </g>
);

const Organization = props => (
  <Icon {...props}>
    {props.outline
      ? ownProps => <OrganizationOutline {...ownProps} />
      : ownProps => <OrganizationSolid {...ownProps} />}
  </Icon>
);

Organization.displayName = 'Organization';

Organization.defaultProps = {
  outline: false,
};

Organization.propTypes = {
  outline: PropTypes.bool,
};

export default Organization;
