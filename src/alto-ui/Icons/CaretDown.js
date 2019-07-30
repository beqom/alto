import React from 'react';
import Icon from './Icon';

const CaretDown = props => (
  <Icon {...props}>
    {ownProps => (
      <path
        {...ownProps}
        d="M28.2,11H7.83a.73.73,0,0,0-.56,1.2L17.6,24.73a.74.74,0,0,0,1.14,0l10-12.54A.73.73,0,0,0,28.2,11Z"
      />
    )}
  </Icon>
);

CaretDown.displayName = 'CaretDown';

export default CaretDown;
