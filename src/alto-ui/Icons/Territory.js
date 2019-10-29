import React from 'react';
import Icon from './Icon';

const Territory = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <path {...ownProps} d="M24.37,7A3.38,3.38,0,1,1,21,10.37,3.37,3.37,0,0,1,24.37,7Z" />
        <path
          {...ownProps}
          d="M13.83,15.21a.46.46,0,0,1,.76,0h0l3.9,6.19L21,18.65a.46.46,0,0,1,.68,0h0l6.72,8.78c.18.23,0,.54-.35.54H7.92c-.3,0-.5-.26-.39-.49h0Z"
        />
      </g>
    )}
  </Icon>
);

Territory.displayName = 'Territory';

export default Territory;
