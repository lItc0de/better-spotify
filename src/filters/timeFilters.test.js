import { msToTime } from './timeFilters';

describe('msToTime', () => {
  it('converts ms into a time string', () => {
    const ms = 6666666;
    const time = '1:51:06';

    expect(msToTime(ms)).toEqual(time);
  });

  it('shows a leading zero on minutes when hour shown', () => {
    const ms = 4000000;
    const time = '1:06:40';

    expect(msToTime(ms)).toEqual(time);
  });

  it('shows a leading zero on seconds', () => {
    const ms = 6000;
    const time = '0:06';

    expect(msToTime(ms)).toEqual(time);
  });
});
