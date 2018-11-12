import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash.omit';

import { bemProps } from '../../helpers/bem';
import { isIE11 } from '../../helpers/navigator';
import FormElement from '../FormElement';

import './TextField.scss';

const DEFAULT_INPUT_MAX_LENGTH = 2048;

const handleChange = (event, type, onChange) => {
  if (typeof onChange !== 'function') return;

  if (type !== 'number') {
    onChange(event);
    return;
  }

  const regex = /^-?[+]?[0-9]*\.?[0-9]*$/;
  if (regex.test(event.target.value)) {
    onChange(event);
  }
};

// IE for ever <3
const getInputType = type => (isIE11() && type === 'number' ? 'text' : type);

const texfieldProps = bemProps('textfield', [
  'large',
  'small',
  'success',
  'error',
  'area',
  'right',
]);

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
          omit(props, ['className', 'hideLabel', 'label', 'style', 'onChange', 'type']),
          'helpText'
        )}
        type={getInputType(props.type)}
        onChange={event => handleChange(event, props.type, props.onChange)}
        maxLength={props.inputMaxLength || DEFAULT_INPUT_MAX_LENGTH}
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
