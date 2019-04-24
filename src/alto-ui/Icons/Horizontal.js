import React from 'react';
import Icon from './Icon';

const Horizontal = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <path
          {...ownProps}
          d="M30,32H6a2,2,0,0,1-2-2V6A2,2,0,0,1,6,4H18a1,1,0,0,1,0,2H6V30H30V18a1,1,0,0,1,2,0V30A2,2,0,0,1,30,32Z"
        />
        <path
          {...ownProps}
          d="M32,5v8.59a1,1,0,0,1-1.71.7l-3.58-3.58-7.59,7.58a1,1,0,0,1-1.41,0,1,1,0,0,1-.29-.71,1,1,0,0,1,.29-.7L25.3,9.3,21.71,5.71A1,1,0,0,1,22.41,4H31A1,1,0,0,1,32,5Z"
        />
      </g>
    )}
  </Icon>
);

Horizontal.displayName = 'Horizontal';

export default Horizontal;
