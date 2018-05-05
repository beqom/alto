import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const EnvelopeOutline = props => (
  <path
    {...props}
    d="M32,6H4A2,2,0,0,0,2,8V28a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V8A2,2,0,0,0,32,6ZM30.46,28H5.66l7-7.24-1.44-1.39L4,26.84V9.52L16.43,21.89a2,2,0,0,0,2.82,0L32,9.21v17.5l-7.36-7.36-1.41,1.41ZM5.31,8H30.38L17.84,20.47Z"
  />
);

const EnvelopeSolid = props => (
  <g>
    <path {...props} d="M32.33,6a2,2,0,0,0-.41,0h-28a2,2,0,0,0-.53.08L17.84,20.47Z" />
    <path
      {...props}
      d="M33.81,7.39,19.25,21.89a2,2,0,0,1-2.82,0L2,7.5a2,2,0,0,0-.07.5V28a2,2,0,0,0,2,2h28a2,2,0,0,0,2-2V8A2,2,0,0,0,33.81,7.39ZM5.3,28H3.91V26.57l7.27-7.21,1.41,1.41Zm26.61,0H30.51l-7.29-7.23,1.41-1.41,7.27,7.21Z"
    />
  </g>
);

const Envelope = props => (
  <Icon {...props}>
    {props.outline
      ? ownProps => <EnvelopeOutline {...ownProps} />
      : ownProps => <EnvelopeSolid {...ownProps} />}
  </Icon>
);

Envelope.displayName = 'Envelope';

Envelope.defaultProps = {
  outline: false,
};

Envelope.propTypes = {
  outline: PropTypes.bool,
};

export default Envelope;
