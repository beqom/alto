import React from 'react';
import Icon from './Icon';

const People = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <path {...ownProps} d="M18.5,18C14,18,10,21,10,24v5H27V24C27,21,23,18,18.5,18Z" />
        <circle {...ownProps} cx="18.5" cy="11.25" r="4.5" />
        <path
          {...ownProps}
          d="M27.51,10.45a3.1,3.1,0,0,0-.87.12,3,3,0,0,1,0,.43,4.25,4.25,0,0,1-2.58,3.89,3.56,3.56,0,1,0,3.43-4.44Z"
        />
        <path {...ownProps} d="M10,20c-3.7,0-7,1.92-7,4v5H8V25c0-3,.49-3.88,2-5Z" />
        <path {...ownProps} d="M27,20c1.51,1.12,2,2,2,5v4h5V24c0-2.08-3.3-4-7-4Z" />
        <path
          {...ownProps}
          d="M10.34,11a3,3,0,0,1,0-.43,3.1,3.1,0,0,0-.87-.12,3.5,3.5,0,1,0,3.43,4.44A4.25,4.25,0,0,1,10.34,11Z"
        />
      </g>
    )}
  </Icon>
);

People.displayName = 'People';

export default People;
