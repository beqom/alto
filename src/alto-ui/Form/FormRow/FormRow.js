import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// import { bemClass } from '../../helpers/bem';
import './FormRow.scss';

const FormRow = props => <div {...props} className={classnames('FormRow', props.className)} />;

FormRow.propTypes = {
  className: PropTypes.string,
};

export default FormRow;
