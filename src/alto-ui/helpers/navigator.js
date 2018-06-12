export const isIE11 = () => {
  const { userAgent } = window.navigator;
  return userAgent.indexOf('Trident/') !== -1;
};
