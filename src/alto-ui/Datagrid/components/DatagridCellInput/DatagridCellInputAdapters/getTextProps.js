import getSharedProps from './getSharedProps';

const getTextProps = ({
  handleBlur: onBlur,
  handleStartEditing: onFocus,
  handleKeyDown: onKeyDown,
  handleChange: onChange,
  inputProps,
  ...props
} = {}) => ({
  ...getSharedProps({
    ...props,
    onBlur,
    onFocus,
    onKeyDown,
    onChange,
  }),
  ...inputProps,
  type: 'text',
});

export default getTextProps;
