import React from 'react';

import './VisuallyHidden.scss';

const VisuallyHidden = props => <div {...props} className="visually-hidden" />;

VisuallyHidden.displayName = 'VisuallyHidden';

VisuallyHidden.defaultProps = {};

VisuallyHidden.propTypes = {};

export default VisuallyHidden;
