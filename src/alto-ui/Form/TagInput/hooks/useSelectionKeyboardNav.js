import { useRef } from 'react';

import useEventListener from '../../../hooks/useEventListener';

export default function useSelectionKeyboardNav(state, onRemoveTag) {
  const { state: selection } = state.selection;
  // create a mutable ref
  const instance = useRef({}).current;
  // store state in instance in order to use it in listener
  instance.state = state;

  useEventListener(useRef(document), 'keyup', e => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      onRemoveTag(instance.state.selection.state);

      state.selection.reset();
      state.position.set(null);
    }
    if (e.key === 'Escape') {
      e.stopImmediatePropagation();
      state.selection.reset();
      state.position.set(null);
    }

    const isAlphaNum = /^[a-zA-Z0-9-_ ]$/.test(e.key);
    if (isAlphaNum) {
      state.value.set(e.key);
      state.selection.reset();
      state.position.set(null);
    }
  })(!!selection.length);
}
