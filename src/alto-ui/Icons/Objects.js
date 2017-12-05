import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const ObjectsOutline = props => (
  <g>
    <path
      {...props}
      d="M16.08,14.9a10.41,10.41,0,0,1,1.87-.71l-4-10.77a2,2,0,0,0-3.75,0L2,25.26A2,2,0,0,0,3.92,28h6.94a10,10,0,0,1-.52-2H3.92L12.06,4.12Z"
    />
    <path
      {...props}
      d="M32,9H22a2,2,0,0,0-2,2v2.85c.23,0,.46,0,.69,0A10.51,10.51,0,0,1,22,13.9V11H32V21H30.65a10.42,10.42,0,0,1,.45,2H32a2,2,0,0,0,2-2V11A2,2,0,0,0,32,9Z"
    />
    <path
      {...props}
      d="M20.69,15.81a8.5,8.5,0,1,0,8.5,8.5A8.51,8.51,0,0,0,20.69,15.81Zm0,15a6.5,6.5,0,1,1,6.5-6.5A6.51,6.51,0,0,1,20.69,30.81Z"
    />
  </g>
);

const ObjectsSolid = props => (
  <g>
    <path
      {...props}
      d="M10.65,24.44a9.51,9.51,0,0,1,7.06-9.17L13,3a1,1,0,0,0-1.87,0L2.07,26.56A1,1,0,0,0,3,27.92h8.32A9.44,9.44,0,0,1,10.65,24.44Z"
    />
    <path
      {...props}
      d="M32,10H20a1,1,0,0,0-1,1v4a9.43,9.43,0,0,1,10.63,9H32a1,1,0,0,0,1-1V11A1,1,0,0,0,32,10Z"
    />
    <circle {...props} cx="20.15" cy="24.44" r="7.5" />
  </g>
);

const Objects = props => (
  <Icon {...props}>
    {props.outline
      ? ownProps => <ObjectsOutline {...ownProps} />
      : ownProps => <ObjectsSolid {...ownProps} />}
  </Icon>
);

Objects.displayName = 'Objects';

Objects.defaultProps = {
  outline: false,
};

Objects.propTypes = {
  outline: PropTypes.bool,
};

export default Objects;
