import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash.omit';

import { bemProps } from '../../helpers/bem';
import FormElement from '../FormElement';

import './TextField.scss';

const handleChange = (event, type, onChange) => {
  if (typeof onChange !== 'function' || !event.target.value) return;

  if (type !== 'number') {
    onChange(event);
    return;
  }

  const regex = /^-?[+]?[0-9]*\.?[0-9]*$/;
  if (regex.test(event.target.value)) {
    onChange(event);
  }
};

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
        {...texfieldProps(
          omit(props, ['className', 'hideLabel', 'label', 'style', 'onChange']),
          'helpText'
        )}
        onChange={event => handleChange(event, props.type, props.onChange)}
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
