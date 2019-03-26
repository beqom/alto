import React from 'react';
import Icon from './Icon';

const Content = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <path {...ownProps} d="M31,10H13a1,1,0,0,1,0-2H31a1,1,0,0,1,0,2Z" />
        <path {...ownProps} d="M31,16H13a1,1,0,0,1,0-2H31a1,1,0,0,1,0,2Z" />
        <path {...ownProps} d="M31,22H5a1,1,0,0,1,0-2H31a1,1,0,0,1,0,2Z" />
        <path {...ownProps} d="M31,28H5a1,1,0,0,1,0-2H31a1,1,0,0,1,0,2Z" />
        <path
          {...ownProps}
          d="M8.39,8H6.73L4.12,16H5.57l.63-2.17H8.88L9.5,16H11ZM6.52,12.72l.28-1c.25-.84.49-1.75.71-2.63h0c.23.87.47,1.79.72,2.63l.28,1Z"
        />
      </g>
    )}
  </Icon>
);

Content.displayName = 'Content';

export default Content;
