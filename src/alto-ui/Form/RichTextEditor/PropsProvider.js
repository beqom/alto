import React from 'react';
import PropTypes from 'prop-types';
import context from './context';

function PropsProvider({ props, children }) {
  return <context.Provider value={{ props }}>{children}</context.Provider>;
}

PropsProvider.propTypes = {
  props: PropTypes.object,
  children: PropTypes.any,
};

export default PropsProvider;
