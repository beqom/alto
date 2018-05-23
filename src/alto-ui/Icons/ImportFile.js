import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const ImportFileOutline = props => (
  <g>
    <path
      {...props}
      d="M28,4H14.87L8,10.86V15h2V13.61h7.61V6H28V30H8a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V6A2,2,0,0,0,28,4ZM16,12H10v-.32L15.7,6H16Z"
    />
    <path
      {...props}
      d="M11.94,26.28a1,1,0,1,0,1.41,1.41L19,22l-5.68-5.68a1,1,0,0,0-1.41,1.41L15.2,21H3a1,1,0,1,0,0,2H15.23Z"
    />
  </g>
);

const ImportFileSolid = props => (
  <g>
    <path {...props} d="M3,21a1,1,0,1,0,0,2H8V21Z" />
    <path
      {...props}
      d="M28,4H14.87L8,10.86V21H15.2l-3.25-3.25a1,1,0,0,1,1.41-1.41L19,22l-5.68,5.68a1,1,0,0,1-1.41-1.41L15.23,23H8v7a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V6A2,2,0,0,0,28,4ZM16,12H10v-.32L15.69,6H16Z"
    />
  </g>
);

const ImportFile = props => (
  <Icon {...props}>
    {props.outline
      ? ownProps => <ImportFileOutline {...ownProps} />
      : ownProps => <ImportFileSolid {...ownProps} />}
  </Icon>
);

ImportFile.displayName = 'ImportFile';

ImportFile.defaultProps = {
  outline: false,
};

ImportFile.propTypes = {
  outline: PropTypes.bool,
};

export default ImportFile;
