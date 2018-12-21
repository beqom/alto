function addFocusFeedbackListener(listener) {
  function keyboardEventListener(e) {
    if (e.key === 'Tab') {
      if (typeof listener === 'function') listener(true);
      document.body.classList.add('focus-feedback');
      // eslint-disable-next-line no-use-before-define
      removeKeyboardEventListener();
      // eslint-disable-next-line no-use-before-define
      addMouseEventListener();
    }
  }

  function mouseEventListener() {
    if (typeof listener === 'function') listener(false);
    document.body.classList.remove('focus-feedback');
    // eslint-disable-next-line no-use-before-define
    removeMouseEventListener();
    // eslint-disable-next-line no-use-before-define
    addKeyboardEventListener();
  }

  const addKeyboardEventListener = () =>
    document.addEventListener('keydown', keyboardEventListener);
  const addMouseEventListener = () => document.addEventListener('mouseup', mouseEventListener);

  const removeKeyboardEventListener = () =>
    document.removeEventListener('keydown', keyboardEventListener);
  const removeMouseEventListener = () =>
    document.removeEventListener('mouseup', mouseEventListener);

  addKeyboardEventListener();

  return () => {
    removeKeyboardEventListener();
    removeMouseEventListener();
  };
}

export default addFocusFeedbackListener;
