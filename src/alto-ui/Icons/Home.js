import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const HomeOutline = props => (
  <g>
    <path
      {...props}
      d="M33.71,17.29l-15-15a1,1,0,0,0-1.41,0l-15,15a1,1,0,0,0,1.41,1.41L18,4.41,32.29,18.71a1,1,0,0,0,1.41-1.41Z"
    />
    <path
      {...props}
      d="M28,32h-5V22H13V32H8V18L6,20V32a2,2,0,0,0,2,2h7V24h6V34h7a2,2,0,0,0,2-2V19.76l-2-2Z"
    />
  </g>
);

const HomeSolid = props => (
  <g>
    <path
      {...props}
      d="M33,19a1,1,0,0,1-.71-.29L18,4.41,3.71,18.71a1,1,0,0,1-1.41-1.41l15-15a1,1,0,0,1,1.41,0l15,15A1,1,0,0,1,33,19Z"
    />
    <path {...props} d="M18,7.79,6,19.83V32a2,2,0,0,0,2,2h7V24h6V34h7a2,2,0,0,0,2-2V19.76Z" />
  </g>
);

const Home = props => (
  <Icon {...props}>
    {props.outline
      ? ownProps => <HomeOutline {...ownProps} />
      : ownProps => <HomeSolid {...ownProps} />}
  </Icon>
);

Home.displayName = 'Home';

Home.defaultProps = {
  outline: false,
};

Home.propTypes = {
  outline: PropTypes.bool,
};

export default Home;
