import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const InfoStandardOutline = props => (
  <g>
    <circle {...props} cx="17.97" cy="10.45" r="1.4" />
    <path {...props} d="M21,25H19V14.1H16a1,1,0,0,0,0,2h1V25H15a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2Z" />
    <path
      {...props}
      d="M18,34A16,16,0,1,1,34,18,16,16,0,0,1,18,34ZM18,4A14,14,0,1,0,32,18,14,14,0,0,0,18,4Z"
    />
  </g>
);

const InfoStandardSolid = props => (
  <path
    {...props}
    d="M18,2.1a16,16,0,1,0,16,16A16,16,0,0,0,18,2.1Zm-.1,5.28a2,2,0,1,1-2,2A2,2,0,0,1,17.9,7.38Zm3.6,21.25h-7a1.4,1.4,0,1,1,0-2.8h2.1v-9.2H15a1.4,1.4,0,1,1,0-2.8h4.4v12h2.1a1.4,1.4,0,1,1,0,2.8Z"
  />
);

const InfoStandard = props => (
  <Icon {...props}>
    {props.outline
      ? ownProps => <InfoStandardOutline {...ownProps} />
      : ownProps => <InfoStandardSolid {...ownProps} />}
  </Icon>
);

InfoStandard.displayName = 'InfoStandard';

InfoStandard.defaultProps = {
  outline: false,
};

InfoStandard.propTypes = {
  outline: PropTypes.bool,
};

export default InfoStandard;
