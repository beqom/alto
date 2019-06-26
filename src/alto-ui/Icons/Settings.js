import React from 'react';
import Icon from './Icon';

const Settings = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <path
          {...ownProps}
          d="M12,12V16a1,1,0,0,1-1,1H8V33a1,1,0,0,1-2,0V17H3a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H6V3A1,1,0,0,1,8,3v8h3A1,1,0,0,1,12,12Z"
        />
        <path
          {...ownProps}
          d="M23,23v4a1,1,0,0,1-1,1H19v5a1,1,0,0,1-2,0V28H14a1,1,0,0,1-1-1V23a1,1,0,0,1,1-1h3V3a1,1,0,0,1,2,0V22h3A1,1,0,0,1,23,23Z"
        />
        <path
          {...ownProps}
          d="M34,7v4a1,1,0,0,1-1,1H30V33a1,1,0,0,1-2,0V12H25a1,1,0,0,1-1-1V7a1,1,0,0,1,1-1h3V3a1,1,0,0,1,2,0V6h3A1,1,0,0,1,34,7Z"
        />
      </g>
    )}
  </Icon>
);

Settings.displayName = 'Settings';

export default Settings;
