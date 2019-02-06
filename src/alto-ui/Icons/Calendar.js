import React from 'react';
import Icon from './Icon';

const Calendar = props => (
  <Icon {...props}>
    {ownProps => (
      <path
        {...ownProps}
        d="M5,14V30H31V14Zm28-3.55V30.31a1.64,1.64,0,0,1-.47,1.18,1.68,1.68,0,0,1-1.17.51H4.64a1.68,1.68,0,0,1-1.17-.51A1.64,1.64,0,0,1,3,30.31V10C3,8,3,8,5,8H8V4s.16-1,1.56-1A1.45,1.45,0,0,1,11,4V8H24V4a1.49,1.49,0,0,1,1.5-1A1.43,1.43,0,0,1,27,4V8h6Z"
      />
    )}
  </Icon>
);

export default Calendar;
