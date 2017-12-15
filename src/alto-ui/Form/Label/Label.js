import React from 'react';
import PropTypes from 'prop-types';

import { bemProps } from '../../helpers/bem';
import './Label.scss';

const labelProps = bemProps('label', ['readOnly'])

const Label = props => (
  <label {...labelProps(props)} htmlFor={props.htmlFor} />
);


Label.displayName = 'Label';

Label.defaultProps = {
};

Label.propTypes = {
  htmlFor: PropTypes.string,
};

export default Label;
