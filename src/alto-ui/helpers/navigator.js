// https://gist.github.com/gaboratorium/25f08b76eb82b1e7b91b01a0448f8b1d
export const isIE11 = () => {
  const { userAgent } = window.navigator;
  return userAgent.indexOf('Trident/') !== -1;
};

export const isMacOS = () => {
  const {
    navigator: { appVersion },
  } = window;

  return appVersion.indexOf("Mac") !== -1;
};
