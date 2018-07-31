const context = require.context('.', false, /^((?!index).)*\.js$/);

/* eslint-disable no-param-reassign */
export default context.keys().reduce((modules, module) => {
  const name = module.match(/\.\/(.+)(?=\.js$)/)[1];

  modules[name] = { namespaced: true, ...context(module).default };
  return modules;
}, {});
