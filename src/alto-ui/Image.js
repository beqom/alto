import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Image({ children, alt, src, srcAlt, ...props }) {
  const [state, setState] = useState({
    src: srcAlt,
    loaded: false,
  });

  useEffect(() => {
    if (!src) return undefined;

    setState({ src: srcAlt, loaded: false });
    const img = document.createElement('IMG');

    img.src = src;
    const onLoad = () => setState(() => ({ src, loaded: true }));
    img.addEventListener('load', onLoad);

    return () => {
      img.removeEventListener('load', onLoad);
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
};

export default Image;
