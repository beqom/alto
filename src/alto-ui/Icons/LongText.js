import React from 'react';
import Icon from './Icon';

const LongText = props => (
  <Icon {...props}>
    {ownProps => (
      <path
        {...ownProps}
        d="M3,9V8A1,1,0,0,1,4.07,7H31.93A1,1,0,0,1,33,8V9a1,1,0,0,1-1.07,1H4.07A1,1,0,0,1,3,9Zm0,6V14a1,1,0,0,1,1.07-1H31.93A1,1,0,0,1,33,14v1a1,1,0,0,1-1.07,1H4.07A1,1,0,0,1,3,15Zm0,6V20a1,1,0,0,1,1.07-1H31.93A1,1,0,0,1,33,20v1a1,1,0,0,1-1.07,1H4.07A1,1,0,0,1,3,21Zm0,6V26a1,1,0,0,1,1.08-1H26.92A1,1,0,0,1,28,26v1a1,1,0,0,1-1.08,1H4.08A1,1,0,0,1,3,27Z"
      />
    )}
  </Icon>
);

export default LongText;
