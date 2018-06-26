import React from 'react';
import '../src/alto-ui/scss/index.scss';

class Root extends React.Component {
  constructor() {
    super();

    this.state = {
      tabMode: false,
    };

    this.handleKeyboardEventListener = this.handleKeyboardEventListener.bind(this);
    this.handleMouseEventListener = this.handleMouseEventListener.bind(this);
    this.addKeyboardEventListener();
  }

  componentWillUnmout() {
    this.removeKeyboardEventListener();
    this.removeMouseEventListener();
  }

  handleKeyboardEventListener(e) {
    if (e.key === 'Tab') {
      this.setState({ tabMode: true });
      this.removeKeyboardEventListener();
      this.addMouseEventListener();
    }
  }

  handleMouseEventListener() {
    this.setState({ tabMode: false });
    this.removeMouseEventListener();
    this.addKeyboardEventListener();
  }

  addKeyboardEventListener() {
    document.addEventListener('keydown', this.handleKeyboardEventListener);
  }

  addMouseEventListener() {
    document.addEventListener('mouseup', this.handleMouseEventListener);
  }

  removeKeyboardEventListener() {
    document.removeEventListener('keydown', this.handleKeyboardEventListener);
  }
  removeMouseEventListener() {
    document.removeEventListener('mouseup', this.handleMouseEventListener);
  }

  render() {
    return (
      <div
        {...this.props}
        className={this.state.tabMode ? 'focus-feedback' : ''}
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
