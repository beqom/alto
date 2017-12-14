import React from 'react';
import Icon from './Icon';

const ViewCards = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <path
          {...ownProps}
          d="M15,17H4a2,2,0,0,1-2-2V8A2,2,0,0,1,4,6H15a2,2,0,0,1,2,2v7A2,2,0,0,1,15,17ZM4,8v7H15V8Z"
        />
        <path
          {...ownProps}
          d="M32,17H21a2,2,0,0,1-2-2V8a2,2,0,0,1,2-2H32a2,2,0,0,1,2,2v7A2,2,0,0,1,32,17ZM21,8v7H32V8Z"
        />
        <path
          {...ownProps}
          d="M15,30H4a2,2,0,0,1-2-2V21a2,2,0,0,1,2-2H15a2,2,0,0,1,2,2v7A2,2,0,0,1,15,30ZM4,21v7H15V21Z"
        />
        <path
          {...ownProps}
          d="M32,30H21a2,2,0,0,1-2-2V21a2,2,0,0,1,2-2H32a2,2,0,0,1,2,2v7A2,2,0,0,1,32,30ZM21,21v7H32V21Z"
        />
      </g>
    )}
  </Icon>
);

ViewCards.displayName = 'ViewCards';

export default ViewCards;
