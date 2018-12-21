import React from 'react';
import '../src/alto-ui/scss/index.scss';
import addFocusFeedbackListener from '../src/alto-ui/addFocusFeedbackListener';

class Root extends React.Component {
  constructor() {
    super();

    this.removeFocusFeedbackListener = addFocusFeedbackListener();
  }

  componentWillUnmout() {
    this.removeFocusFeedbackListener();
  }

  render() {
    return (
      <div
        {...this.props}
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
  }
}

export default Root;
