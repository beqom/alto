import { useCallback } from 'react';

const useDebounceCallback = (fn, time = 0, deps = []) => {
  let timeout = null;
  const clear = () => clearTimeout(timeout);

  return useCallback((...args) => {
    clear();
    timeout = setTimeout(() => {
      fn(...args);
    }, time);
    return clear;
  }, deps);
};

export default useDebounceCallback;
