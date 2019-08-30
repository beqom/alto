import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Image({ children, alt, src, srcAlt, onError, onLoad, ...props }) {
  const [state, setState] = useState({
    src: srcAlt,
    loaded: false,
  });

  useEffect(() => {
    if (!src) return undefined;

    setState({ src: srcAlt, loaded: false });
    const img = document.createElement('IMG');

    img.src = src;
    const onLoadListener = () => {
      setState(() => ({ src, loaded: true }));
      if (typeof onLoad === 'function') {
        onLoad();
      }
    };
    img.addEventListener('load', onLoadListener);

    if (typeof onError === 'function') {
      img.addEventListener('error', onError);
    }

    return () => {
      img.removeEventListener('load', onLoadListener);
      if (typeof onError === 'function') {
        img.removeEventListener('error', onError);
      }
    };
  }, [src]);

  if (children && !state.loaded) {
    return children;
  }

  return <img {...props} alt={alt} src={state.src} />;
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
  /** @type {function} On error image */
  onError: PropTypes.func,
  /** @type {function} On load image */
  onLoad: PropTypes.func,
};

export default Image;
