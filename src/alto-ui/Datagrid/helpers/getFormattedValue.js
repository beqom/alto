import { getValue, getFormatter, getType } from './';

const getFormattedValue = context => (value, column, row) => {
  const val = getValue(value, column, row);
  const type = getType(val, column);
  const format = getFormatter(context, type);
  return format(value, column, row);
};
export default getFormattedValue;
