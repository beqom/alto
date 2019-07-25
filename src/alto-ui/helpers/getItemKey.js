const getItemKey = key => item => {
  if (typeof key === 'function') return key(item);
  if (typeof key === 'string') return item[key];
  if (typeof item === 'string' || typeof item === 'number') return item;
  return item.id || item.uid || item.key || item.value || item.name || item.title;
};

export default getItemKey;
