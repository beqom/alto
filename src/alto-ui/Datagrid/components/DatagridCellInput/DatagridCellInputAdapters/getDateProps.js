import getSharedProps from './getSharedProps';

const getDateProps = ({
  handleChange: onChange,
  handleStartEditing: onFocus,
  handleBlur: onClose,
  handleChangeFromOverlay: onSelectDate,
  handleKeyDown: onKeyDown,
  context: { labels } = {},
  context,
  inputProps,
  ...props
} = {}) => ({
  ...getSharedProps({
    ...props,
    context,
    onFocus,
    onChange,
    onKeyDown,
  }),
  onClose,
  onSelectDate,
  labels,
  right: true,
  ...inputProps,
});

export default getDateProps;
