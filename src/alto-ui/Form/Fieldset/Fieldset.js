import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import './Fieldset.scss';

const Fieldset = ({ className, legend, children }) => (
  <fieldset className={classnames('Fieldset', className)}>
    <legend className="Fieldset__legend">{legend}</legend>
    {children}
  </fieldset>
);

Fieldset.propTypes = {
  className: PropTypes.string,
  legend: PropTypes.string,
  children: PropTypes.any,
};

export default Fieldset;
