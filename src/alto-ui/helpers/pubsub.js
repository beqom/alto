const callPipe = (pipe, ...args) => init => pipe.reduce((x, fn) => fn(x, ...args), init);

export const createSubscription = p => {
  let listeners = [];
  p.then(x => callPipe(listeners)(x)).catch(err => callPipe(listeners, err)());
  return f => {
    listeners.push(f);
    return () => {
      listeners = listeners.filter(g => g !== f);
    };
  };
};
