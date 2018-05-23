import React from 'react';
import Icon from './Icon';

const Upload = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <path {...ownProps} d="M31,31H5a1,1,0,0,0,0,2H31a1,1,0,0,0,0-2Z" />
        <path
          {...ownProps}
          d="M8.81,15,17,6.83V27.48a1,1,0,0,0,2,0V6.83L27.19,15a1,1,0,0,0,1.41-1.41L18,3,7.39,13.61A1,1,0,1,0,8.81,15Z"
        />
      </g>
    )}
  </Icon>
);

Upload.displayName = 'Upload';

export default Upload;
