import React from 'react';
import PropTypes from 'prop-types';

import { bemClass } from '../../helpers/bem';
import './Label.scss';

const Label = ({ tag, htmlFor, readOnly, hidden, ...props }) =>
  React.createElement(tag, {
    ...props,
    className: bemClass('label', { readOnly, hidden }),
    htmlFor: tag === 'label' ? htmlFor : undefined,
  });

Label.displayName = 'Label';

Label.defaultProps = {
  tag: 'label',
};

Label.propTypes = {
  tag: PropTypes.string,
  htmlFor: PropTypes.string,
  readOnly: PropTypes.bool,
  hidden: PropTypes.bool,
};

export default Label;
