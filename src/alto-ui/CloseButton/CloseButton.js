import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import VisuallyHidden from '../VisuallyHidden';
import Link from '../Link';
import CloseIcon from '../Icons/Close';

// import { bemClass } from '../../helpers/bem';
import './CloseButton.scss';

const CloseButton = props => {
  const Component = props.href || props.to ? Link : 'button';
  return (
    <Component {...props} className={classnames('CloseButton', props.className)}>
      <CloseIcon className="CloseButton__icon" />
      <div className="CloseButton__label">
        <span aria-hidden="true">ESC</span>
        <VisuallyHidden>{props.a11yLabel}</VisuallyHidden>
      </div>
    </Component>
  );
};

CloseButton.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  to: PropTypes.string,
  a11yLabel: PropTypes.string.isRequired,
};

export default CloseButton;
