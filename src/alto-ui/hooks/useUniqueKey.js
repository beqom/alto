import { useRef } from 'react';
import guid from '../helpers/guid';

function useUniqueKey(key) {
  const ref = useRef(key);
  if (['', null, undefined].includes(ref.current)) {
    ref.current = guid();
  }
  return ref.current;
}

export default useUniqueKey;
