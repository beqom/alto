import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const FileGroupOutline = props => (
  <g>
    <path
      {...props}
      d="M31,34H13a1,1,0,0,1-1-1V11a1,1,0,0,1,1-1H31a1,1,0,0,1,1,1V33A1,1,0,0,1,31,34ZM14,32H30V12H14Z"
    />
    <rect {...props} x="16" y="16" width="12" height="2" />
    <rect {...props} x="16" y="20" width="12" height="2" />
    <rect {...props} x="16" y="24" width="12" height="2" />
    <path {...props} d="M6,24V4H24V3a1,1,0,0,0-1-1H5A1,1,0,0,0,4,3V25a1,1,0,0,0,1,1H6Z" />
    <path {...props} d="M10,28V8H28V7a1,1,0,0,0-1-1H9A1,1,0,0,0,8,7V29a1,1,0,0,0,1,1h1Z" />
  </g>
);

const FileGroupSolid = props => (
  <g>
    <path
      {...props}
      d="M31,10H13a1,1,0,0,0-1,1V33a1,1,0,0,0,1,1H31a1,1,0,0,0,1-1V11A1,1,0,0,0,31,10ZM28,26H16V24H28Zm0-4H16V20H28Zm0-4H16V16H28Z"
    />
    <path {...props} d="M6,24V4H24V3a1,1,0,0,0-1-1H5A1,1,0,0,0,4,3V25a1,1,0,0,0,1,1H6Z" />
    <path {...props} d="M10,28V8H28V7a1,1,0,0,0-1-1H9A1,1,0,0,0,8,7V29a1,1,0,0,0,1,1h1Z" />
  </g>
);

const FileGroup = props => (
  <Icon {...props}>
    {props.outline
      ? ownProps => <FileGroupOutline {...ownProps} />
      : ownProps => <FileGroupSolid {...ownProps} />}
  </Icon>
);

FileGroup.displayName = 'FileGroup';

FileGroup.defaultProps = {
  outline: false,
};

FileGroup.propTypes = {
  outline: PropTypes.bool,
};

export default FileGroup;
