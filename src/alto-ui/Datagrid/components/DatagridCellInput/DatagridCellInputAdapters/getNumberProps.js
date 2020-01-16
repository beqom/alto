import getSharedProps from './getSharedProps';

const getNumberProps = ({
  handleChange: onChange,
  handleKeyDown: onKeyDown,
  handleStartEditing: onFocus,
  handleBlur: onBlur,
  context: { locale } = {},
  column: { precision, disableThousandSeparator, percent } = {},
  context,
  column,
  inputProps,
  ...props
} = {}) => ({
  ...getSharedProps({
    ...props,
    context,
    column,
    onBlur,
    onFocus,
    onKeyDown,
    onChange,
  }),
  locale,
  precision,
  right: true,
  disableThousandSeparator,
  percent,
  ...inputProps,
});

export default getNumberProps;
