import { useEffect, useState } from 'react';

export default function useEventListener(ref, ...args) {
  const [isListeningForEvent, listenForEvent] = useState(true);
  const addEventListener = () => ref.current.addEventListener(...args);
  const removeEventListener = () => ref.current.removeEventListener(...args);

  useEffect(() => {
    if (isListeningForEvent) addEventListener();
    return removeEventListener;
  }, [isListeningForEvent]);

  return shouldBeListeningForEvent => {
    if (isListeningForEvent !== shouldBeListeningForEvent) {
      listenForEvent(shouldBeListeningForEvent);
    }
  };
}
