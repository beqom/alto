import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const DropdownWrapper = ({ className, children }) => (
  <div className={classnames('DropdownWrapper', className)}>{children}</div>
);

DropdownWrapper.displayName = 'DropdownWrapper';

DropdownWrapper.defaultProps = {};

DropdownWrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

export default DropdownWrapper;
