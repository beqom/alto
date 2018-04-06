import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const outlinePath =
  'M21.89,4H7.83A1.88,1.88,0,0,0,6,5.91V30.09A1.88,1.88,0,0,0,7.83,32H28.17A1.88,1.88,0,0,0,30,30.09V11.92Zm-.3,2.49,6,5.9h-6ZM8,30V6H20v8h8V30Z';
const solidPath =
  'M21.89,4H7.83A1.88,1.88,0,0,0,6,5.91V30.09A1.88,1.88,0,0,0,7.83,32H28.17A1.88,1.88,0,0,0,30,30.09V11.92ZM21,13V5.84L28.3,13Z';

const File = props => (
  <Icon {...props}>
    {ownProps => <path {...ownProps} d={props.outline ? outlinePath : solidPath} />}
  </Icon>
);

File.displayName = 'File';

File.defaultProps = {
  outline: false,
};

File.propTypes = {
  outline: PropTypes.bool,
};

export default File;
