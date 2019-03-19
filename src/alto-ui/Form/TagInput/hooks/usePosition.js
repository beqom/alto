import useResettableState from '../../../hooks/useResettableState';

export default function usePosition(tags) {
  const [position, setPosition, resetPosition] = useResettableState(undefined);

  function movePositionLeft() {
    if (position === 0 || position === undefined) return null;
    if (position === null) return setPosition(tags.length - 1);
    return setPosition(position - 1);
  }

  function movePositionRight() {
    if (position === null || position === undefined) return null;
    return setPosition(position + 1);
  }

  return [position, setPosition, resetPosition, movePositionLeft, movePositionRight];
}
