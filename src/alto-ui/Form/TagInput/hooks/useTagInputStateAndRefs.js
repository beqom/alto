import { useRef, useEffect } from 'react';

import useResettableState from '../../../hooks/useResettableState';
import useFocusInOut from '../../../hooks/useFocusInOut';
import usePosition from './usePosition';

export default function useTagInputStateAndRefs(tags, ref) {
  const mainRefDefault = useRef();
  const mainRef = ref || mainRefDefault;
  const inputRef = useRef();
  const valueRef = useRef();
  const isActive = useFocusInOut(null, mainRef);

  const [value, setValue, resetValue] = useResettableState('');
  const [selection, setSelection, resetSelection] = useResettableState([]);
  const [position, setPosition, resetPosition, movePositionLeft, movePositionRight] = usePosition(
    tags
  );

  // --- EFFECTS ---

  // reset value if tags length change
  useEffect(() => {
    if (value) resetValue();
  }, [tags.length]);

  // reset value, position and selection if focus out value area
  useFocusInOut(focused => {
    if (!focused) {
      resetValue();
      resetPosition();
      resetSelection();
    }
  }, valueRef);

  // when position change, or if the component become "active"
  // then focus the input
  useEffect(() => {
    if (position !== undefined && inputRef.current) {
      inputRef.current.focus();
    }
  }, [position, isActive]);

  return [
    // STATE
    {
      value: { state: value, set: setValue, reset: resetValue },
      selection: { state: selection, set: setSelection, reset: resetSelection },
      position: {
        state: position,
        set: setPosition,
        reset: resetPosition,
        moveLeft: movePositionLeft,
        moveRight: movePositionRight,
      },
      isActive,
    },
    // REFS
    {
      main: mainRef,
      value: valueRef,
      input: inputRef,
    },
  ];
}
