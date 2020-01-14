import React from 'react';
import PropTypes from 'prop-types';

import './SkipLink.scss';

const handleFocus = target => event => {
  event.preventDefault();
  const element = document.getElementById(target);
  const originTabindex = element.tabIndex;

  if (originTabindex === undefined || originTabindex < 0) {
    element.tabIndex = 0;
  }

  element.focus();

  if (originTabindex === undefined || originTabindex < 0) {
    element.tabIndex = -1;
  }
};

const SkipLink = ({ className, target, ...props }) => (
  <a {...props} href={`#${target}`} className="SkipLink" onClick={handleFocus(target)} />
);

SkipLink.propTypes = {
  className: PropTypes.string,
  target: PropTypes.string.isRequired,
};

export default SkipLink;