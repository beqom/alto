export const getKey = (item, keyField) =>
  typeof keyField === 'function' ? keyField(item) : item[keyField];
