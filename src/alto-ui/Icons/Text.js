import React from 'react';
import Icon from './Icon';

const Text = props => (
  <Icon {...props}>
    {ownProps => (
      <polygon {...ownProps} points="20 30 24 30 24 33 12 33 12 30 16 30 16 8 8 8 8 10 6 10 6 4 7.17 4 28.83 4 30 4 30 10 28 10 28 8 20 8 20 30" />
    )}
  </Icon>
);

export default Text;
