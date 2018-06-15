import React from 'react';
import '../src/alto-ui/scss/reset.scss';

const Root = props => (
  <div
    {...props}
    style={{
      backgroundColor: '#f8f9fb',
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      overflow: 'auto',
    }}
  />
);

export default Root;
