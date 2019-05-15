import { useState, useRef, useEffect } from 'react';
import throttle from 'lodash.throttle';

import useEventListener from './useEventListener';

const contains = (target, refs) => refs.some(ref => ref.current && ref.current.contains(target));

export default function useFocusInOut(cb, ...refs) {
  const [isFocused, setFocus] = useState(false);
  const documentRef = useRef(document);

  const setFocusBatched = throttle(setFocus, 200, {
    leading: false,
  });

  function focusInlistener(e) {
    setFocusBatched(contains(e.target, refs));
  }

  function focusOutlistener(e) {
    if (contains(e.target, refs)) {
      setFocusBatched(false);
    }
  }

  useEffect(() => setFocusBatched.cancel, []);

  useEventListener(documentRef, 'focusin', focusInlistener);
  useEventListener(documentRef, 'focusout', focusOutlistener);
  // using capture will allow to detect the click on a node that will disapear
  // after this click -> remove an item of list for example by clicking on this item
  useEventListener(documentRef, 'mousedown', focusInlistener, true);
  useEventListener(documentRef, 'click', focusInlistener, true);
  useEffect(() => {
    if (typeof cb === 'function') cb(isFocused);
  }, [isFocused]);
  return isFocused;
}
