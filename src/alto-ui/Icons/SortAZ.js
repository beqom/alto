import React from 'react';
import Icon from './Icon';

const SortAZ = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <path {...ownProps} d="M10.45,33,17,26H12V3h-3V26h-5Zm1.2-4.39h.07l-.07.06Z" />
        <path
          {...ownProps}
          d="M31.27,32.48a1,1,0,0,1-1,1H21.33a1,1,0,0,1-1-1V31.15a1,1,0,0,1,.24-.65l7.71-9H20.81a1,1,0,1,1,0-2h8.93a1,1,0,0,1,1,1v.84a.93.93,0,0,1-.25.65l-8.13,9.5h7.89A1,1,0,0,1,31.27,32.48Z"
        />
        <path
          {...ownProps}
          d="M30,16.2,26,3.72a1,1,0,0,0-1.91,0l-4,12.48a1,1,0,0,0,.66,1.26A1,1,0,0,0,22,16.8L23,13.5h4l1.07,3.31a1,1,0,0,0,.95.69,1.19,1.19,0,0,0,.32-.05A1,1,0,0,0,30,16.2Zm-6.34-4.69,1.36-4.22,1.36,4.22Z"
        />
      </g>
    )}
  </Icon>
);

SortAZ.displayName = 'SortAZ';

export default SortAZ;
