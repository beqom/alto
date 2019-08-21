import React from 'react';
import Icon from './Icon';

const Money = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <path
          {...ownProps}
          d="M16.19,21v-.89h1.34V16.17h-1.1v-.68a5.49,5.49,0,0,0,.78-.2,4.27,4.27,0,0,0,.61-.29h.81v5.11h1.18V21ZM18,23a5,5,0,1,0-5-5A5,5,0,0,0,18,23Zm10,2h4V21a4.07,4.07,0,0,0-3,1A4.07,4.07,0,0,0,28,25Zm0-14a4.07,4.07,0,0,0,1,3,4.07,4.07,0,0,0,3,1V11ZM8,25a4.07,4.07,0,0,0-1-3,4.07,4.07,0,0,0-3-1v4ZM8,11H4v4a4.07,4.07,0,0,0,3-1A4.07,4.07,0,0,0,8,11ZM3,10H33V26H3Z"
        />
      </g>
    )}
  </Icon>
);

Money.displayName = 'Money';

export default Money;
