import React from 'react';
import Icon from './Icon';

const ShortText = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <path
          {...ownProps}
          d="M28.71,21v1a1,1,0,0,1-1.07,1H4.07A1,1,0,0,1,3,22V21a1,1,0,0,1,1.07-1H27.64A1,1,0,0,1,28.71,21Z"
        />
        <path
          {...ownProps}
          d="M33,13v1a1,1,0,0,1-1.07,1H4.07A1,1,0,0,1,3,14V13a1,1,0,0,1,1.07-1H31.93A1,1,0,0,1,33,13Z"
        />
        <path
          {...ownProps}
          d="M27.92,20H4.08A1,1,0,0,0,3,21v1a1,1,0,0,0,1.08,1H27.92A1,1,0,0,0,29,22V21A1,1,0,0,0,27.92,20Zm4-8H4.07A1,1,0,0,0,3,13v1a1,1,0,0,0,1.07,1H31.93A1,1,0,0,0,33,14V13A1,1,0,0,0,31.93,12Z"
        />
      </g>
    )}
  </Icon>
);

export default ShortText;
