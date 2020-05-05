import getSharedProps from './getSharedProps';

const getBooleanProps = ({
  handleChange: onChange,
  handleKeyDown: onKeyDown,
  inputProps,
  ...props
} = {}) => ({
  ...getSharedProps({
    ...props,
    onChange,
    onKeyDown,
  }),
  ...inputProps,
});

export default getBooleanProps;
