import { getTruthyValue } from '../../../helpers';

const getSharedProps = ({
  ref,
  id,
  type,
  column: {
    title: label,
  } = {},
  context: {
    compact: small,
  } = {},
  onBlur,
  onFocus,
  onKeyDown,
  onChange,
  value,
} = {}) => ({
  ref,
  id,
  type,
  label,
  hideLabel: true,
  small,
  value: getTruthyValue(value),
  onBlur,
  onFocus,
  onKeyDown,
  onChange,
});

export default getSharedProps;
