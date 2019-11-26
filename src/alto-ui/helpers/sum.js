export default function(arr, indexName, defaultWidth = 0) {
  if (!Array.isArray(arr)) {
    return 0;
  }

  return arr.reduce((sum, item) => {
    const value = indexName ? item[indexName] : item;

    return sum + (parseInt(value, 10) || defaultWidth);
  }, 0);
}
