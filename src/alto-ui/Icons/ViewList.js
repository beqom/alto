import React from 'react';
import Icon from './Icon';

const ListCards = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <rect {...ownProps} x="2" y="8" width="2" height="2" />
        <path {...ownProps} d="M7,10H31a1,1,0,0,0,0-2H7a1,1,0,0,0,0,2Z" />
        <rect {...ownProps} x="2" y="14" width="2" height="2" />
        <path {...ownProps} d="M31,14H7a1,1,0,0,0,0,2H31a1,1,0,0,0,0-2Z" />
        <rect {...ownProps} x="2" y="20" width="2" height="2" />
        <path {...ownProps} d="M31,20H7a1,1,0,0,0,0,2H31a1,1,0,0,0,0-2Z" />
        <rect {...ownProps} x="2" y="26" width="2" height="2" />
        <path {...ownProps} d="M31,26H7a1,1,0,0,0,0,2H31a1,1,0,0,0,0-2Z" />
      </g>
    )}
  </Icon>
);

ListCards.displayName = 'ListCards';

export default ListCards;
