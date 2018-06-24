const context = require.context('.', false, /\.js$/);

export default context.keys().reduce((modules, module) => {
  const name = module.match(/.+(?=\.js$)/);
  if (name !== 'index') modules.push({ [name]: { namespaced: true, ...context(module) } });
  return modules;
}, []);
