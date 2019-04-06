/* eslint-disable import/prefer-default-export */

export const msToTime = (ms) => {
  const sDiv = 1000;
  const mDiv = sDiv * 60;
  const hDiv = mDiv * 60;

  const h = Math.floor(ms / hDiv);
  const m = Math.floor((ms % hDiv) / mDiv);
  const s = Math.floor(((ms % hDiv) % mDiv) / sDiv);

  const timeArr = [];

  if (h > 0) {
    timeArr.push(h);
    timeArr.push(m.toString().padStart(2, '0'));
  } else timeArr.push(m);
  timeArr.push(s.toString().padStart(2, '0'));

  return timeArr.join(':');
};
