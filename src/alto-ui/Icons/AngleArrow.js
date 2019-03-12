import React from 'react';
import Icon from './Icon';

const AngleArrow = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <path
          {...ownProps}
          d="M29,19.41a1,1,0,0,1-.71-.29L18,8.83,7.71,19.12a1,1,0,0,1-1.41-1.41L18,6,29.71,17.71A1,1,0,0,1,29,19.41Z"
        />
        <path
          {...ownProps}
          d="M29,30.41a1,1,0,0,1-.71-.29L18,19.83,7.71,30.12a1,1,0,0,1-1.41-1.41L18,17,29.71,28.71A1,1,0,0,1,29,30.41Z"
        />
      </g>
    )}
  </Icon>
);

AngleArrow.displayName = 'AngleArrow';

export default AngleArrow;
