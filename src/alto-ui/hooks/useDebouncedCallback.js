import { useRef } from 'react';

const useDebounceCallback = (fn, time = 0) => {
  const instance = useRef({ timeout: null }).current;
  const clear = () => clearTimeout(instance.timeout);

  return (...args) => {
    clear();
    instance.timeout = setTimeout(() => {
      fn(...args);
    }, time);
    return clear;
  };
};

export default useDebounceCallback;
