import React from 'react';
import Icon from './Icon';

const SortZA = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <path {...ownProps} d="M10.52,2.88,4,9.88H9v23h3v-23h5ZM9.33,7.28H9.26l.07-.07Z" />
        <path {...ownProps} d="M30.21,15.38v0Z" />
        <path
          {...ownProps}
          d="M30.2,14.38H22.36l8.08-9.51a1,1,0,0,0,.24-.65V3.38a1,1,0,0,0-1-1H20.81a1,1,0,0,0,0,2h7.42l-7.66,9a1,1,0,0,0-.24.65v1.34a1,1,0,0,0,1,1H30.2a1,1,0,0,0,0-2Zm0,1h0v0Z"
        />
        <path
          {...ownProps}
          d="M30.46,32.08l-4-12.5a1,1,0,0,0-1.9,0l-4,12.49a1,1,0,1,0,1.9.61l1.06-3.3h4l1.06,3.3a1,1,0,0,0,1,.7,1,1,0,0,0,.3-.05A1,1,0,0,0,30.46,32.08Zm-6.3-4.7,1.35-4.22,1.35,4.22Z"
        />
      </g>
    )}
  </Icon>
);

SortZA.displayName = 'SortZA';

export default SortZA;
