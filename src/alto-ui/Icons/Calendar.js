import React from 'react';
import Icon from './Icon';

const Calendar = props => (
  <Icon {...props}>
    {ownProps => (
      <path
        {...ownProps}
        d="M6,32H30a2,2,0,0,0,2-2V15H4V30A2,2,0,0,0,6,32ZM7,7V4A1,1,0,0,1,8,3H8A1,1,0,0,1,9,4V7H25V4a1,1,0,0,1,1-1h0a1,1,0,0,1,1,1V7h5a2,2,0,0,1,2,2V32.09a1.92,1.92,0,0,1-.5,1.34,1.74,1.74,0,0,1-1.25.57H3.75a1.74,1.74,0,0,1-1.25-.57A1.92,1.92,0,0,1,2,32.09V9A2,2,0,0,1,4,7Z"
      />
    )}
  </Icon>
);

export default Calendar;
