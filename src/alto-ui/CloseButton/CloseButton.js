import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import VisuallyHidden from '../VisuallyHidden';
import CloseIcon from '../Icons/Close';

// import { bemClass } from '../../helpers/bem';
import './CloseButton.scss';

const CloseButton = props => (
  <button {...props} className={classnames('CloseButton', props.className)}>
    <CloseIcon />
    <div className="CloseButton__label">
      <span aria-hidden="true">ESC</span>
      <VisuallyHidden>{props.a11yLabel}</VisuallyHidden>
    </div>
  </button>
);

CloseButton.propTypes = {
  className: PropTypes.string,
  a11yLabel: PropTypes.string.isRequired,
};

export default CloseButton;
