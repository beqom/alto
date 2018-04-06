import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const outlinePath =
  'M30,9H16.42L14.11,5.82A2,2,0,0,0,12.49,5H6A2,2,0,0,0,4,7V29a2,2,0,0,0,2,2H30a2,2,0,0,0,2-2V11A2,2,0,0,0,30,9Zm0,20H6V13h7.31a2,2,0,0,0,2-2H6V7h6.49l2.61,3.59a1,1,0,0,0,.81.41H30Z';
const solidPath =
  'M30,9H16.42L14.11,5.82A2,2,0,0,0,12.49,5H6A2,2,0,0,0,4,7V29a2,2,0,0,0,2,2H30a2,2,0,0,0,2-2V11A2,2,0,0,0,30,9ZM6,11V7h6.49l2.72,4Z';

const Folder = props => (
  <Icon {...props}>
    {ownProps => <path {...ownProps} d={props.outline ? outlinePath : solidPath} />}
  </Icon>
);

Folder.displayName = 'Folder';

Folder.defaultProps = {
  outline: false,
};

Folder.propTypes = {
  outline: PropTypes.bool,
};

export default Folder;
