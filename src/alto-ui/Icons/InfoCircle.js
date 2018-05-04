import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const InfoCircleOutline = props => (
  <g>
    <circle {...props} cx="17.93" cy="11.9" r="1.4" />
    <path {...props} d="M21,23H19V15H16a1,1,0,0,0,0,2h1v6H15a1,1,0,1,0,0,2h6a1,1,0,0,0,0-2Z" />
    <path
      {...props}
      d="M18,6A12,12,0,1,0,30,18,12,12,0,0,0,18,6Zm0,22A10,10,0,1,1,28,18,10,10,0,0,1,18,28Z"
    />
  </g>
);

const InfoCircleSolid = props => (
  <path
    {...props}
    d="M18,6A12,12,0,1,0,30,18,12,12,0,0,0,18,6Zm-2,5.15a2,2,0,1,1,2,2A2,2,0,0,1,15.9,11.15ZM23,24a1,1,0,0,1-1,1H15a1,1,0,1,1,0-2h2V17H16a1,1,0,0,1,0-2h4v8h2A1,1,0,0,1,23,24Z"
  />
);

const InfoCircle = props => (
  <Icon {...props}>
    {props.outline
      ? ownProps => <InfoCircleOutline {...ownProps} />
      : ownProps => <InfoCircleSolid {...ownProps} />}
  </Icon>
);

InfoCircle.displayName = 'InfoCircle';

InfoCircle.defaultProps = {
  outline: false,
};

InfoCircle.propTypes = {
  outline: PropTypes.bool,
};

export default InfoCircle;
