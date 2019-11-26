const getTruthyValue = (value = null, defaultValue = '') => {
  if (!value && value !== 0) {
    return defaultValue;
  }

  return value;
};
export default getTruthyValue;
