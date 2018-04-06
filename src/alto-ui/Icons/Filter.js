import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const outlinePath =
  'M33,4H3A1,1,0,0,0,2,5V6.67a1.79,1.79,0,0,0,.53,1.27L14,19.58v10.2l2,.76V19a1,1,0,0,0-.29-.71L4,6.59V6H32v.61L20.33,18.29A1,1,0,0,0,20,19l0,13.21L22,33V19.5L33.47,8A1.81,1.81,0,0,0,34,6.7V5A1,1,0,0,0,33,4Z';
const solidPath =
  'M22,33V19.5L33.47,8A1.81,1.81,0,0,0,34,6.7V5a1,1,0,0,0-1-1H3A1,1,0,0,0,2,5V6.67a1.79,1.79,0,0,0,.53,1.27L14,19.58v10.2Z';

const Filter = props => (
  <Icon {...props}>
    {ownProps => <path {...ownProps} d={props.outline ? outlinePath : solidPath} />}
  </Icon>
);

Filter.displayName = 'Filter';

Filter.defaultProps = {
  outline: false,
};

Filter.propTypes = {
  outline: PropTypes.bool,
};

export default Filter;
