/* eslint-disable import/prefer-default-export */

export const splitHash = hash => (hash ? hash.match(/^#(.*)$/)[1].split('&').reduce((acc, param) => {
  const keyValue = param.split('=');
  [, acc[keyValue[0]]] = keyValue;
  return acc;
}, {}) : {});
