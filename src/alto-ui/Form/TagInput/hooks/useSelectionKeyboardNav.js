import { useRef } from 'react';

import useEventListener from '../../../hooks/useEventListener';

export default function useSelectionKeyboardNav(state, onRemoveTag) {
  const [, setValue] = state.value;
  const [selection, , resetSelection] = state.selection;
  const [, setPosition] = state.position;

  // create a mutable ref
  const instance = useRef({}).current;
  // store state in instance in order to use it in listener
  instance.state = state;

  useEventListener(useRef(document), 'keyup', e => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      onRemoveTag(instance.state.selection[0]);

      resetSelection();
      setPosition(null);
    }
    if (e.key === 'Escape') {
      e.stopImmediatePropagation();
      resetSelection();
      setPosition(null);
    }

    const isAlphaNum = /^[a-zA-Z0-9-_ ]$/.test(e.key);
    if (isAlphaNum) {
      setValue(e.key);
      resetSelection();
      setPosition(null);
    }
  })(!!selection.length);
}
