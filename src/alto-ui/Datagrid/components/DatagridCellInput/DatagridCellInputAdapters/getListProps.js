import getSharedProps from './getSharedProps';

const getListProps = ({
  handleChangeFromOverlay: onChange,
  handleStartEditing: onOpen,
  handleBlur: onClose,
  handleKeyDown: onKeyDown,
  modifiers: {
    edited,
  } = {},
  modifiers,
  inputProps,
  ...props
} = {}) => ({
  ...getSharedProps({
    ...props,
    modifiers,
    onChange,
    onKeyDown,
  }),
  onOpen,
  onClose,
  clearable: true,
  edited,
  ...inputProps,
});

export default getListProps;
