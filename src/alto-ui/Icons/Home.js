import React from 'react';
import Icon from './Icon';

const Home = props => (
  <Icon {...props}>
    {ownProps => (
      <g>
        <path
          {...ownProps}
          d="M15,30V22a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v8a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V19a1,1,0,0,1,1-1h4L18,3,2,18H6a1,1,0,0,1,1,1V30a1,1,0,0,0,1,1h6A1,1,0,0,0,15,30Z"
        />
      </g>
    )}
  </Icon>
);

Home.displayName = 'Home';

export default Home;
