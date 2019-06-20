import React from 'react';
import PropTypes from 'prop-types';

import context from './context';

function CleanGroupContext({ children }) {
  return <context.Provider value={undefined}>{children}</context.Provider>;
}

CleanGroupContext.propTypes = {
  children: PropTypes.any,
};

export default CleanGroupContext;
