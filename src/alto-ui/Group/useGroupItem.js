import { useContext } from 'react';
import CleanGroupContext from './CleanGroupContext';
import context from './context';

function useGroupItem() {
  const values = useContext(context);

  return [values, CleanGroupContext];
}

export default useGroupItem;
