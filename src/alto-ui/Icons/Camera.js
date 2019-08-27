import React from 'react';
import Icon from './Icon';

const Camera = props => (
  <Icon {...props}>
    {ownProps => (
      <>
        <path {...ownProps} d="M27,10,23,6H13L9,10H5a2,2,0,0,0-2,2V28a2,2,0,0,0,2,2H31a2,2,0,0,0,2-2V12a2,2,0,0,0-2-2ZM18,27a7,7,0,1,1,7-7A7,7,0,0,1,18,27Z" />
        <circle {...ownProps} cx="18" cy="20" r="4" />
      </>
    )}
  </Icon>
);

Camera.displayName = 'Camera';

export default Camera;
