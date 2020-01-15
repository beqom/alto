const getType = (value, column) =>
  value instanceof Error ? 'error' : column.type || typeof value;
export default getType;