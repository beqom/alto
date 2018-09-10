import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const PopoverWrapper = ({ className, children }) => (
  <div className={classnames('PopoverWrapper', className)}>{children}</div>
);

PopoverWrapper.displayName = 'PopoverWrapper';

PopoverWrapper.defaultProps = {};

PopoverWrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

export default PopoverWrapper;
