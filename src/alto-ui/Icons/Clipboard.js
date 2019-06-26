import React from 'react';
import Icon from './Icon';

const Clipboard = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <path
          {...ownProps}
          d="M27,5V8a1,1,0,0,1-1,1H10A1,1,0,0,1,9,8V5A1,1,0,0,0,8,4H7A1,1,0,0,0,6,5V33a1,1,0,0,0,1,1H29a1,1,0,0,0,1-1V5a1,1,0,0,0-1-1H28A1,1,0,0,0,27,5ZM25,27H11a1,1,0,0,1-1-1h0a1,1,0,0,1,1-1H25a1,1,0,0,1,1,1h0A1,1,0,0,1,25,27Zm0-6H11a1,1,0,0,1-1-1h0a1,1,0,0,1,1-1H25a1,1,0,0,1,1,1h0A1,1,0,0,1,25,21Zm0-6H11a1,1,0,0,1-1-1h0a1,1,0,0,1,1-1H25a1,1,0,0,1,1,1h0A1,1,0,0,1,25,15Z"
        />
        <rect {...ownProps} x="11" y="2" width="14" height="5" rx="1" />
      </g>
    )}
  </Icon>
);

Clipboard.displayName = 'Clipboard';

export default Clipboard;
