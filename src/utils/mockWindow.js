const { location } = window;

export const mockWindowLocation = (pathname, search = '', options = {}) => {
  delete window.location;
  window.location = { pathname };
  window.location.search = search;
  window.location.hash = options.hash || '';
};

export const restoreMockedWindow = () => { window.location = location; };
