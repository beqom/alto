import React from 'react';
import Icon from './Icon';

const Anchor = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <path
          {...ownProps}
          d="M32,20l-4.53,3.91,1.75.61c-2.14,2.55-6,4.23-10.22,4.46V16h1.72a2.26,2.26,0,1,0,0-2H19V10.37a4,4,0,1,0-2,0V14H15.28a2.26,2.26,0,1,0,0,2H17V29c-4.25-.23-8.08-1.91-10.22-4.46l1.75-.61L4,20,2.88,25.88l1.91-.67c2.29,3.15,6.6,5.29,11.43,5.71L18,34l1.78-3.08c4.83-.42,9.14-2.56,11.43-5.71l1.91.67ZM16,6.5a2,2,0,1,1,2,2A2,2,0,0,1,16,6.5Z"
        />
      </g>
    )}
  </Icon>
);

Anchor.displayName = 'Anchor';

export default Anchor;
