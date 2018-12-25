const { location } = window;

export const mockWindowLocation = (pathname, search = '') => {
  delete window.location;
  window.location = { pathname };
  window.location.search = search;
  window.location.hash = '';
};

export const restoreMockedWindow = () => { window.location = location; };
