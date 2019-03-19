import { useState } from 'react';

export default function useResettableState(initialState) {
  const [state, setState] = useState(initialState);
  const resetState = () => setState(initialState);
  return [state, setState, resetState];
}
