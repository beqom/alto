import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash.omit';

class Image extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      src: props.srcAlt,
      loaded: false,
    };

    this.loadImage(props.src);
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.props.src) {
      this.setState({ src: nextProps.srcAlt, loaded: false });
      this.loadImage(nextProps.src);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  loadImage(src) {
    if (!src) return;
    const img = document.createElement('IMG');

    img.src = src;
    img.onload = () => {
      if (this.mounted) {
        this.setState(() => ({ src, loaded: true }));
      }
    };
  }

  render() {
    if (this.props.children && !this.state.loaded) {
      return this.props.children;
    }
    return (
      <img
        {...omit(this.props, ['srcAlt', 'children'])}
        alt={this.props.alt}
        src={this.state.src}
      />
    );
  }
}

Image.propTypes = {
  /** @type {any} Default content to display - used if src failed to load */
  children: PropTypes.any,
  /** @type {string} Default image URL- used if src failed to load */
  srcAlt: PropTypes.string,
  /** @type {string} Image URL */
  src: PropTypes.string,
  /** @type {string} Image alt text */
  alt: PropTypes.string,
};

export default Image;
