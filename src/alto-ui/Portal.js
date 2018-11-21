import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Portal extends React.PureComponent {
  constructor() {
    super();

    this.el = document.createElement('div');
  }

  componentDidMount() {
    if (this.props.display) {
      this.mount();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.display && !this.props.display) {
      this.unmount();
    }
    if (!prevProps.display && this.props.display) {
      this.mount();
    }
  }

  componentWillUnmount() {
    this.unmount();
  }

  getRoot() {
    const { root } = this.props;
    return (
      (typeof root === 'string' && document.querySelector(root)) ||
      (root && typeof root.appendChild === 'function' && root) ||
      document.body
    );
  }

  mount() {
    this.unmount();
    this.root = this.getRoot();
    this.root.appendChild(this.el);
  }

  unmount() {
    if (this.root) {
      this.root.removeChild(this.el);
      this.root = null;
    }
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

Portal.defaultProps = {
  display: true,
};

Portal.propTypes = {
  root: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.any,
  display: PropTypes.bool,
};

export default Portal;
