import React from 'react';
import Icon from './Icon';

const Vertical = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <path
          {...ownProps}
          d="M6,4H30a2,2,0,0,1,2,2V30a2,2,0,0,1-2,2H18a1,1,0,0,1,0-2H30V6H6V18a1,1,0,0,1-2,0V6A2,2,0,0,1,6,4Z"
        />
        <path
          {...ownProps}
          d="M4,31V22.41a1,1,0,0,1,1.71-.7l3.58,3.58,7.59-7.58a1,1,0,0,1,1.41,0,1,1,0,0,1,.29.71,1,1,0,0,1-.29.7L10.7,26.7l3.59,3.59a1,1,0,0,1-.7,1.71H5A1,1,0,0,1,4,31Z"
        />
      </g>
    )}
  </Icon>
);

Vertical.displayName = 'Vertical';

export default Vertical;
