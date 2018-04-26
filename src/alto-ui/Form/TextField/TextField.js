import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash.omit';

import { bemProps } from '../../helpers/bem';
import FormElement from '../FormElement';

import './TextField.scss';

const texfieldProps = bemProps('textfield', ['large', 'small', 'success', 'error', 'area']);

const TextField = React.forwardRef((props, ref) => (
  <FormElement {...props}>
    {props.area ? (
      <textarea
        ref={ref}
        {...texfieldProps(
          omit(props, ['className', 'hideLabel', 'label', 'style']),
          'helpText',
          'type'
        )}
        type={null}
      />
    ) : (
      <input
        ref={ref}
        {...texfieldProps(omit(props, ['className', 'hideLabel', 'label', 'style']), 'helpText')}
      />
    )}
  </FormElement>
));

TextField.defaultProps = {
  type: 'text',
};

TextField.propTypes = {
  type: PropTypes.string,
  area: PropTypes.bool,
  large: PropTypes.bool,
  small: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.bool,
};

TextField.displayName = 'TextField';

export default TextField;
